---
title: "Streamlet: Towards Compositional Reactivity"
date: 2025-07-03
keywords: ["engineering", "architecture"]
---

What if building user interfaces could be as natural as describing how data flows? Not through layers of abstraction or complex state management, but through simple composition of streams that connect directly to the DOM.

## The Vision

Modern frontend architectures often feel like we're fighting against the grain. Virtual DOMs diff entire trees. State management libraries wrap our data in ceremonies. Components re-render cascades of children. We've accepted complexity as the price of reactivity.

But what if we could build UIs where data flows through the DOM like water through a riverbed? Each value finding its own path, updating only what needs to change. No virtual DOM. No diffing. No unnecessary re-renders. Just data flowing directly to where it's needed.

This is the promise of compositional reactivity: building interfaces from streams that compose naturally at every layer, separated by concern.

## Core Principles

**Fine-grained reactivity**: Individual values stream directly to DOM nodes. When a counter increments, only that text node updates. When a todo toggles, only that checkbox changes.

**Composability**: Streams combine without architectural friction. Merge user events into a unified intent stream. Compose state transformations through reducers. Derive computed values through selectors. Each layer builds naturally on the last.

**Performance**: The template renders once. After that, only data flows. No reconciliation algorithms. No component boundaries to cross. The shortest path from state to screen.

**Transparency**: Every change has a cause. Every effect has a source. The entire data flow is observable, debuggable, and predictable. Open the console and watch your application think.

## Architecture Overview

The architecture follows a unidirectional data flow that should feel familiar, yet refreshingly direct:

```
  User ──┐                                                        
         ▼                                                        
    ┌─────────┐     ┌─────────┐     ┌──────────┐     ┌──────┐     
    │ Events  │────►│ Intents │────►│  State   │────►│ View │     
    └─────────┘     └─────────┘     └──────────┘     └───┬──┘     
         ▲                                               │        
         │                                               │        
         └───────────────────────────────────────────────┘        

```

But unlike traditional architectures, each arrow represents a living stream. Data doesn't pass through these layers; it flows through them continuously.

## Patterns

### The Intent Layer

User interactions become streams of intent. Not just events, but semantic actions that describe what the user wants to do:

```javascript
// Primitive intents from DOM events
const click$ = new Subject();
const input$ = new Subject();

// Semantic intents with meaning
const addTodo$ = input$.pipe(
  filter(e => e.key === 'Enter'),
  map(e => ({ type: 'ADD_TODO', text: e.target.value }))
);

// Composed intents from multiple sources
const saveTodo$ = merge(
  blur$.pipe(map(e => ({ type: 'SAVE', id: e.target.id }))),
  submit$.pipe(map(e => ({ type: 'SAVE', id: e.detail.id })))
);
```

Intents compose naturally. Merge them, filter them, transform them. They're just streams.

### The State Layer

State management becomes a composition problem. Instead of one monolithic reducer, we compose smaller, focused reducers:

```javascript
// Reducer for todos array
const todosReducer = (todos = [], intent) => {
  switch (intent.type) {
    case 'ADD_TODO':
      return [...todos, {
        id: intent.id,
        text: intent.text,
        done: false
      }];
    case 'TOGGLE_TODO':
      return todos.map(todo =>
        todo.id === intent.id
          ? { ...todo, done: !todo.done }
          : todo
      );
    default:
      return todos;
  }
};

// Reducer for filter state
const filterReducer = (filter = 'all', intent) => {
  switch (intent.type) {
    case 'SET_FILTER':
      return intent.filter;
    default:
      return filter;
  }
};

// Compose reducers into root reducer
const reducer = (state, intent) => ({
  todos: todosReducer(state.todos, intent),
  filter: filterReducer(state.filter, intent)
});

// Create state stream
const state$ = intents$.pipe(
  scan(reducer, initialState),
  shareReplay(1)
);
```

Each reducer handles its own slice of state. They compose without coupling. Add a new feature? Add a new reducer. The architecture scales naturally.

### The Selector Layer

Selectors derive specific values from state. They're composable, memoized streams:

```javascript
// Basic selectors
const todos$ = state$.pipe(
  map(state => state.todos),
  distinctUntilChanged()
);

const filter$ = state$.pipe(
  map(state => state.filter),
  distinctUntilChanged()
);

// Composed selectors
const visibleTodos$ = combineLatest([todos$, filter$]).pipe(
  map(([todos, filter]) => {
    switch(filter) {
      case 'active': return todos.filter(t => !t.done);
      case 'completed': return todos.filter(t => t.done);
      default: return todos;
    }
  })
);

// Parameterized selectors
const todoById$ = (id) => todos$.pipe(
  map(todos => todos.find(t => t.id === id)),
  distinctUntilChanged()
);
```

Each selector only emits when its value actually changes. Subscribers downstream never see redundant updates.

### The View Layer

This is where the magic happens. A custom directive bridges RxJS observables directly to lit-html templates:

```javascript
const observe = directive(class extends AsyncDirective {
  render(observable) {
    if (this.observable !== observable) {
      this.unsubscribe?.();
      this.observable = observable;
      if (this.isConnected) {
        this.subscribe(observable);
      }
    }
    return noChange;
  }
  
  subscribe(observable) {
    this.unsubscribe = observable.subscribe(value => {
      this.setValue(value);
    });
  }
  
  disconnected() {
    this.unsubscribe?.();
  }
  
  reconnected() {
    this.subscribe(this.observable);
  }
});
```

With this directive, templates become declarative descriptions of data flow:

```javascript
const TodoItem = (id) => html`
  <li class=${observe(todoById$(id).pipe(map(t => t.done ? 'done' : '')))}>
    <span>${observe(todoById$(id).pipe(map(t => t.text)))}</span>
    <button @click=${() => intents$.next({ type: 'TOGGLE_TODO', id })}>
      ${observe(todoById$(id).pipe(map(t => t.done ? '✓' : '○')))}
    </button>
  </li>
`;
```

The template renders once. After that, only values flow through the `observe` directives to update specific DOM nodes.

### The Effect Layer

Side effects become explicit streams that run alongside the main data flow:

```javascript
// Save to localStorage whenever todos change
todos$.pipe(
  debounceTime(1000),
  tap(todos => localStorage.setItem('todos', JSON.stringify(todos)))
).subscribe();

// Sync with backend
state$.pipe(
  debounceTime(2000),
  switchMap(state => 
    fetch('/api/state', {
      method: 'PUT',
      body: JSON.stringify(state)
    })
  ),
  retry(3)
).subscribe();
```

Effects compose just like everything else. Debounce them, retry them, cancel them. They're just streams.

## Why This Matters

Traditional architectures optimize for developer experience at the cost of runtime performance. Virtual DOMs make updates easy to reason about but expensive to execute. Component models provide nice boundaries but create re-render cascades.

Compositional reactivity inverts this trade-off. By making data flow explicit and granular, we get both clarity and performance. The architecture mirrors how we think about UI: values flow from state to screen.

But perhaps more importantly, everything composes. There are no special cases, no framework magic, no hidden complexity. Just streams combining to create behavior.

## Complete Todo Application

Here's a complete todo application demonstrating these patterns. Notice how each piece builds naturally on the previous ones:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Streamlet Todo</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    .add-todo {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .filter.active {
      font-weight: bold;
    }
    
    .todo-list {
      list-style: none;
      padding: 0;
    }
    
    .todo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }
    
    .todo.done {
      opacity: 0.5;
    }
    
    .todo.done .todo-text {
      text-decoration: line-through;
    }
    
    .todo-text {
      flex: 1;
    }
    
    .stats {
      margin-top: 1rem;
      padding: 0.5rem;
      background: #f5f5f5;
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { Subject, merge, combineLatest, scan, map, startWith, shareReplay, distinctUntilChanged, tap, debounceTime } from 'https://esm.sh/rxjs@7';
    import { html, render, noChange } from 'https://esm.sh/lit-html@3';
    import { directive, AsyncDirective } from 'https://esm.sh/lit-html@3/async-directive.js';

    // ═══════════════════════════════════════════════════════════
    // OBSERVE DIRECTIVE - Bridge between RxJS and lit-html
    // ═══════════════════════════════════════════════════════════

    class ObserveDirective extends AsyncDirective {
      render(observable) {
        if (this.observable !== observable) {
          this.unsubscribe?.();
          this.observable = observable;
          if (this.isConnected) {
            this.subscribe(observable);
          }
        }
        return noChange;
      }
      
      subscribe(observable) {
        this.unsubscribe = observable.subscribe(value => {
          this.setValue(value);
        });
      }
      
      disconnected() {
        this.unsubscribe?.();
      }
      
      reconnected() {
        this.subscribe(this.observable);
      }
    }
    
    const observe = directive(ObserveDirective);

    // ═══════════════════════════════════════════════════════════
    // INTENT LAYER - User actions as streams
    // ═══════════════════════════════════════════════════════════

    const addTodo$ = new Subject();
    const toggleTodo$ = new Subject();
    const deleteTodo$ = new Subject();
    const setFilter$ = new Subject();
    const clearCompleted$ = new Subject();

    const intents$ = merge(
      addTodo$.pipe(map(text => ({ type: 'ADD_TODO', text }))),
      toggleTodo$.pipe(map(id => ({ type: 'TOGGLE_TODO', id }))),
      deleteTodo$.pipe(map(id => ({ type: 'DELETE_TODO', id }))),
      setFilter$.pipe(map(filter => ({ type: 'SET_FILTER', filter }))),
      clearCompleted$.pipe(map(() => ({ type: 'CLEAR_COMPLETED' })))
    );

    // ═══════════════════════════════════════════════════════════
    // STATE LAYER - Composed reducers for modular state management
    // ═══════════════════════════════════════════════════════════

    // Reducer for todos array
    const todosReducer = (todos = [], intent) => {
      switch (intent.type) {
        case 'ADD_TODO':
          return [...todos, {
            id: intent.id,
            text: intent.text,
            done: false
          }];
          
        case 'TOGGLE_TODO':
          return todos.map(todo =>
            todo.id === intent.id
              ? { ...todo, done: !todo.done }
              : todo
          );
          
        case 'DELETE_TODO':
          return todos.filter(todo => todo.id !== intent.id);
          
        case 'CLEAR_COMPLETED':
          return todos.filter(todo => !todo.done);
          
        default:
          return todos;
      }
    };

    // Reducer for nextId
    const nextIdReducer = (nextId = 1, intent) => {
      switch (intent.type) {
        case 'ADD_TODO':
          return nextId + 1;
        default:
          return nextId;
      }
    };

    // Reducer for filter
    const filterReducer = (filter = 'all', intent) => {
      switch (intent.type) {
        case 'SET_FILTER':
          return intent.filter;
        default:
          return filter;
      }
    };

    // Compose reducers into root reducer
    const reducer = (state, intent) => {
      // Handle ADD_TODO specially to pass the current nextId
      const enhancedIntent = intent.type === 'ADD_TODO' 
        ? { ...intent, id: state.nextId }
        : intent;
        
      return {
        todos: todosReducer(state.todos, enhancedIntent),
        nextId: nextIdReducer(state.nextId, intent),
        filter: filterReducer(state.filter, intent)
      };
    };

    const initialState = {
      todos: [
        { id: 1, text: 'Build a reactive todo app', done: true },
        { id: 2, text: 'Compose streams naturally', done: false },
        { id: 3, text: 'Achieve fine-grained updates', done: false }
      ],
      filter: 'all',
      nextId: 4
    };

    const state$ = intents$.pipe(
      scan(reducer, initialState),
      startWith(initialState),
      shareReplay(1)
    );

    // ═══════════════════════════════════════════════════════════
    // SELECTOR LAYER - Composable derivations
    // ═══════════════════════════════════════════════════════════

    const todos$ = state$.pipe(
      map(state => state.todos),
      distinctUntilChanged()
    );

    const filter$ = state$.pipe(
      map(state => state.filter),
      distinctUntilChanged()
    );

    const visibleTodos$ = combineLatest([todos$, filter$]).pipe(
      map(([todos, filter]) => {
        switch (filter) {
          case 'active': return todos.filter(t => !t.done);
          case 'completed': return todos.filter(t => t.done);
          default: return todos;
        }
      })
    );

    const todoCount$ = todos$.pipe(
      map(todos => todos.filter(t => !t.done).length)
    );

    const completedCount$ = todos$.pipe(
      map(todos => todos.filter(t => t.done).length)
    );

    const hasCompleted$ = completedCount$.pipe(
      map(count => count > 0)
    );

    // ═══════════════════════════════════════════════════════════
    // VIEW LAYER - Declarative templates with fine-grained updates
    // ═══════════════════════════════════════════════════════════

    const TodoItem = (todo) => html`
      <li class="todo ${todo.done ? 'done' : ''}">
        <input
          type="checkbox"
          .checked=${todo.done}
          @change=${() => toggleTodo$.next(todo.id)}
        />
        <span class="todo-text">${todo.text}</span>
        <button @click=${() => deleteTodo$.next(todo.id)}>Delete</button>
      </li>
    `;

    const TodoList = () => html`
      <ul class="todo-list">
        ${observe(visibleTodos$.pipe(
          map(todos => todos.map(todo => TodoItem(todo)))
        ))}
      </ul>
    `;

    const Filters = () => html`
      <div class="filters">
        <button
          class="filter ${observe(filter$.pipe(map(f => f === 'all' ? 'active' : '')))}"
          @click=${() => setFilter$.next('all')}
        >
          All
        </button>
        <button
          class="filter ${observe(filter$.pipe(map(f => f === 'active' ? 'active' : '')))}"
          @click=${() => setFilter$.next('active')}
        >
          Active
        </button>
        <button
          class="filter ${observe(filter$.pipe(map(f => f === 'completed' ? 'active' : '')))}"
          @click=${() => setFilter$.next('completed')}
        >
          Completed
        </button>
        ${observe(hasCompleted$.pipe(
          map(has => has ? html`
            <button @click=${() => clearCompleted$.next()}>
              Clear completed
            </button>
          ` : '')
        ))}
      </div>
    `;

    const Stats = () => html`
      <div class="stats">
        ${observe(todoCount$)} active, ${observe(completedCount$)} completed
      </div>
    `;

    const App = () => html`
      <h1>Streamlet Todo</h1>
      
      <input
        type="text"
        class="add-todo"
        placeholder="What needs to be done?"
        @keydown=${(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            addTodo$.next(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
      
      ${Filters()}
      ${TodoList()}
      ${Stats()}
    `;

    // ═══════════════════════════════════════════════════════════
    // RENDER - Single render, then data flows
    // ═══════════════════════════════════════════════════════════

    render(App(), document.getElementById('app'));

    // ═══════════════════════════════════════════════════════════
    // EFFECTS - Side effects as explicit streams
    // ═══════════════════════════════════════════════════════════

    // Save to localStorage
    todos$.pipe(
      debounceTime(500),
      tap(todos => localStorage.setItem('streamlet-todos', JSON.stringify(todos)))
    ).subscribe();

    // Log all intents for debugging
    intents$.pipe(
      tap(intent => console.log('Intent:', intent))
    ).subscribe();

    // Log state changes
    state$.pipe(
      tap(state => console.log('State:', state))
    ).subscribe();

  </script>
</body>
</html>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/streamlet-todo?file=src%2Fmain.js)

