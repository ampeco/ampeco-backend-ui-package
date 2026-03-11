# AmpecoUI 

[![GitHub license](https://img.shields.io/github/license/ampeco/ampeco-backend-ui-package)](https://github.com/ampeco/ampeco-backend-ui-package/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@ampeco/ampeco-ui)](https://www.npmjs.com/package/@ampeco/ampeco-ui)
[![Storybook](https://img.shields.io/badge/Storybook-View%20Docs-FF4785?logo=storybook)](https://ampeco.github.io/ampeco-backend-ui-package/)
[![GitHub issues](https://img.shields.io/github/issues/ampeco/ampeco-backend-ui-package)](https://github.com/ampeco/ampeco-backend-ui-package/issues)

AmpecoUI is a collection of React UI components built with Tailwind CSS, based on Nova.

## Requirements

- React ^19.0.0
- React DOM ^19.0.0
- React Router DOM ^7.2.0 (peer dependency)
- Node.js 18.x, 20.x, or 22.x

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Getting started

### Installation

1. **Install the package:**

```shell
npm install @ampeco/ampeco-ui
```

2. **Include the required styles.** Import the CSS file in your application entry point:

```typescript
import "@ampeco/ampeco-ui/dist/style.css";
```

Or in your main CSS file:

```css
@import "@ampeco/ampeco-ui/dist/style.css";
```

3. **Configure Tailwind CSS** (if not already configured). The design system uses Tailwind CSS v4. Make sure your project has Tailwind CSS configured to support dark mode. The components use Tailwind's `dark:` variant for dark mode support.

### Running package locally in other projects for easier testing

1. Open terminal in root of this project and run following command

```shell
npm link
```

2. Build the package using `npm run build:lib` command (You need to build the package after every change to make them visible)

3. Open terminal in root of your desired project and run

```shell
npm link @ampeco/ampeco-ui
```

4. When you are done with testing run following command first in your project, then in this one

```shell
npm unlink --no-save @ampeco/ampeco-ui
```

NOTE: If you are having issues with running the package, first uninstall `@ampeco/ampeco-ui` from your dependencies, then follow the steps.

## Development

### Running Storybook

To view and develop components in Storybook:

```shell
npm run start:storybook
```

### Running Tests

```shell
npm test
```

### Building the Library

```shell
npm run build:lib
```

## Documentation

The component library documentation is available via Storybook, automatically deployed to GitHub Pages:

**[View Storybook Documentation](https://ampeco.github.io/ampeco-backend-ui-package/)**

## Publishing

For information on how to publish this package to npm, see [PUBLISHING.md](./PUBLISHING.md).

For information on deploying Storybook to GitHub Pages, see [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md).
