# AMPECO UI

UI Components library for AMPECO based on Laravel Nova Design System.

## Versions

- AMPECO UI - 0.2.x (compatible with React 19.x.x)
- Package Name - ampeco-ui

### 0.5.0

- Add Getting Started documentation page with integration guide
- Add Theming documentation page with color scheme and dark mode configuration

### 0.4.5

- Update Select component tests to use focus instead of click for dropdown activation

### 0.4.4

- Card: Add className prop support
- Fix Select component tests

### 0.4.3

- BaseButton: Update loader and children rendering layout
- Card: Change actions container width from fixed to max-width
- Select: Change field interaction from onClick to onFocus, add onClick to chevron
- Add link styling (primary color with hover underline)

### 0.4.1

- Fixed dropdown position when there's an error

### 0.4.0

- Add Textarea component with tests and stories
- Add required prop to all form components (Checkbox, Radio, Toggle, DatePicker, TimePicker, Select)
- Fix Chart component tests
- Fix Card component tests
- Remove unused formField prop and wrapper classes from Input and Textarea
- Update Loader component styling
- Add ErrorMessage to RadioGroup component
- DatePicker: Remove SimpleDate support, now only uses Date objects
- Card: Remove isolate class from styling

### 0.3.2

- Fix coverage report 404 error on GitHub Pages by using relative paths for static assets

### 0.3.1

- Reorganize the dependencies of the package.

### 0.3.0

- Update package.json main and module paths to include "./dist/" prefix
- Add apexcharts as peer dependency
- Add "use client" banner to build output in vite.config.ts

### 0.2.0

- Add Chart component with ApexCharts integration and related tests and stories
- Chart integration in Card component
- Clean up unnecessary Card classes

### 0.1.0

- Initial release
