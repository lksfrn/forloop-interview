# GitHub

There are some additional steps required for a pleasant developer experience.

## Login to GitHub Packages

Create personal access token in Settings/Developer settings/Personal access tokens. Check "Write packages" as it will automatically check all necessary options. Use that token as an password for following services:

```bash
npm login --scope=@altaisdev --registry=https://npm.pkg.github.com
docker login ghcr.io -u <username> --password-stdin # press Ctrl+D after password
```
