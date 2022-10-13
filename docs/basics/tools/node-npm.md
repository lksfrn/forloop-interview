# NodeJS and npm

You will need [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). NodeJS is a JavaScript interpreter for server and npm stands for node package manager, [or is it?](https://github.com/npm/npm-expansions).

## Glossary

**Package** is a set of files that can be imported into a project. It is a way of distributing and using other people's code. The source code is available on GitHub.

**Package namespace** is for example `@foo/` in `@foo/bar`. This denotes group that have multiple packages, but otherwise behave like normal names. Our namespace is `@altaisdev/`.

**Monorepo** is the practice of having multiple npm packages in one Git repository. This greatly simplifies working with them and helps with cross dependencies.

## Checklist

Check that you have required versions:

```bash
node -v # >=14
npm -v # >=7
```

## Commands for npm

Install all packages (should be run after each pull or merge):

```bash
npm i # shortcut for npm install
```

Install package by name. You can specify one or more packages:

```bash
npm i <pkg1> <pkg2> ...
npm i vue fastify
```

Prepinac `-D` (`--dev`) adds packages to `devDependencies`. These are only needed for development and do not run on production (tests, eslint, prettier):

```bash
npm i -D <pkg1> <pkg2> ...
npm i -D eslint jest
```

::: tip
Some packages do not have types directly in them and must be installed separately as dev dependencies using `@types/<pkg>`. For example, the `uuid` package needs also:

```bash
npm i -D @types/uuid
```

:::

If you use workspaces in your project, you can add the package to a specific workspace using (can be combined with `-D`):

```bash
npm i --workspace <workspace> <pkg1> <pkg2> ...
npm i --workspace @altaisdev/meowtify-core uuid
```

You can also install packages globally with the `-g` (`--global`) switch. But on most Linux systems you have to use `sudo`. This is useful for installing CLI:

```bash
sudo npm i -g <pkg>
sudo npm i -g @vue/cli
```

### Scripts

In `package.json`, under `scripts` section, you can specify scripts and use them as:

```bash
npm run <script>
```

It is recommended to read and understand scripts, because they can significantly help with the development and they exist for some reason.

::: warning
Let's say that `npm run echo` just runs the `echo` command, which only makes sense if you pass a parameter to be evaluated. Unfortunately `npm run echo "Hello World"` will not work, because `"Hello World"` is only passed to `npm run` command itself. If we want it to _bubble_ into `echo` command, we need the following format with `--` (double dashes):

```bash
npm run echo -- "Hello World"
```

:::

The most common commands include the following scripts. They probably won't even be mentioned in the documentation or README because they are taken for granted:

```bash
npm run dev # starts dev server with watcher and auto restart after file change
npm run build # compiles files for production use
npm run start # starts production server after build
npm run test # runs test suites
```

## `npx`

Each npm package can also contain binaries that are run via the `npx` command. You don't have to install the binaries and can run them directly. The necessary files are downloaded only once. It is also useful to use the `-y` switch to skip the download confirmation:

```bash
npx -y <utility>
npx -y sort-package-json
```
