---
title: React (Hooks) is All You Need
date: 2025-04-19
keywords: ["ai", "engineering"]
---

The agent hype is still on the rise but the quality and efficiency of agentic systems are far from production-ready. As people scramble to come up with agentic system architectures, I saw [Humanlayer](https://www.humanlayer.dev/) dropping this tongue-in-cheek principle in [12-factor-agents](https://github.com/humanlayer/12-factor-agents).

> **Factor 12 - Make your agent a stateless reducer!**
>
> If we [...] accept that "an AI Agent is basically a for loop", then what's the lispy version of this? And AI agent is a foldL where the accumulator is a context window, and the reducer is an LLM DetermineNextStep + a switch statement on how to handle it.
>
> -- [12-factor-agents](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-12-stateless-reducer.md)

As a functional programming lover, I'm drooling over that diagram:

```txt
+---------+     +-----------+     +-----+   +-----+     +-------------------+
| Context | --> | Determine | --> |     |-->|     | --> | whatever you want |
+---------+     |   Next    |     +-----+   +-----+     +-------------------+
      ^         |   Step    |     +-----+   +-----+               |
      |         +-----------+     |     |-->|     |               |
      |                           +-----+   +-----+               |
      |                           +-----+   +-----+               |
      |                           |     |-->|     |               |
      |                           +-----+   +-----+               |
      |                           Handle Next Step                |
      |                                                           |
      +-----------------------------------------------------------+
```

Does this look familiar to you as a frontend developer? It should. This is essentially the [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview) pattern that many popular frontend frameworks are based on. It is a really good "divide and conquer" strategy that modularizes state management into pure functional components and compose them in a conflict-free manner. Not surprisingly, we can model most Human-Computer interactions as a React render loop:

```txt
+---------+     +-----------+     +-----+   +-----+     +---------------------+
|   UI    | --> |  Next     | --> |     |-->|     | --> | whatever user wants |
+---------+     |  Human    |     +-----+   +-----+     +---------------------+
      ^         |  Action   |     +-----+   +-----+               |
      |         +-----------+     |     |-->|     |               |
      |                           +-----+   +-----+               |
      |                           +-----+   +-----+               |
      |                           |     |-->|     |               |
      |                           +-----+   +-----+               |
      |                           Effects and callbacks           |
      |                                                           |
      +-----------------------------------------------------------+
```

But can we take it a step further? React is good at managing the state of this _human_-initiated interaction loop. What if we use an _agent_ to interpret the user's goal and perform the most relevant actions that a real human would perform? Can we keep using React as the state management layer for the rest of the system?

Let's start with a classic counter app:

```tsx
function MyApp() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

To agentify it, let's replace `useState` with `useAgentState`, `useCallback` with `useAgentTool`. Then call `agent.run` with the intention of the user.

```tsx
function MyAgent() {
  const agent = useAgent({ apiKey });
  const [person, setPerson] = useAgentState("Person", { name: "John", age: 24 });

  useAgentTool(
    `Update the person's age to be older or younger`,
    z.number().describe("the delta of age, positive to grow older, negative to grow younger"),
    (update) => setPerson((prev) => ({ ...prev, age: prev.age + update.delta }))
  );

  const growMuchYounger = agent.run("Grow much younger");
  const growYounger = agent.run("Grow younger");
  const growOlder = agent.run("Grow older");
  const growMuchOlder = agent.run("Grow much older");

  return (
    <div>
      <div>
        {userProfile.name} is currently {userProfile.age} years old
      </div>
      <button onClick={growMuchYounger}>Grow much younger</button>
      <button onClick={growYounger}>Grow younger</button>
      <button onClick={growOlder}>Grow older</button>
      <button onClick={growMuchOlder}>Grow much older</button>
    </div>
  );
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/react-agentic-counter?file=src%2Fmain.jsx)

You can BYO OpenAI API key to [try this live](https://stackblitz.com/edit/react-agentic-counter?file=src%2Fmain.jsx).

I think this is a powerful idea for engineers, designers, and product managers.

## Technical merits

1. You can compose an entire application with declarative states and tools just as you would do in a well-architected React app.
1. Developers fully control the implementation of tool use. Correctness and efficiency are in your hands.
1. Agents are only used as tool choosers and parameter fillers. This means much faster response and less room for hallucination.
1. Agent actions affect UI immediately and deterministically, using the well-understood `UI = f(State)` rendering model.

## HCI merits

1. The human user _is_ steering the agent by just clicking and navigating around, because those actions cause the agent state and tool availability to change.
1. As state and tool availability change, the agent's context window is automatically aligned with the most relevant task based on the UI.
1. Both the human user and the agent share the entire UI state and tools to interact with it. The I/O is much richer than the prevailing prompt-driven approach.
1. Good UI Information Architecture automatically becomes good Agent Cognitive Architecture. Many [UX laws](https://alistapart.com/article/psychology-of-design/) translate well into AI Psychology.

## Business merits

1. In-place enhancement for existing React applications. It's not a rewrite. It's incremental agentification.
1. A good React developer automatically becomes a good Agent developer, maximizing skill transfer.
1. It paves a smooth path for UI to evolve into agents. You can imagine at some point in the future, we set `display: none` on the entire UI and what's left is a fully functional agent.

If you want to build your own agentic app with React, I've implemented the ideas in this post into the [react-agent-hooks](https://github.com/chuanqisun/react-agent-hooks) library. I hope that would give you a head start. I look forward to seeing what you build with it.

\*Footnote: The title is word play on [ReAct](https://arxiv.org/abs/2210.03629) and [Attention is All You Need](https://arxiv.org/abs/1706.03762). It's almost poetic that ReAct and React are finally meeting each other here.
