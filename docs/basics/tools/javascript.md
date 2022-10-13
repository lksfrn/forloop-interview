# JavaScript

## Glossary

**POJO** is a plain old JavaScript object, written as `{ property: 'value' }`.

**Arrow function** is a special type of function, written as `(param) => { /* code */ }`.

**Promise** is a concept of performing (and waiting for) asynchronous code. More info [here](https://duckduckgo.com/?q=js+promise). Newest versions of NodeJS are relying on them a lot.

**Async/await** is a modern approach when working with promises. Use it everytime you can.

## ECMAScript

More precise name for JavaScript is ECMAScript. The most important version is ES2015 (also called ES6). It brought a lot of new features (and breaking changes). The JS world was changed forever.

## TypeScript

[TypeScript](https://www.typescriptlang.org/) is a JavaScript transpiler, which adds typings. Look for `tsconfig.json`.

Master `@lukeeno` suggests [the first](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html), [the second](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [the third](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html) really fast tutorial. They should take more or less 15 minutes in total.

If you install a dependency that doesn't have types directly in itself, VS Code will complain. Types can always be installed externally as a dev dependency for the `foo` package and `@bar/baz`:

```bash
npm i -D @types/foo @types/bar__baz
```

## Bundler

JavaScript as such has many forms. Before 2015 it was almost unusable and then came ES2015, or ES6 specification. Every year, new features are released, but they can't be used directly because not all browsers have been updated to support them. Then there's NodeJS, which has a completely different feature set. On the client, CSS is mixed in as well. Bundler can take modern JS and compile it into legacy JS. Other features include polyfill (adding features that are missing in legacy JS), file minification, adding CSS, watcher for changes, dev server and many more.

Consider following: VueTS SFC > TypeScript > legacy JS + CSS > minification.

[**Webpack**](https://webpack.js.org/) is one of the first and most used bundlers. Unfortunately, it is hard to work with.

[**Rollup**](https://rollupjs.org/guide/en/) is a successor of Webpack. It is focused on simplicity and created by Rich Harris (Svelte author).

[**Esbuild**](https://esbuild.github.io/) is crazy fast dev server written in Go. Not directly used.

[**Vite**](https://vitejs.dev/) is a Rollup-compatible frontend development server based on Esbuild created by Evan You.

## Utilities

[**Mrm**](https://mrm.js.org/) manages and synchronizes (config) files across multiple repositories.

[**ESLint**](https://eslint.org/) checks code for numerous issues. This is called _linting_ in general.

[**Prettier**](https://prettier.io/) forces correct code format.

[**Commitlint**](https://commitlint.js.org/#/) forces correct commit message format.

[**Stylelint**](https://stylelint.io/) is a linter for CSS.

[**Husky**](https://github.com/typicode/husky) is a package for working with Git hooks.

[**Lint Staged**](https://github.com/okonet/lint-staged) runs linters and formaters on specific set of files.

[**Lerna**](https://lerna.js.org/) is a monorepo management system.

[**Sort Package JSON**](https://www.npmjs.com/package/sort-package-json) sorts sections in `package.json` file

[**Npm Check Updates**](https://www.npmjs.com/package/npm-check-updates) is for checking for updates to all dependencie. Switch `-u` rewrites version in `package.json`, then you can only need to run `npm i` to reflect new versions. Do not use shortcut `ncu`, always use fully qualified name `npm-check-updates`.

[**Standard**](https://www.npmjs.com/package/standard) is for fast JS code formatting (**do not** use it for projects that have Prettier).
