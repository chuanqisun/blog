---
title: React (Hooks) is All You Need
date: 2025-04-19
keywords: ["ai", "engineering"]
---

The agent hype is still on the rise but the quality and efficiency of agentic systems are far from production-ready. As people scramble to come up with new architectures tackle the agentic system design challenge, I saw [Humanlayer](https://www.humanlayer.dev/) dropping this tongue-in-cheek principle in [12-factor-agents](https://github.com/humanlayer/12-factor-agents). As a functional programming lover, I'm drooling over this diagram:

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

> **Factor 12 - Make your agent a stateless reducer!**
>
> If we [...] accept that "an AI Agent is basically a for loop", then what's the lispy version of this? And AI agent is a foldL where the accumulator is a context window, and the reducer is an LLM DetermineNextStep + a switch statement on how to handle it.
>
> -- [12-factor-agents](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-12-stateless-reducer.md)

Does this look familiar to you as frontend developer? It should. This is essentially the [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview) pattern that many popular frontend frameworks are based on. It is a really good "divide and conquer" strategy that modularizes state management into pure functional components and compose them in a conflict-free manner. In fact, we can model most Human-Computer interactions as a similar loop:

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

But can we take it a step further? React pretty good at managing the state of this **Human**-Computer Interaction loop, can we swap out the human with an AI agent and literally use React Hooks as the state management layer for an agentic systems?

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

To agentify it, let's replace `useState` with `useAgentState`, `useCallback` with `useAgentTool`. Then call `agent.run` to trigger agent actions, like this;

```tsx
function MyAgent() {
  const agent = useAgent();
  const [idea, setIdea] = useAgentState("Use React Hooks for agentic state management");
  useAgentTool("Adjust idea", z.string().describe("The updated idea"));

  const takeMoreRisk = () => agent.run("Take more risk");
  const takeLessRisk = () => agent.run("Take less risk");

  return (
    <div>
      <div>Idea: {idea}</div>
      <button onClick={takeMoreRisk}>Take more risk</button>
      <button onClick={takeLessRisk}>Take less risk</button>
    </div>
  );
}
```

And btw, I've made the above real with a few custom hooks. You can play with the [React Agenti Counter](https://stackblitz.com/edit/react-agent-counter?file=src%2Fmain.jsx) live. (BYO OpenAI API key)

This can be a powerful idea for engineers, designers, and product managers.

## Technical merits

1. You can compose an entire application with states and tools just as you would do with composing a well-architected React app.
1. Developers fully control the implementation of tool use. Correctness and efficiency are in your hands.
1. Agents are only used as tool choosers and parameter fillers. This means much faster response and less room for hallucination.
1. Agent actions are reflected back to the UI immediately, using a well-understood `UI = f(State)` rendering model.

## HCI merits

1. Human user _is_ steering the agent when they take actions on the UI that cause the state and tool availability to change.
1. As state and tool availability change, you can align the agent's context window to the most relevant task as communicated by the UI.
1. Both human user and the agent share the entire UI state and tools to interact with it. The I/O is much richer than the prevailing prompt-driven approach.
1. UI Information Architecture automatically becomes good Agent Cognitive Architecture. Many [UX laws](https://alistapart.com/article/psychology-of-design/) translates well into AI Psychology

## Business merits

1. In-place enhancement for existing React applications. It's not a rewrite. It's incremental agentification.
1. A good React developer automatically becomes a good Agent developer, maximizing skill transfer.
1. It paves a smooth path for UI to evolve into Agent. You can imagine at some point in the future, we set `display: none` on the entire UI. You end up with a full agent.

If you find the idea interesting, you can use the [react-agent-hooks](https://github.com/chuanqisun/react-agent-hooks) library to try it out. I look forward to seeing what you will build with it.

\*Footnote: The title is word play on [ReAct](https://arxiv.org/abs/2210.03629) and [Attention is All You Need](https://arxiv.org/abs/1706.03762). It's almost poetic that ReAct and React are finally meeting each other here.
