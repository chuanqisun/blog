---
title: A Case for Imperative Thinking
date: 2025-06-07
keywords: ["learning", "cycling"]
---

I was out jogging when I spotted a cyclist by the roadside, hunched over a bike with a chain hopelessly tangled and cross-chained. I introduced myself and offered help. The chain looked like a metallic puzzle, resisting every attempt to force it back into place.

"Have you tried backpedaling?" I suggested. The cyclist hesitated, then gently turned the crank in reverse. Instantly, the chain snapped back into alignment, as if the solution had been waiting for us to simply reverse course.

## The Imperative in the Everyday

This small roadside moment got me thinking about how we approach problems, not just in mechanics, but in software, systems, and life.

In software engineering, we often praise _declarative_ thinking: describing the end state we want, and letting the system figure out the steps. SQL is a classic example: "Give me all users who signed up last week." React and modern UI frameworks let us declare what the interface should look like, and the system handles the DOM diffing and updates. Even the F-22 fighter jet's control system, as described in [this MIT lecture](https://www.youtube.com/watch?v=n068fel-W9I), lets pilots focus on goals ("hold altitude," "navigate to waypoint") rather than the intricate mechanics behind the stick, throttle, and rudder. The goal-oriented interface is paradoxically easier than flying a Cessna.

But declarative thinking has its limits. It's easy to say, "I want the chain to be in the right place." But without knowing _how_ it got tangled, or what actions to take, that goal is unreachable. The imperative (the sequence of steps, the history of actions) matters. Sometimes, the only way to fix a problem is to understand and _reverse_ the steps that created it.

## When History Matters: Event Sourcing and Reversal

This is the essence of event sourcing in distributed systems, especially with CRDTs (Conflict-free Replicated Data Types). You can snapshot the current state, but sometimes you need to replay the entire sequence of events to reconstruct or repair the system. The present is a product of its history.

The bike chain didn't just appear tangled; it became that way through a series of forward pedal strokes. The fix wasn't to force a new state, but to _unwind_ the actions by backpedaling, literally retracing the path that led to the problem.

## The Arrow of Time, Entropy, and the Gift of Reversal

Physics tells us that time has an arrow: entropy increases, information is lost, and the past is often irretrievable. In most systems, going forward is easy; going backward is hard, sometimes impossible. Entropy destroys the roadmap, and the further we go, the more tangled things become.

That's why moments when you _can_ backpedal are rare and precious. When the system's history is still accessible, when the path to reversal is clear, these are gifts from the laws of physics. They are fleeting windows where the past can be unwound and the present restored. In code, in bikes, in life, cherish those opportunities.

## Stepping Back to Move Forward

This isn't the first time I've learned from going backward. In [Step back to go forward](./20240811-bike-shop-lessons.md), I wrote about the value of retreat: literally stepping back to see a crooked handlebar, or reversing a wrench to find the right thread. The courage to back out, to undo, to revisit the path that led to the problem, is often what unlocks the solution.

Being able to step back imperatively, not just declaratively, requires humility and a willingness to question the path you're on. Sometimes, the way forward is to backpedal, to unwind, to let the system's history guide you out of the tangle.

So next time you find yourself stuck (whether in code, in chain, or in life), remember: progress isn't always a forward motion. Sometimes, the only way out is to backpedal.
