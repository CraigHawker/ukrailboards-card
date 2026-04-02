# Copilot Instructions - UK Rail Boards

## Project Goals

This is a **Home Assistant custom Lovelace card** that displays real-time UK National Rail departure data in multiple formats, matching the visual style of UK railway station boards. The project aims to:

- Display train departure information with station-specific layouts (overhead platform, single train, table formats)
- Support multiple themes (LED-style classic, London 2025 modern variant)
- Provide a production-ready HACS component for Home Assistant users
- Enable extensible styling and layout through templating and theming

## High-Level Architecture

### Core Components

- **Card Entry Point** (`src/lovelace/ukrailboards-card.js`): ES module exporting a custom HTML element that integrates with Home Assistant's Lovelace UI
- **HTML Templates** (`src/templates/`): Handlebars templates (board.hbs, layout.hbs, theme.hbs) that render board layouts dynamically
- **Styling System** (`src/styles/`): SCSS source files organized by component and theme; compiles to CSS
- **Scripts & Helpers** (`src/scripts/`, `src/shared/`): Board rendering logic, scrolling behavior, Handlebars custom helpers, data utilities
- **Demo Application** (`demo/`): Standalone HTML page (built from sources) for testing layouts and themes without Home Assistant
- **Build Output** (`dist/`): Production card file and assets ready for HACS distribution

### Data Flow

1. Home Assistant feeds `trainServices` data array to the card
2. Card normalizes data (handles both `trainServices` and `trains` attributes for compatibility)
3. Handlebars helpers process data (formatting times, determining platform display rules)
4. Template renders dynamic HTML with styles
5. JavaScript initializes interactivity (scrolling, train highlight updates)

### Build Pipeline

The build system has **sequential dependencies** that must be respected:

```
Copy Handlebars → Build SCSS → Build Lovelace
```

- **Copy Handlebars**: Moves the precompiled Handlebars runtime to the scripts folder (required before bundling)
- **Build SCSS**: Compiles all `.scss` files to `.css` using Sass; outputs to the same directory
- **Build Lovelace**: Uses esbuild with a custom Handlebars plugin to precompile `.hbs` templates, bundle scripts, and generate the final card file and demo

Run `npm run build` to execute the full pipeline, or individual scripts for targeted builds.

## Code Structure

```
src/
├── lovelace/                      # Card component (ES module, Home Assistant entry point)
├── templates/
│   ├── board.hbs                  # Main board wrapper layout
│   ├── layout.hbs                 # Layout-specific rendering logic
│   └── theme.hbs                  # Theme-specific styling markup
├── styles/
│   ├── site.scss / site.css        # Main stylesheet
│   ├── fonts.scss / fonts.css      # Font declarations and loading
│   └── components/
│       ├── _boards.scss           # Overall board styling
│       └── boards/                # Layout-specific styles
│           ├── _base.scss
│           ├── _overhead-platform.scss
│           ├── _single-train.scss
│           └── _table.scss
│   └── themes/                    # Theme variants
│       ├── _classic.scss
│       ├── _london2025.scss
│       └── london2025/            # London 2025 layout overrides
├── scripts/
│   ├── data.js                    # Data normalization and utilities
│   ├── next-train.js              # Train rendering and update logic
│   ├── scrolling.js               # Board scrolling behavior
│   ├── handlebars-helpers.js      # Custom Handlebars helpers (formatting, logic)
│   └── handlebars.min.js          # Runtime (copied from node_modules during build)
├── shared/
│   └── register-handlebars-helpers.js  # Helper registration (called once at card init)
└── fonts/                         # Font files (woff2, etc.) copied to dist/

demo/                              # Demo app output (generated)
dist/                              # Production card output (generated)
hacs.json                          # HACS manifest (copied to dist/)
```

## Technical Constraints & Requirements

### Must: Shadow DOM & Home Assistant Integration
The card operates within Home Assistant's Lovelace shadow DOM context. Styles must use `:host` and `ha-card` selectors to isolate and style the custom element properly. The card must accept a configuration schema compatible with Home Assistant's entity/service structure.

### Must: Semantic Content & Accessibility
Layouts use custom HTML elements (`<trains>`, `<train>`, `<stations>`, `<station>`) as the standard structural pattern. Styling and interactivity are applied via CSS classes and semantic attributes. Text content must be clear and properly separated (times, destination names, platforms). Use ARIA attributes (role, aria-label) and schema markup (itemscope/itemtype) to ensure content remains accessible to screen readers, assistive technology, and semantic API consumers. Custom elements must preserve accessible naming and semantic relationships.

### Must: Documentation
Handlebars templates and custom helpers must be understandable and maintainable. Comments should clarify the purpose of template conditionals and why certain data transformations are necessary (e.g., normalizing `trainServices` vs `trains`).

### Should: Font Path Flexibility
Font URLs are injected dynamically because the demo uses a different path structure than the production card. The system detects the execution context and adjusts `DEMO_FONT_PATH` vs `DEFAULT_FONT_PATH` accordingly. Preserve this pattern when modifying font loading.

### Should: Lazy Initialization
Helpers and fonts are registered/loaded only once to avoid duplication penalties. Preserve the `helpersRegistered` flag and similar guard patterns.

### Should: Theme & Layout Isolation
Themes and layouts are applied via CSS class combinations (e.g., `.board.theme-classic`, `.board.layout-table`). Avoid inline styles; keep all styling in SCSS.

## When Making Changes

### Adding or Modifying Styles
- Edit `.scss` source files only; never edit `.css` files directly
- Run `npm run build:css` to compile
- SCSS is organized by breakpoints; component styles live in `components/boards/`
- Theme overrides live in `themes/`; use nesting to avoid duplication

### Adding or Modifying Templates
- Edit `.hbs` files in `src/templates/`
- Templates are precompiled during the build; no manual compilation needed
- Use Handlebars syntax for conditionals (`{{#if}}`, `{{#each}}`) and helpers (`{{formatTime}}`, etc.)
- Use custom HTML elements as structural containers (`<trains>`, `<train>`, `<stations>`, `<station>`) with ARIA attributes for accessibility
- Ensure all dynamic text (times, station names, platform numbers) is properly rendered and accessible

### Adding Handlebars Helpers
- Define the helper function in `src/shared/register-handlebars-helpers.js`
- Register it in the `registerHandlebarsHelpers()` function in the same file
- Document the helper's purpose, parameters, and return value using JSDoc comments

### Updating Data Handling or Normalization
- Central normalization logic is in `src/lovelace/ukrailboards-card.js` (see `normalizeTrainServices()`)
- Additional utilities are in `src/scripts/data.js`
- When handling incoming data, account for both `trainServices` (standard) and `trains` (legacy/alternative) attributes

### Testing Changes
- Changes to layouts and styles should be validated in `demo/index.htm` first using snapshot data in `demo/demo.js`
- The demo page allows switching between themes and layouts without requiring a running Home Assistant instance
- After demo validation, test the card in Home Assistant with actual station data to confirm real-world behavior (scrolling, updates, font loading)

## Common Patterns to Preserve

- **Lazy helper registration**: Check `helpersRegistered` flag before registering Handlebars helpers
- **Font style injection**: Dynamically insert font CSS into the page head with a unique ID to avoid duplicate registration
- **Data normalization**: Always handle both `trainServices` and `trains` attribute names for backward compatibility
- **Shadow DOM scoping**: Use `:host` in CSS and avoid global selectors that could interfere with other Home Assistant cards
- **Custom element semantics**: Use custom HTML elements (`<trains>`, `<train>`, `<stations>`, `<station>`) with ARIA attributes and data attributes to preserve accessibility and semantic relationships
- **Template-based rendering**: Use Handlebars for all dynamic content generation; avoid string concatenation

## Handlebars & Precompilation Notes

- Handlebars templates (`.hbs` files) are precompiled into JavaScript functions by the build process
- The precompiled templates are then imported as ES modules and called with a data context object
- Helpers are applied at render time, so any custom helper must be registered before template rendering occurs
- The esbuild plugin `handlebarsPrecompilePlugin` (in `build-lovelace.mjs`) intercepts `.hbs` imports and handles compilation

## When to Rebuild

- After installing new dependencies: run `npm run build`
- After modifying `.scss`: run `npm run build:css`
- After modifying templates (`.hbs`) or scripts: run `npm run build:js`
- After modifying both styles and templates: run `npm run build` for the full pipeline
- Development workflow: use `npm run build:demo` to test the demo app quickly

## Maintaining These Instructions

These instructions should be kept accurate and current as the project evolves. When making changes that affect the guidance here, update this file proactively:

- **Folder structure changes**: Update the "Code Structure" section and file paths in examples
- **Build pipeline changes**: Update the "Build Pipeline" section and "When to Rebuild" guidance
- **New major features or patterns**: Add relevant sections or expand existing guidance
- **Constraints or requirements shift**: Revise the "Technical Constraints & Requirements" section
- **New development workflows**: Update "Testing Changes" and related sections

This file is the authoritative source for understanding how to work effectively in this codebase. Keeping it current ensures that you (and future collaborators) have reliable guidance for making changes.
