# VS Code

We strongly recommend VS Code as an IDE, because we have a list of plugins ready for it and everything is nicely integrated.

## Quick tutorial

Using VS Code is intuitive, but some features are hidden. I recommend this [video](https://www.youtube.com/watch?v=ifTF3ags0XI) for higher productivity. Also put `File` > `Auto Save`.

These [**shortcuts**](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) are very useful. It is recommended to print and learn them.

## Ultimate setup

> Skip for now...

Install the `ms-vscode-remote.remote-containers` plugin. On the bottom left of the VS Code list you have a button with two arrows pointing to each other `Open and Remote Window`. Click on it and say `Reopen in Container`. Now it will take quite a while (just for the first time) to download all the Docker images, build and create the container. I recommend to look at the log (VS Code will offer it). Just turn it on and go.

-  After boot, dependencies and migration are installed
-  you don't have to worry about Node and NPM versions
-  you have the CLI of a tool like `mc` or `ranger`
-  you have preinstalled global NPM tools like `typescript` or `fastify-cli`
-  you get a nicely configured shell (ZSH and BASH)

::: warning
It only works if there is a `.devcontainer` folder in the project. Otherwise it will not know the configuration and I don't recommend to go into the configuration yourself.
:::

## Plugins

Install with Ctrl+Shift+P and then Install extensions.

**Strongly recommended up to obligatory**

-  `visualstudioexptteam.vscodeintellicode` - **vsichni**
-  `mikestead.dotenv` - **vsichni**
-  `dbaeumer.vscode-eslint` - **frontend, backend**
-  `esbenp.prettier-vscode` - **frontend, backend**
-  `csstools.postcss` - frontend
-  `bradlc.vscode-tailwindcss` - frontend
-  `octref.vetur` - frontend
-  `formulahendry.auto-rename-tag` - frontend
-  `wholroyd.hcl` - devops

::: warning
You need to enable ESLint and Prettier in VS Code. I recommend to enable it for all projects. You can also click on the right button to `Format Document With...` > `Configure Default Formatter...` > select `Prettier - Code formatter` or `ESLint`.

At the bottom right, in the blue status bar, you should see two check marks next to both ESlint and Prettier.
:::

**Great**

-  `pkief.material-icon-theme` - nice icons
-  `aaron-bond.better-comments` - colorful comments
-  `ms-azuretools.vscode-docker` - Docker support
-  `eamodio.gitlens` - Git on steroids
