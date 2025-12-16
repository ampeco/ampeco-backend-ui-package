# GitHub Pages Setup for Storybook

This guide will help you deploy your Storybook documentation to GitHub Pages.

## One-Time Setup

You need to enable GitHub Pages in your repository settings:

1. **Go to Repository Settings:**
   - Navigate to your repository: https://github.com/ampeco/ampeco-backend-ui-package
   - Click on "Settings" tab

2. **Configure GitHub Pages:**
   - In the left sidebar, click "Pages" (under "Code and automation")
   - Under "Build and deployment":
     - **Source:** Select "GitHub Actions"
   - Save the changes

That's it! The workflow is already configured.

## How It Works

The workflow (`.github/workflows/deploy-storybook.yml`) automatically:

1. **Triggers on:**
   - Every push to the `main` branch
   - Manual workflow dispatch (you can trigger it manually from GitHub Actions tab)

2. **Build Process:**
   - Checks out the code
   - Installs dependencies
   - Runs `npm run build:storybook` (which runs tests with coverage and builds Storybook)
   - Creates `storybook-static` directory with the built files

3. **Deployment:**
   - Uploads the `storybook-static` directory as a GitHub Pages artifact
   - Deploys to GitHub Pages

## Accessing Your Storybook

After the first successful deployment, your Storybook will be available at:

```
https://ampeco.github.io/ampeco-backend-ui-package/
```

## Manual Deployment

To manually trigger a deployment:

1. Go to the "Actions" tab in your repository
2. Select "Deploy Storybook to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (usually `main`)
5. Click "Run workflow"

## Troubleshooting

### "Deploy to GitHub Pages" fails with 404

Make sure GitHub Pages is enabled in repository settings with "GitHub Actions" as the source.

### Build fails

Check the workflow logs in the Actions tab. Common issues:
- Tests failing (the `build:storybook` script runs tests first)
- Missing dependencies
- Build errors in Storybook

### Pages not updating

- Check that the workflow completed successfully in the Actions tab
- It may take a few minutes for changes to appear
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you're looking at the correct URL

## Workflow Status Badge

Add this badge to your README to show the deployment status:

```markdown
[![Deploy Storybook](https://github.com/ampeco/ampeco-backend-ui-package/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/ampeco/ampeco-backend-ui-package/actions/workflows/deploy-storybook.yml)
```

## Customization

### Deploy from a Different Branch

Edit `.github/workflows/deploy-storybook.yml` and change:

```yaml
on:
  push:
    branches: [ develop ]  # Change 'main' to your preferred branch
```

### Skip Tests During Build

If you want to build Storybook without running tests, modify `package.json`:

```json
{
  "scripts": {
    "build:storybook": "storybook build",
    "build:storybook:with-tests": "vitest run --coverage && storybook build"
  }
}
```

Then update the workflow to use `npm run build:storybook`.

### Build Only on Tags/Releases

If you want to deploy only on releases:

```yaml
on:
  release:
    types: [published]
  workflow_dispatch:
```

## Private Repository Considerations

Since your repository is private:
- The GitHub Pages site will also be **private** by default (requires authentication)
- Only people with repository access can view the Storybook
- If you need to make it public, you need to upgrade to GitHub Enterprise or make the repository public

To check if your Pages site is public or private:
1. Go to Settings → Pages
2. Look for the visibility setting (available for private repos with certain GitHub plans)

