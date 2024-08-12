---
title: Issues With Web UI Generation
date: 2024-08-06
keywords: ["ai", "design"]
---

With my [recent move](../reinventing-on-principle) into the AI+UX space, I'm noticing unresolved issues in Generating Web UI with LLM. I want to revisit these issues as my research progresses.

## Hand-eye Coordination

What AI "sees" is not what AI "touches".

- Vision model perceives screenshots. Text model perceives serialized DOM tree and style sheets. But to generate/edit UI, the model often affects source code.
- Screenshots (binary), DOM (tree), and source code (graph) are orthogonal representations of states, connected by causal relationships:  
  `Source -[compiler/bundler] -> JS/CSS -[interpreter/renderer] -> DOM/CSSOM -[renderer] -> Screens`
- How can we expect AI to successfully manipulate the source code while only being able to use the final results as objective/feedback?
- Modern tools and frameworks make it worse. The DOM is littered with [CSS-in-JS garbled class names](https://stackoverflow.com/questions/59686504/whats-the-purpose-of-giving-unreadable-css-class-names-in-whatsapp-web) and deeply nested `div`s. The source code can be TypeScript or JSX, which further increases the causal distance from source to target.
- We can manipulate surface level representations, e.g. DOM or generate the screenshot, but the edit is cannot be persisted back to the source code.
- How do we express goals and constraints in the visual space? [tldraw/makereal](https://github.com/tldraw/make-real) is a solid start.
- How do we engineer "backpropagation" for Web UI Generation?
- How do we provide "direct manipulation" to AI?

## Unknown Unknowns

Without great documentation, AI can't tell what is possible and must rely on guessing, or worse, hallucinating.

- Using popular libraries with good documentation is better than esoteric or private libraries. A case in point is Claude 3.5 Artifact successfully leveraged [shadcn/ui](https://ui.shadcn.com/) according to [the leaked system prompt](https://gist.github.com/dedlim/6bf6d81f77c19e20cd40594aa09e3ecd). Other good libraries are [Material UI](https://mui.com/material-ui/) and [Ant Design](https://ant.design/).
- In any UI component library, not every component is compatible with every other component. There is an implicit "compatibility matrix" that is not documented. Composition is not necessarily better than inheritance for use by AI.
- Due to knowledge cutoff, popular libraries also suffer from knowledge gap when AI uses their latest releases.
- Open-ended generation is easy. Following specific instructions is hard. Satisfying all constraints is extremely hard, and maybe [NP-hard](https://en.wikipedia.org/wiki/Complexity_of_constraint_satisfaction).
- AI fears blank canvas too! It's a good idea to turn generation problem into extrapolation and interpolation problems. We essentially use existing UI as "few-shot" examples to generate UIs that are variations on the same theme. Photoshop [generative fill](https://www.adobe.com/products/photoshop/generative-fill.html) and Figma AI's [Add relevant content](https://www.figma.com/blog/introducing-figma-ai/#bring-designs-to-life-with-realistic-copy-and) both take advantage of this pattern.
- What if the elements in the UI can encode their domain and range? In addition to self-documented code, can we have self-documented UI?
- Towards [Evolutionary Design](https://en.wikipedia.org/wiki/Evolutionary_computation). Isn't our DNA a form of self-documentation? Can we distribute the complexity of documentation across the UI elements and use hierarchy for abstraction/compression?
- How do we progressively disclose documentation without overwheliming the AI? In addition to hierarchy as seen in [atomic design](https://bradfrost.com/blog/post/atomic-web-design/), will knowledge graph better represent the relationships between UI elements?

## The Time Dimension

Change is the only constant.

- The source code is not a static representation of the desired UI. Abstraction such as "signals" and "hooks" represents how information _changes_ over time. There is no handle for AI to grab onto such change.
- The transformation takes place outside of AI's perception:  
  `DOM -[User interaction or time triggered events] -> Changed DOM`
- "Shallow" mock-ups are much easier than "deep" behavioral prototypes. In other words, AI is good at [drawing dead fish](https://vimeo.com/64895205). But we want to generate UI, not screenshots.
- Figma prototyping tool already bottomed out here, manifested as [prototype spaghetti](https://forum.figma.com/t/header-nav-and-prototype-spaghetti/1534). No-code low-code app builder and visual programming IDE like [Sratch](https://scratch.mit.edu/) haven't solved it either. Instead they either fully encapsulate the behavior into premade components, or kick the can down the road by having the user draw the [unwieldy state machine](https://blog.sbensu.com/posts/demand-for-visual-programming/). There is a huge market waiting for a better solution.
- We might benefit from models that can natively perceive videos, instead of keyframes.
- We could diff the UI in both text and visual space to represent change. Or we should simply show the before and after.
- Where do get training data for the diff of UI states?
- What is the tradeoff between declarative and imperative representation of change? What can we learn from [Operation vs State-based CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Types_of_CRDTs)? What is AI's cognitive load when reasoning over each?
