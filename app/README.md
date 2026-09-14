# Dev Stack

A clean and interactive technology stack builder for developers. Explore modern tools, compare them quickly, and build a personalized stack for your next project.

## Technology Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Toastify
- JSON data for technology cards

## Features

1. **Explore technologies** — Browse frontend, backend, database, and tooling options in responsive selection cards.
2. **Build your stack** — Add technologies to your personal stack, remove individual items, or clear everything at once.
3. **Responsive experience** — Use the site comfortably on mobile, tablet, and desktop with a branded loading screen and toast notifications.


## React Questions

### What is JSX, and why is it used in React?

JSX is a syntax that lets us write HTML-like UI inside JavaScript. React uses it to describe what the page should look like in a clear and readable way.

### What is the difference between props and state?

Props are values passed into a component by its parent. State is data owned by the component that can change and cause the UI to update.

### What does the `useState` hook do, and where did you use it in this project?

`useState` stores changing data in a component. This project uses it for the technology list, selected stack, loading screen, and mobile navigation menu.

### What does the `useEffect` hook do, and why did you need it to load the JSON data?

`useEffect` runs code after the component renders. It is used here to place the imported technology JSON into state and finish the loading screen after the page is ready.

### Why does every item in a `.map()` list need a unique `key` prop?

A unique `key` helps React identify each item when the list changes. This lets React update only the items that actually changed.

### What is conditional rendering? Show one place you used it.

Conditional rendering means showing different UI depending on a condition. For example, the stack panel shows an empty message when no technologies are selected:

```tsx
{stack.length === 0 ? (
  <p>Your stack is empty.</p>
) : (
  <StackItems />
)}
```

### How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

A parent passes data through props, such as sending `stack` to `StackPanel`. A child sends information back by calling a callback prop, such as `onAdd` or `onRemove`.

