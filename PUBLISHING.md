# Publishing Guide

This document describes how to publish the `@ampeco/ampeco-ui` package to [npm](https://www.npmjs.com/package/@ampeco/ampeco-ui).

## Prerequisites

1. **Repository Access:**
   - You must have write access to the `ampeco/ampeco-backend-ui-package` repository

2. **npm Access (for manual publishing only):**
   - You must be a member of the `@ampeco` npm organization
   - Authenticate with npm: `npm login`

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
   git add package.json package-lock.json
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
3. Select "Publish to npm" workflow
4. Click "Run workflow"
5. Optionally specify a version (e.g., `0.1.1`) or leave empty to use the current version in `package.json`
6. Click "Run workflow"

### Method 2: Manual Publishing from Local Machine

If you prefer to publish manually from your local machine:

1. **Authenticate with npm:**
   ```shell
   npm login
   ```

2. **Update the version:**
   ```shell
   npm version patch  # or minor, major
   ```

3. **Build and publish:**
   ```shell
   npm run build:lib
   npm publish --access public
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

1. Check on npm: https://www.npmjs.com/package/@ampeco/ampeco-ui

Or via CLI:
```shell
npm view @ampeco/ampeco-ui
```

## Troubleshooting

### "npm ERR! 401 Unauthorized"

Your npm token is invalid or expired. Run `npm login` again.

### "npm ERR! 403 Forbidden"

You don't have permission to publish to this package. Make sure:
- You are a member of the `@ampeco` npm organization
- You have publish permissions for the package

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
