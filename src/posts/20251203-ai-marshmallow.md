---
title: Ease Trap
date: 2025-12-03
keywords: ["philosophy", "ai", "programming"]
---

I had been building many tools with AI. The kind of weekend projects that used to take me a few days of focused work. The AI gave me working prototypes in an hour. I felt triumphant. Then I tried to add a feature. The code fought back. Every change I made broke something else, and the AI's fixes introduced new entanglements. A dozen prompts in, I was staring at a codebase I no longer understood.

> Change should become easier over time in a well-engineered project.

When we talk about AI coding, we usually talk about velocity. But we rarely talk about the topology of the effort. How does the shape of our struggle change over time?

## The Paradox

After months of observing my own AI-assisted projects and watching others navigate theirs, I saw a pattern. There's an inverse relationship between how easy a project feels at the start and whether it survives to the finish line.

The industry is currently seduced by transactional coding. "Build me an app." "Fix this bug." "Add this feature." It feels like magic because the effort curve starts flat. You get working code almost immediately, and for a while, the changes flow easily.

But this approach is a trap. I diagnosed the end state with [Kessler Syndrome](./20180825-kessler-syndrome.md) years ago. Just as space junk begets more space junk until the entire orbital shell becomes unusable, AI-generated shortcuts beget more shortcuts until the entire codebase becomes unmaintainable.

## Effort Over Time

There are two ways to use AI, and they produce opposite effort curves.

|                  | Top-down approach  | Bottom-up approach |
| ---------------- | ------------------ | ------------------ |
| Start            | Easy               | Hard               |
| End              | Hard               | Easy               |
| Complexity trend | Exponential growth | Flatten            |

The first curve starts flat and ends vertical. You give the AI a high-level goal, and it gives you a solution. It's fast. Intoxicating even. But as you iterate, each change requires more context, more explanation, more correction. The effort climbs until progress halts entirely. I think of this as the mortgage curve. You're making deals with your future self, borrowing time you'll eventually have to repay with interest.

The second curve starts steep and ends flat. You fight the AI to build isolated primitives. Small, single-purpose pieces that don't know about each other. It feels slow and pedantic at first. You're not building an app; you're building the building blocks for an app. But once those primitives exist, complexity flatlines. New features become simple compositions of existing pieces. This is the bottom-up curve, and it requires a kind of discipline that runs counter to everything AI makes easy.

## Why Easy Fails

When you ask an AI to solve a problem top-down, the code it generates becomes a sediment of your conversation. It patches logic based on immediate constraints. It carries the scar tissue of every "no, not like that" instruction you gave it. The code doesn't represent a clean solution to a well-defined problem. It represents the history of your struggle to articulate what you wanted.

As the project grows, these accumulated compromises interact in ways neither you nor the AI anticipated. When you try to change one thing, the tolerance stack-up causes the system to collapse. The debris of previous shortcuts creates a minefield where any new movement triggers a cascade.

I've watched this happen to my own projects. I've watched it happen to others. The pattern is remarkably consistent. Initial euphoria. Growing unease. Eventual abandonment.

## Building Primitives

The alternative is to treat code not as a history of decisions, but as a collection of truths that exist independent of how you arrived at them.

In this model, you force the AI to build single-purpose components from the ground up. You strip away the "how" and focus entirely on the "what." The isolated concern of each computation. A function that parses dates. A module that handles authentication. Pieces that don't know about each other, that can be understood in isolation, that can be recombined without fear.

This requires a steep initial climb. You have to design the architecture before you see results. You have to resist the AI's eager offers to wire everything together for you. But the payoff is profound. Locality of behavior. You can open any file and understand it without reading the whole codebase. When requirements change, you don't rewrite the system. You re-compose it.

## Misalignment

I think the root of this problem is a misalignment between what LLMs naturally want to do and what sustainable software requires.

AI is teleological. Goal-obsessed. It wants to bridge the gap between your intent and working output as fast as possible. It naturally gravitates toward integration. Coupling everything together to make the immediate request work. This is what makes it feel magical.

But software is ontological. Structure-obsessed. To be maintainable, it needs isolation. Things must be decoupled so they don't break each other. The AI doesn't care about this because it doesn't have to maintain your code next week. You do.

> What I cannot create, I do not understand.  
> — Richard Feynman

Feynman's words haunt me here. When AI creates code I cannot fully trace, when the solution arrives faster than my comprehension, something essential is lost. Not just understanding, but the capacity to care for what I've made.

## Delayed Gratification

This brings me to the marshmallow test.

In the famous Stanford experiment, children were offered a choice. One marshmallow now, or two marshmallows if they could wait fifteen minutes. The ability to delay gratification turned out to predict all sorts of life outcomes. The finding has been debated over the years but the implication stands: I think we're facing a similar test in how we use AI.

The AI offers us the instant gratification of a working feature. If we take it, we get the sugar rush of progress, followed by the crash of Kessler Syndrome. To succeed, we have to delay gratification. We have to reject the "fully integrated solution" that works for our specific case. We have to insist on the boring, difficult work of defining primitives that span a larger surface area.

In the age of AI, the engineer's job is no longer just to write code. It's to inhibit the AI's natural impulse to integrate. To be the adult in the room who says "not yet" to the child who wants the marshmallow now.

## Steep Climb

I don't have a tidy conclusion here. Only a growing conviction.

If it feels too easy at the beginning, you are likely borrowing against a future you won't be able to afford. The projects that survive will be the ones where someone had the discipline to climb the steep curve first. To build the primitives. To resist the integration. To delay the gratification.

This isn't a rejection of AI assistance. It's a recognition that the tool's greatest strength is also its greatest danger. Its eagerness to help. The marshmallow is always there. Sweet and immediate. The question is whether we have the patience to wait for something better.
