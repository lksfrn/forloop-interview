# Git

As our Git server, we use a [GitHub](https://github.com/) service within our [organization](https://github.com/altaisdev). Here we direct all questions regarding development, task assignment, bug / issue tracker, documentation, roadmaps and more.

::: tip
We rely on GitHub a lot. It is used not only for code management, but also for discussions, deployment, for CI/CD or as an container or npm registry. Try to know GitHub well, because it will definitely pay off.
:::

## Checklist

-  choose a username (strongly recommended to be in lowercase)
-  password must have **at least 10 characters** (uppercase, lowercase letters, numbers, special characters)
-  SSH key must be **ED25519** type
   -  on good systems run `ssh-keygen -t ed25519`
   -  then add this key to your GitHub account [here](https://github.com/settings/keys)
-  generate a GPG key using this [guide](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/generating-a-new-gpg-key) (~~so far optional~~)
   -  add the key to your GitHub account [here](https://github.com/settings/keys)
   -  in `.gitconfig` set `gpgsign = true` to the `[commit]` section according to the format below
-  the profile photo should be a photo of the **CAT**
-  always use Linux **LF** line endings
-  always **UTF-8** encoding

Let's show an example of `.gitconfig`:

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

# set only when you want to use GPG signing
[commit]
    gpgsign = true
```

If `.gitconfig` conflicts with your global Git config, you can scope the previous config, for example, to `~/Altais/.gitconfig`. You only add the following code to the global config (folder and file names can of course be modified). The limitation of this setup is that all Altais repositories must be in the configured folder, in this case in `~/Altais`:

```toml
# set only when conflicting
#    eg. you have different setup for GitHub and another Git server
# it loads config for folder ~/Altais saved in ~/Altais/.gitconfig
# next lines must be in global ~/.gitconfig
[includeIf "gitdir:~/Altais/"]
    path = ~/Altais/.gitconfig
```

## Structure

We distinguish several groups according to the organization. It is possible that you do not have access to some. If you feel that you have access, you should contact `@lukeeno`. The groups are defined with prefixes (`website-animanie`).

## GitLab flow

A modified [GitLab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html) is used for development. The main development takes place on the `main` branch into which feature branches are merged. These add some functionality or fix bugs. The `main` branch should be tested, working and more or less stable. Feature branches are rodeo. The `main` branch is then merged into the `production` branch, which is automatically deployed to our cluster.

::: warning
Do not push directly to `main` branch. Always try to create a PR and then wait for approval. You should not even have the permission for pushing to `main` branch. If you still manage to do it, please contact admins and they will restrict acess.
:::

### Versioning

[Semantic Versioning](https://semver.org/) has format `<major>.<minor>.<patch>`.

**Major** is for the biggest changes or complete redesign of functions. Almost nothing has to be backwords compatible.

**Minor** indicates the addition of a feature, a change in speed, or a smaller change. It can, _but should not_, have breaking changes.

**Patch** only adds bug fixes and unnoticable improvements. It can not contain breaking changes.

## Naming conventions

Branch names are in English with lower case and hyphens (known as `kebab-case`): `user-reset-password`.

Issues are named in English, but the content can be in Czech. If possible, use issue templates.

Pull Requests (often referred to as PRs) also have English names and optionally Czech content. If you write `@closes #<issue-id>` in the description, it will automatically close the issue upon merging.

### Commit messages

We use Angular commit messages that specify changes in the format `<subject>(<scope>): <message>`:

-  all lowercase
-  in English
-  `<message>` starts with the imperative form of the verb
   -  should complete the sentence in your head: When applied, this commit will...
-  `<subject>` is one word from `chore`, `feat`, `refactor`, `perf`, `fix`, `test`, `style`...
-  `<scope>` can be omitted with parentheses, but otherwise it specifies what part of the code it is (e.g. the name of a package in a monorepo)

Examples of good commit messages:

```
feat(core): add address field to user
fix: remove failing e2e test on /user/foo
refactor: rewrite function bar to support new API
style(): refactor and format code
chore(release): release v1.5.4
```

There is a simpler version of this format that does not uses `<subject>(<scope>):`. Other rules apply the same. This simpler format is used when working on not so important projects:

```
add address field to user
remove failing e2e test on /user/foo
rewrite function bar to support new API
refactor and format code
release v1.5.4
```

## Git hooks

Some projects use Git hooks. These are the scripts that are automatically called on certain action like commit, push, merge, etc. They check that all tests are not failing, commit messages are in the right form, linters and formatters are passing. If something fails for some reason and you _really_ need to run certain Git command, use the `--no-verify` switch (for `commit` and `push` commands). This is also useful when you need help with the code and linters or tests are complaining:

```bash
git commit --no-verify -m "add some important feature quickly"
```
