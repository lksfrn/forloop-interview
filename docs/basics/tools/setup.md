# Setup

This section describes neccessary steps on one-time setup to be able to actively colaborate with the rest of the team. If something does not work, always look at this section first.

## Git (GitHub)

1. install [Git](https://git-scm.com/)
1. create [GitHub](https://github.com/) account
   -  choose a username (strongly recommended to be in lowercase)
   -  password must have **at least 10 characters** (uppercase, lowercase letters, numbers, special characters)
   -  enable two-factor auth
1. wait to be added to our [organization](https://github.com/altaisdev)
1. create SSH key of **ED25519** type
   -  on good systems run `ssh-keygen -t ed25519`
   -  then add this key to your GitHub account [here](https://github.com/settings/keys)
1. generate a GPG key using this [guide](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/generating-a-new-gpg-key)
   -  add the key to your GitHub account [here](https://github.com/settings/keys)
1. got to "Settings/Developer settings/Personal access tokens" and create new token
   -  be sure to check "Write packages" (it will automatically check the rest for you)
   -  also save this token somewhere **safe!** as you will need it later
1. clone documentation: `git clone git@github.com:altaisdev/docs.git` (for later use)

-  always use Linux **LF** line endings
-  always **UTF-8** encoding

Let's show an example of recommended `.gitconfig`:

```toml
# must match with the GitHub email and username
[user]
    email = <email>
    name = <username>

# default strategy of conflict resolution is merge
[pull]
    rebase = false

# some progressivity here
[init]
    defaultBranch = main

[commit]
    gpgsign = true
```

## Docker

1. install [Docker](https://docs.docker.com/engine/install/)
1. login to our registry: `docker login ghcr.io -u <username> --password-stdin`
   -  use your GitHub personal token as an password
   -  you may need to press Ctrl+D to finish password input

## NodeJS

1. install [NodeJS](https://nodejs.org/en/download/)
1. install [Yarn](https://yarnpkg.com/getting-started/install)
1. login to our registry: `npm login --scope=@altaisdev --registry=https://npm.pkg.github.com`
   -  use your GitHub personal token as an password
   -  this is auth for npm package manager
1. inside `docs` folder, the one you cloned earlier, run `yarn npm login --publish`
   -  use your GitHub personal token as an password
   -  this is auth for Yarn package manager

## VS Code

1. install [VS Code](https://code.visualstudio.com/)
1. install required extensions
   -  `visualstudioexptteam.vscodeintellicode`
   -  `mikestead.dotenv`
   -  `dbaeumer.vscode-eslint`
   -  `esbenp.prettier-vscode`
   -  `csstools.postcss`
   -  `voorjaar.windicss-intellisense`
   -  `johnsoncodehk.volar`
   -  `formulahendry.auto-rename-tag`
1. install recommended extensions
   -  `pkief.material-icon-theme`
   -  `aaron-bond.better-comments`
   -  `ms-azuretools.vscode-docker`
   -  `eamodio.gitlens`
