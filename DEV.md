# Ariadna UI Development

## Deployment

Check that the git hooks are executable:

```shell
chmod +x .git-hooks/pre-commit
```

Go to the library directory and specify the local path to the file `.gitconfig`:

```shell
cd libraries/ariadna-ui
git config --local include.path ../.gitconfig
```

Installing dependencies:

```shell
npm i
```

### List of commands

* `npm run update-package` - Automatically updates the `package.json` when adding/changing the library.
* `npm run build` - Builds the production version of the library (without sourcemap).
* `npm run build-dev` - Builds the development version of the library (with sourcemap).
* `npm run test` - Starts testing the library.
* `npm run test:watch` - Starts testing the library in `watch` mode.
* `npm run release` - Release of a new version of the library.
* `npm run pre-release` - Pre-release (beta) of a new version of the library.

