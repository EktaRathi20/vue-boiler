# vue-boilerplate

## Project Setup
```sh
npx vue-boiler-template@`latest_version` project_name 
```

For Example - 
```sh
npx vue-boiler-template@0.1.3 vue-template
```

### Install dependency
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest]

```sh
npm run test:unit
```

### Lint with [ESLint]

```sh
npm run lint
```

### Component Structure

A typical Vue component contains the following sections:

1. IMPORTS
2. COMPOSABLE
3. STORES
4. PROPS
5. EMITS
6. DATA
7. SCHEMA
8. METHODS
9. COMPUTED
10. WATCHER
11. HOOKS
12. TEMPLATE
13. STYLE SCOPED

### Directory Structure

1. src/
   1. assets/: Static assets like CSS, images, etc.
   2. components/: Vue components.
      1. Base/: Base components like buttons, inputs, etc.
      2. Icons/: Icon components.
   3. constants/: Constant values used throughout the application.
   4. layouts/: Layout components.
   5. locales/: Localization files.
   6. middleware/: Middleware for API clients, etc.
   7. models/: TypeScript interfaces and types.
   8. plugins/: Vue plugins.
   9. router/: Vue Router configuration.
   10. services/: Service functions and classes.
   11. stores/: Pinia stores.
   12. utils/: Utility functions.
   13. views/: Vue views or pages.
