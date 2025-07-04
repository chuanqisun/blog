---
title: (Un)framework
date: 2025-07-03
keywords: ["engineering", "learning"]
---

Composition and reactivity are the two central concerns of all modern JavaScript frameworks. I started my programming career when the world was crazy about AngularJS. Later, Angular would adopt RxJS and confuse all the developers with the existential question of whether they needed to unsubscribe from an observable or not. Too much magic, and your developers fall off the bandwagon—so React removed that magic with a simpler one-way data flow model; while Vue added even more magic to stop the leaks in the abstraction layer. During the framework wars, we saw build tools growing more and more complex. "Gone are the days when we can just open dev tools and start hacking," we sighed.

Personally, I was burned out by the frameworks. I wanted something simpler. In other words, I wanted to work with a framework or library that I could drill down into at every level of abstraction without losing grip on what the code was doing. During this "burnout" period, I tried lit, haunted, and tried combining them with web components. But everything felt like an uphill battle: lack of tooling, lack of community, and, generally, lack of hackability—because the code was written by others. While I could debug issues as they arose, I couldn't really **learn** by tracing the logic in my code. It always bottomed out at the invisible boundary between my code and the framework's code.

I think the industry is working backwards: giving developers really powerful abstractions but also forcing them to work their way from the conclusion backward to the premise. It's like inductive reasoning: given what we know, albeit incomplete, what else might become our knowledge? To me, I'm feeling increasingly uncomfortable learning libraries and frameworks this way. I previously blogged about how [the best framework should be the one you build](./20250607-grammar-of-independence.md).

I wanted to try something different: what if we take a utility-level library that people can work with, such as a DOM diffing/patching library and a data flow library like RxJS—can we build from the ground up, without relying on magic? I think scaffolding from first principles would result in more sustained developer learning and growth.

Therefore, I'm launching an experimental UI (un)framework—[Streamlet](./20250703-streamlet.md). It requires you to understand RxJS, but aside from that, the rest is just techniques and patterns. You'd be applying generalized knowledge about reactive programming to the specialized domain of UI programming. Unlike traditional frameworks, there is nothing else to `npm install`. You can even run it in your browser without any build tools!

I'm going to be my first user and test the hypothesis by building apps with this technique. I hope this can either lead to something useful or prove myself wrong. Stay tuned.

