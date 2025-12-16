# Contributing to AmpecoUI

Thank you for your interest in contributing to AmpecoUI! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies:** `npm install`
3. **Create a branch** for your changes: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running Storybook

```bash
npm run start:storybook
```

This will start the Storybook development server where you can view and develop components.

### Running Tests

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

### Building the Library

```bash
npm run build:lib
```

## Making Changes

### Adding a New Component

1. Create your component in the `src/components` directory
2. Add TypeScript types for all props
3. Create a Storybook story in the `stories` directory
4. Add tests for your component
5. Update the main `index.ts` to export your component

### Code Style

- Use TypeScript for all code
- Follow the existing code style in the repository
- Use functional components and hooks
- Add JSDoc comments for complex logic
- Ensure all tests pass before submitting

### Commit Messages

Write clear, concise commit messages that describe what changed and why:

```
feat: add new Button variant
fix: resolve dark mode styling issue
docs: update installation instructions
```

## Submitting Changes

1. **Ensure all tests pass:** `npm test`
2. **Build the library:** `npm run build:lib`
3. **Commit your changes** with a clear commit message
4. **Push to your fork** and create a Pull Request
5. **Describe your changes** in the PR description

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include screenshots/videos for UI changes
- Update documentation if needed
- Ensure all CI checks pass
- Link any related issues

## Reporting Issues

Found a bug or have a feature request? Please create an issue with:

- A clear, descriptive title
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, etc.)

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to foster an inclusive and welcoming community.

## Questions?

Feel free to open an issue for any questions about contributing!

