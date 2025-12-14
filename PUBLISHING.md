# Publishing Guide

This document describes how to publish the `@ampeco/ampeco-ui` package to GitHub Package Registry.

## Prerequisites

1. **GitHub Personal Access Token (PAT):**
   - Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
   - Generate a new token with the following scopes:
     - `write:packages` - to publish packages
     - `read:packages` - to install packages
     - `delete:packages` - (optional) to delete package versions
   - Copy and save the token securely

2. **Repository Access:**
   - You must have write access to the `ampeco/ampeco-backend-ui-package` repository

## Publishing Methods

### Method 1: Automated Publishing via GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically publishes the package.

#### Option A: Publish on Release

1. Update the version in `package.json`:
   ```shell
   npm version patch  # or minor, major
   ```

2. Commit and push the changes:
   ```shell
   git add package.json
   git commit -m "Bump version to x.x.x"
   git push
   ```

3. Create a new release on GitHub:
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v0.1.1`)
   - Fill in release notes
   - Click "Publish release"

The workflow will automatically run and publish the package.

#### Option B: Manual Workflow Trigger

1. Go to the repository on GitHub
2. Navigate to "Actions" tab
3. Select "Publish to GitHub Packages" workflow
4. Click "Run workflow"
5. Optionally specify a version (e.g., `0.1.1`) or leave empty to use the current version in `package.json`
6. Click "Run workflow"

### Method 2: Manual Publishing from Local Machine

If you prefer to publish manually from your local machine:

1. **Authenticate with GitHub Packages:**

   Create or edit your `~/.npmrc` file (in your home directory):
   ```
   @ampeco:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

   Replace `YOUR_GITHUB_TOKEN` with your personal access token.

2. **Update the version:**
   ```shell
   npm version patch  # or minor, major
   ```

3. **Build and publish:**
   ```shell
   npm run build:lib
   npm publish
   ```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (1.0.0 → 2.0.0): Breaking changes
- **MINOR** version (0.1.0 → 0.2.0): New features, backward compatible
- **PATCH** version (0.1.0 → 0.1.1): Bug fixes, backward compatible

Use npm version commands:
```shell
npm version major   # 0.1.0 → 1.0.0
npm version minor   # 0.1.0 → 0.2.0
npm version patch   # 0.1.0 → 0.1.1
```

## Verifying Publication

After publishing, verify the package:

1. Go to the repository on GitHub
2. Click on "Packages" in the right sidebar
3. You should see `@ampeco/ampeco-ui` listed

Or check via API:
```shell
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://npm.pkg.github.com/@ampeco/ampeco-ui
```

## Installing the Published Package

Users need to configure their `.npmrc` to install from GitHub Packages:

```
@ampeco:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install:
```shell
npm install @ampeco/ampeco-ui
```

## Troubleshooting

### "npm ERR! 404 Not Found - GET https://registry.npmjs.org/@ampeco%2fampeco-ui"

This means npm is trying to install from the public npm registry instead of GitHub Packages. Make sure your `.npmrc` is configured correctly.

### "npm ERR! 401 Unauthorized"

Your GitHub token is invalid or doesn't have the required permissions. Generate a new token with `read:packages` scope.

### "npm ERR! 403 Forbidden"

You don't have permission to publish to this package. Make sure:
- You have write access to the repository
- Your token has `write:packages` scope
- The package name matches the repository organization (`@ampeco`)

### Build Fails Before Publishing

Make sure all tests pass and the build succeeds locally:
```shell
npm test
npm run build:lib
```

## Best Practices

1. **Always update CHANGELOG.md** before publishing a new version
2. **Run tests** before publishing: `npm test`
3. **Test locally** in a consuming project before publishing
4. **Use semantic versioning** consistently
5. **Write clear release notes** when creating GitHub releases
6. **Keep dependencies up to date** but test thoroughly after updates

