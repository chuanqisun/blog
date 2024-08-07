---
title: Issues with Web UI Generation
date: 2024-08-06
keywords: ["ai", "design"]
---

With my [recent move](../reinventing-on-principle) into the AI+UX space, I'm noticing unresolved issues in Generating Web UI with LLM. I want to revisit these issues as my research progress.

## Hand-eye Coordination

AI can't "touch" what it can "see".

- Vision model perceives screenshots. Text model perceives serialized DOM tree and style sheets. But to generate/edit UI, the model often affects source code.
- Screenshots (binary), DOM (tree), and source code (graph) are orthogonal representations of states, connected by causal relationships:  
  `Source -[compiler/bundler] -> JS/CSS -[interpreter/renderer] -> DOM/CSSOM -[renderer] -> Screens`
- How can we expect AI to successfully manipulate the source code while only being able to use the final results as objective/feedback?
- Modern tools and frameworks make it worse. The DOM is littered with [CSS-in-JS garbled class names](https://stackoverflow.com/questions/59686504/whats-the-purpose-of-giving-unreadable-css-class-names-in-whatsapp-web) and deeply nested `div`s. The source code can be TypeScript or JSX, which further increases the causal distance from source to target.
- How do we express goals and constraints in the visual space? [tldraw/makereal](https://makereal.tldraw.com/) is a solid start.
- We can manipulate surface level representations, e.g. DOM or generate the screenshot, but the edit is cannot be persisted back to the source code.
- How do we engineer "backpropagation" for Web UI Generation?
- How do we engineer "direct manipulation" for AI?
- Can we turn this into an online reinforcement learning problem?

## Unknown Unknowns

Without great documentation, AI can't tell what is possible and must rely on guessing, or worse, hallucinating.

- Using popular libraries with good documentation is better than esoteric libraries. A case in point is Claude 3.5 Artifact implemented with [shadcn/ui](https://ui.shadcn.com/). Other good libraries are Material UI and Ant Design.
- Open-ended generation is easy. Following specific instructions or constraints is hard.
- It's good idea to turn generation into extrapolation and interpolation. We essentially use existing UI as "few-shot" examples to produce similar UIs that are variations on the same theme. Photoshop [generative fill](https://www.adobe.com/products/photoshop/generative-fill.html) and Figma AI's [Add relevant content](https://www.figma.com/blog/introducing-figma-ai/#bring-designs-to-life-with-realistic-copy-and) both take advantage of this pattern.
- What if the elements in the UI can express their domain and range? If we have self-documented code, why can't we have self-documented UI?
- How do we progressively disclose documentation without overwheliming the AI?

## The Time Dimension

Change is the only constant.

- The source code is not a static representation of the desired UI. Abstraction such as "signals" and "hooks" represents how information _changes_ over time. AI is lack the affordance to perceive such change.
- The transformation takes place outside of AI's perception:  
  `DOM -[User interaction or time triggered events] -> Changed DOM`
- "Shallow" mock-ups are much easier than "deep" behavioral prototypes.
- Figma prototyping tool also bottomed out here, manifested as [prototype spaghetti](https://forum.figma.com/t/header-nav-and-prototype-spaghetti/1534).
- We might benefit from models that can natively perceive videos, instead of keyframes.
- We could diffing the UI in both text and visual space to represent change.
- What is the tradeoff between declarative vs. imperative representation of change? What can we learn from CRDTs?
