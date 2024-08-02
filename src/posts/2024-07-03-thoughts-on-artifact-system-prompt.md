---
title: Claude 3.5 Sonnect Artifact System Prompt
date: 2024-07-03
keywords: ["ai", "hack"]
---

[Leaked prompt](https://gist.github.com/dedlim/6bf6d81f77c19e20cd40594aa09e3ecd)

My takeaways:

1. The system prompt itself is agentic (goals + constraints + instructions). This is a maturing pattern for effective prompting.
1. XML as promising AI native data format. Note that Claude is biased to output XML. Their prompts are not portable to gpt-4o which is biased to output JSON.
1. Claude can execute JavaScript in a browser environment (validating our same approach in Knowledge Studio) but cannot execute python code like GPT. Claude's JavaScript code can access any libraries packaged for browser use, typically hosted on a public CDN. [Simon Willison's demo](https://simonwillison.net/2024/Jul/2/compare-pdfs/) accessed pdf.js, and impressively, loaded that 3rd party library via a web worker.
1. Artifact can be repurposed as the human-read/writable long-term memory for an agent.
1. Artifact can be explicitly addressed (validating Knowledge Studio's approach to addressing environment objects)
1. Prompt trick `Here are some examples of correct usage of artifacts by other AI assistants:` I wonder if it mentions `other AI assistants` to avoid Claude over-indexing on the example.
1. A well documented ui library with good developer API is enough for AI code generation. Claude uses https://ui.shadcn.com/
1. The underlying cognitive architecture is still ReAct. `<antThinking>` is the equivalent of GPT's `Reason:` in ReAct.

To circumvent the limitation on what's javasript library is packaged for browser use, I found https://esm.sh/ to be a promising solution. You can:

- Use [esbuild wasm](https://esbuild.github.io/getting-started/#wasm) to compile the entry point file that contains `import {...} from "..."` without leaving the browser.
- Use [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to alias the imported package names to an esm.sh url
- Have esm.sh resolve rest of the import graph.

Based on this idea, I created [esplay](https://github.com/chuanqisun/esplay) to run any TypeScript/TSX code in the browser, allowing module import for arbitrary npm packages. And with that, my side project [iter](https://github.com/chuanqisun/iter) received the artifact upgrade!
