---
title: Figma Instance Considered Harmful
date: 2024-08-22
keywords: ["design", "figma"]
---

> Composition over inheritance
>
> — Object-oriented programming principle

> Copying a frame is better than detaching an instance
>
> — A pet theory of mine

Component instancing has become more and more problemmatic in Figma

- Instance is too limiting as it requires a fixed number of children. Add children leads to detachment. Remove children leads to hidden element consuming memory.
- Instance is hostile to composition. A designer might want to try using a new component in an existing layout, but that component, being new, is not supported as a child of that layout yet. They must detach to proceed.
- Component instancing is better for very stable design systems where new exploration is rare and abstraction level is low. Copyable frame is better when we want to test ideas quickly.
- "Receiving updates" from main component isn't very useful in most designs. The most common designs are just snapshot representation of an idea. Once the idea got across, the rest of the work is in code, not in Figma. So the snapshot does not have to receive updates.

My call to action is resisting the temptation in componentizing above the atom level. Instead, build lots of templates with loose frames to allow free-form composition, with a few exceptions:

- A library author can use components to intentionally limit choice, preventing off-brand composition.
- A library consumer can use components to repeat elements on the UI without losing bulk editability. (Figma added [multi-edit](https://help.figma.com/hc/en-us/articles/21635177948567-Edit-objects-on-the-canvas-in-bulk) recently so this motivation might fall out of relevance)
