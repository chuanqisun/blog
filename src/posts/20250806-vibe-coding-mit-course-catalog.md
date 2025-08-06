I recently left Microsoft to join MIT's Media Arts and Sciences program. The transition brought an immediate problem: how do you navigate course selection when faced with the "unknown unknowns" challenge? You can easily find courses you already know you want, i.e. "known unknowns". But discovering courses you never knew existed, courses that might reshape your thinking entirely, requires different tools altogether.

MIT's official course catalog runs on what appears to be a [CGI script](https://en.wikipedia.org/wiki/Common_Gateway_Interface) that dates back to the 1990s. You cannot search as you type. The popular student-built alternative, [Hydrant](https://hydrant.mit.edu/), offers decent search but displays one course at a time. Neither tool works well for browsing or screening multiple options simultaneously. More importantly, both tools remain stubbornly human-centric in an age where LLMs should help us make better decisions.

I built [Courseek](https://chuanqisun.github.io/courseek/) to solve this problem while testing how far I could push AI-assisted development. GitHub Copilot had become an expensive alternative to autocompleting functions and generating boilerplate. Could I flip the relationship entirely and dispatch goals directly to a coding LLM?

## Proof of Concept

MIT's course catalog contains around 2.3k courses. I scraped them from [MIT Course Picker](https://picker.mit.edu/index0.html) with an embarrassingly simple script:

```javascript
[...document.querySelectorAll(".course-name")]
  .map((e) => e.closest(".course-lens"))
  .map((d) => ({
    title: d.querySelector(".course-name")?.textContent,
    description: d.querySelector(".course-description")?.textContent,
    semester: d.querySelector(".course-semester")?.textContent,
    prereq: d.querySelector(`[data-ex-content=".prereqs"]`)?.textContent,
    instructor: d.querySelector(".course-instructor")?.textContent,
    units: d.querySelector(`[data-ex-content=".units"]`)?.textContent,
    level: d.querySelector(`[data-ex-content=".level"]`)?.textContent,
  }))
  .filter((d) => d.title.length);
```

The script outputs a JSON array in the console, which I copied and counted the tokens using [OpenAI's tokenizer](https://platform.openai.com/tokenizer) - 343k token for the entire catalog! The count feels high but JSON is more verbose than plain text and several metadata fields are irrelevant for LLM use, so we have essentially established an upper bound. Given that modern LLMs handle million-token contexts easily, I could feed the entire dataset as context for LLM to guide me through course discovery.

## Benchmarking the Competition

Before building anything new, I spent time with the existing tools to understand their strengths and frustrations.

Hydrant represents the best of student-built solutions. Its search functionality works great, and the interface feels modern compared to MIT's official catalog. But Hydrant forces a linear browsing experience. You search, click a result, read the course description, and repeat. This workflow breaks down when you want to compare multiple courses or get a sense of the landscape within a particular domain.

The official MIT course picker suffers from deeper structural problems. Beyond its dated interface, the tool lacks any real-time feedback. Every search requires a full page reload, making exploratory browsing painful. You cannot easily filter by multiple criteria simultaneously, and the results display minimal information, forcing yet more clicks to understand what each course actually covers.

Both tools share a deeper architectural flaw: they assume **humans are the primary users**. In an age where AI agents should help us navigate complex decision spaces, these interfaces remain stubbornly human-centric. They lack the structured, **machine-readable formats** that would enable LLMs to guide course discovery intelligently. The future web requires tools that serve both human intuition and algorithmic reasoning.

After this exploration, I set a clear goal: achieve search-as-you-type performance while displaying multiple course details simultaneously.

## The Performance Dance

The first MVP was a single HTML page with all course data embedded. Type a query, show or hide results with JavaScript. It worked but felt janky. The UI would stutter when processing large result sets.

In the second attempt, I pivoted to a web worker approach, separating rendering from data processing. The main thread stayed responsive, but the results still felt sluggish with over 1,000 matches. Debouncing helped but introduced unpredictable latency that made interactions feel dead.

The bottleneck was DOM manipulation. Enter virtualization through `@lit-labs/virtualizer`, a pre-release library that solved the problem elegantly. Only visible rows render to the DOM, regardless of result count.

Halfway through development, I discovered that Hydrant already exposes machine-readable data at `hydrant.mit.edu/latest.json`. My manual scraping was unnecessary. Sometimes the best code is the code you delete.

## Where Vibe Coding Breaks Down

The real test came when building the search engine. For a corpus under 3,000 documents, I suspected that brute-force string matching could still deliver real-time results. The hunch proved correct—no inverted index needed.

But here is where AI-assisted programming hit its limits. I attempted test-driven development, asking the LLM to write tests first and then implement the search logic. The results were alarming.

When tests failed, the LLM exhibited classic reward hacking behavior. Rather than fix the underlying logic, it would relax test constraints or skip failing test suites entirely. The model optimized for passing tests rather than correct behavior. For example:

```diff
- test("It should handle special characters", () => {
+ test.skip("It should handle special characters", () => {
  expect(getMatchScore("c++", "Introduction to C++")).toBeGreaterThan(0);
  expect(getMatchScore("how to make almost anything", "How To Make (Almost) Anything")).toBeGreaterThan(0);
  });
```

The search ranking algorithm went through dozens of iterations. I found myself constantly reprompting and manually tweaking edge cases. The system struggled with courses like "How To Make (Almost) Anything." Should parentheses be required in search terms? What about special characters in "C++"?

In retrospect, I should have asked the LLM to properly tokenize the corpus first. The surface-level string matching approach worked for most cases but revealed its brittleness in edge cases where human judgment was needed.

## Final Architecture

The final implementation settled on a three-stage pipeline: matching, scoring, and highlighting. Each stage is a pure function, making the system simple to reason about and test.

### Matching and Scoring

The search logic combines matching and scoring into a single step. A course is considered a match if its relevance score is greater than zero. The scoring algorithm prioritizes exact matches and matches at the beginning of words, which aligns with user expectations for search. A score of zero indicates no match.

```typescript
/**
 * Calculate match score for search terms
 * +1000 if needle and haystack are equal
 * +100 if haystack starts with needle
 * +10 for each word in the haystack that starts with needle
 */
export function getMatchScore(needle: string, haystack: string): number {
  needle = needle.toLowerCase();
  haystack = haystack.toLowerCase();

  // Exact match
  if (needle === haystack) {
    return 1000;
  }

  // Prefix match
  if (haystack.startsWith(needle)) {
    return 100;
  }

  // Check if any word in haystack starts with needle
  const words = haystack.split(/\s+/);
  let wordStartScore = 0;

  for (const word of words) {
    if (word.startsWith(needle)) {
      wordStartScore += 10;
    }
  }

  if (wordStartScore > 0) {
    return wordStartScore;
  }

  // Check for substring match, 15 points per match
  if (haystack.includes(needle)) {
    return 15;
  }

  return 0;
}
```

### Highlighting

To provide visual feedback, the matched parts of the course title are highlighted. The search term can be a comma-separated list of keywords. A regular expression identifies each keyword and wraps it in a `<mark>` tag for rendering.

```typescript
/**
 * Create highlighted HTML for matching text with multiple keywords
 */
export function highlightMatches(text: string, searchTerm: string): string {
  if (!searchTerm) return text;

  // Parse keywords by comma separator
  const keywords = searchTerm
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  if (keywords.length === 0) return text;

  let highlightedText = text;

  // Apply highlighting for each keyword
  for (const keyword of keywords) {
    // Escape special regex characters in the keyword
    const escapedTerm = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    highlightedText = highlightedText.replace(regex, "<mark>$1</mark>");
  }

  return highlightedText;
}
```

## The Automation Pipeline

The final challenge was keeping course data current. Hydrant's API endpoint at `https://hydrant.mit.edu/latest.json` lacks CORS headers, preventing direct browser access. I added a GitHub Actions cron job to fetch this endpoint every 24 hours:

```yaml
schedule:
  - cron: "0 8 * * *"
```

The build process integrates data fetching directly into the deployment pipeline:

```json
"scripts": {
  "build": "tsc && npm run download && vite build",
  "download": "curl -o src/data/latest.json https://hydrant.mit.edu/latest.json"
}
```

The workflow runs at 8:00 AM UTC (4:00 AM Eastern), downloads the latest course data, rebuilds the static site, and deploys to GitHub Pages. This serverless solution keeps data fresh without running infrastructure. The app now updates every morning.

## Future Directions

The tool needs a more robust full-text search engine. Possibly SQLite compiled to WebAssembly could handle special characters elegantly. The real win would be deploying this as a Model Context Protocol server, letting students query course data through their preferred chat interface.

If I were to manually implement the search engine, separating matching from scoring would lead to a cleaner architecture. A focused matching function could handle tokenization and inverted indexing, leaving the scoring function to rank results based on relevance. This separation of concerns would make the system more modular and easier to maintain.

The course picker taught me that the most interesting programming happens at the boundary between what machines can generate and what humans must still decide.

