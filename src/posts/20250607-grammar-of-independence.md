---
title: The Grammar of Independence
date: 2025-06-07
keywords: ["design", "engineering", "learning", "ai"]
---

When I was learning English in China, I struggled with the phrase "think for oneself." The preposition "for" confused me. Why not "think by oneself" or "think of oneself"? In Chinese, we might say "独立思考" (dúlì sīkǎo), which literally means "independent thinking." We might also say "为自己着想" (wèi zìjǐ zháoxiǎng), meaning "consider for oneself." But neither captures the precise grammatical relationship encoded in that English "for." This linguistic friction turned out to be more than a translation problem.

The "for" implies agency, ownership, and responsibility. You're not just thinking in isolation ("by oneself") or about yourself ("of oneself"). You're thinking in service of your own understanding, independent of external authorities. The Chinese constructions emphasize the state or the act; the English phrase establishes a relationship.

This distinction has become critical in the age of AI. When machines can process information and generate responses that increasingly resemble thought, the imperative to think for oneself isn't just about intellectual independence. It's about maintaining our cognitive sovereignty. But I want to extend this principle beyond thinking. In software engineering, we need to build for ourselves and learn for ourselves with the same deliberate independence.

## The Design System Orthodoxy

Previously at work, our leadership launched an initiative to adopt a company-wide design system. The pitch was compelling: eliminate redundant work, ensure consistency across products, accelerate development. The effort succeeded on these metrics. Teams shipped features faster. The product suite looked cohesive. Accessibility standards were uniformly met.

But something else happened that wasn't captured in the productivity metrics. Innovation slowed. The change wasn't dramatic but more like a gradual calcification. Teams began rejecting design proposals that didn't fit neatly into the existing component library. "That's not in the design system" became a conversation ender. The boundary between what we could build and what we would build collapsed into what the system already contained.

This is a phenomenon where design system users degenerate into IKEA designers. Both operate within a catalog of pre-approved possibilities. Both achieve consistency at the cost of understanding. An IKEA designer can create functional spaces quickly, but they may not understand why certain proportions feel right or how materials behave under stress. Similarly, developers using design systems can ship interfaces rapidly without understanding the underlying CSS grid mechanics or accessibility principles.

This isn't an indictment of design systems per se. It's a recognition of what we trade when we optimize for short-term productivity over long-term learning. Design systems are productivity optimization tools, not learning systems. They abstract away complexity, which is precisely their value and their danger.

## The Adaptability Paradox

Consider two approaches to building user interfaces:

**System A**: Highly centralized design system. Every component is meticulously documented, versioned, and maintained by a dedicated team. Redundancy is eliminated. Updates propagate automatically.

**System B**: Distributed approach. Teams build their own components. Redundancy is common. Patterns emerge organically through informal communication and code reviews.

In stable environments, System A dominates. It's more efficient, requires fewer resources, and produces predictable results. But stability is an assumption, not a law of nature.

When environments shift rapidly with new devices, new interaction paradigms, and new user expectations, System B reveals its advantages. The redundancy we eliminated was also optionality. The inefficiency was also experimentation. The inconsistency was also evolution.

This isn't theoretical. I've watched teams using rigid design systems struggle to adapt to new requirements. The system that accelerated them in stable times became an anchor in turbulent ones. Meanwhile, teams that maintained their own component libraries could pivot quickly because they understood their tools at a fundamental level, even though it seemed inefficient.

## The Learning Gradient

When you build your own design system, you're forced to confront fundamental questions:
- How should components compose?
- What's the right abstraction level for reusability?
- How do you balance flexibility with consistency?
- What accessibility patterns emerge from your specific use cases?

These aren't questions with universal answers. They depend on your product, your users, your technical constraints. When you adopt someone else's design system, you inherit their answers to these questions. These answers may not fit your context.

More critically, you miss the learning that comes from wrestling with these problems. In my post about [reinventing the wheel](./20230630-reinvent-the-wheel.md), I argued that building X from scratch is often the best way to understand why X exists. This applies doubly to design systems. The act of building forces you to understand not just the what but the why.

## The AI Accelerant

The recent explosion in AI capabilities changes this calculus dramatically. When AI can generate component code from descriptions, the value of pre-built components diminishes. But the value of understanding design principles increases. This includes understanding the grammar of interface construction.

Consider two developers:
- Developer A has spent years working exclusively with a design system, shipping features by composing pre-built components.
- Developer B has built multiple component libraries from scratch, understanding the principles behind responsive layouts, accessible patterns, and state management.

When AI tools can generate both basic components and complex compositions, Developer A's expertise becomes commoditized. Developer B's deep understanding becomes more valuable. They can evaluate AI output, identify subtle issues, and guide the generation process toward better solutions.

This isn't about rejecting AI or design systems. It's about positioning yourself to use these tools from a position of strength rather than dependence.

## Building for Yourself

The principle extends beyond design systems. Every time we choose a pre-built solution over building our own, we make a trade-off. Sometimes it's the right trade-off. But we should make it consciously, understanding what we gain and what we lose.

When you build for yourself:
- You understand your constraints intimately.
- You can optimize for your specific needs.
- You maintain the ability to evolve independently.
- You learn principles, not just patterns.

This doesn't mean building everything from scratch. It means maintaining the capability to build from scratch. It means choosing your dependencies carefully, understanding their trade-offs, and preserving your ability to replace them.

## The Grammar Lesson

That confusion over "think for oneself" wasn't just about prepositions. It was about a mode of being that my native language didn't explicitly encode. The "for" in "for oneself" implies a particular relationship with agency. You're not just the subject of thinking but also its beneficiary and arbiter.

The same grammar applies to building and learning. When you build for yourself, you're not just constructing software. You're constructing understanding. When you learn for yourself, you're not just acquiring information. You're developing judgment.

In an age where AI can think, build, and even learn in certain ways, these human capacities become more, not less, important. The best design system isn't the most comprehensive or the most elegant. It's the one that teaches you the most about your problem space. And that's usually the one you build yourself.

The preposition matters. For oneself, not by oneself, not of oneself. For the benefit of your own understanding, your own growth, your own ability to adapt when the environment shifts. Because it will shift. And when it does, the efficiency you sacrificed to build your own tools becomes the adaptability that lets you thrive.
