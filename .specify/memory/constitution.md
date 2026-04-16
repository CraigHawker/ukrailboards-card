<!--
Sync Impact Report
- Version change: N/A -> 1.0.0
- Modified principles:
	- N/A -> I. Source-First Assets and Build Order
	- N/A -> II. Backward-Compatible Rail Data Handling
	- N/A -> III. Accessibility and Semantic Markup (Non-Negotiable)
	- N/A -> IV. Shadow DOM and Presentation Isolation
	- N/A -> V. Demo-First Verification and Release Integrity
- Added sections:
	- Engineering Constraints
	- Development Workflow and Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory absent in this repository)
- Runtime guidance updates:
	- ✅ updated: README.md
- Follow-up TODOs:
	- None
-->

# UK Rail Boards Constitution

## Core Principles

### I. Source-First Assets and Build Order
All maintainers MUST edit source files only: `.scss` in `src/styles/`, `.hbs` in
`src/templates/`, and source JavaScript in `src/`. Generated artifacts in `demo/`, `dist/`, and
compiled CSS outputs MUST be produced via the documented build pipeline and MUST NOT be hand-edited.
The build sequence MUST preserve dependency order: Copy Handlebars -> Build SCSS -> Build Lovelace.
Rationale: This prevents drift between authored and distributable assets.

### II. Backward-Compatible Rail Data Handling
Rendering logic MUST accept both `trainServices` and legacy `trains` attributes. Any change to
normalization or mapping MUST preserve compatibility unless a documented breaking change is ratified.
Compatibility handling MUST be explicit and tested in demo snapshots or equivalent validation data.
Rationale: Live Home Assistant integrations vary in payload shape across versions and forks.

### III. Accessibility and Semantic Markup (Non-Negotiable)
Templates MUST preserve semantic custom structures (`trains`, `train`, `stations`, `station`) and
MUST include meaningful ARIA attributes for dynamic content. Dynamic text for times, destinations,
platforms, and statuses MUST remain perceivable to assistive technologies. Changes that reduce
accessibility are prohibited unless replaced with equal or better accessible behavior in the same change.
Rationale: Station board information is critical status data and must remain accessible.

### IV. Shadow DOM and Presentation Isolation
Styling and behavior MUST remain isolated to the card context. CSS MUST prioritize `:host`, `ha-card`,
layout classes, and theme classes; global selectors and inline style injection for visual rules are
disallowed except for documented one-time font-path injection. Themes and layouts MUST remain modular,
using class composition instead of branching inline styles.
Rationale: Home Assistant environments contain many cards and style collisions are costly.

### V. Demo-First Verification and Release Integrity
UI and rendering changes MUST be validated in the demo build before release packaging. Contributors MUST
run the relevant build command(s) for touched asset types and verify that generated outputs are consistent
with source updates. Release packaging MUST include `hacs.json`, the card bundle, and required fonts in
the distribution root.
Rationale: The demo is the fastest deterministic validation surface before Home Assistant runtime testing.

## Engineering Constraints

- Runtime behavior MUST continue to support Home Assistant Lovelace Shadow DOM usage.
- Handlebars helpers SHOULD be lazily registered once and guarded against duplicate registration.
- Font path behavior MUST preserve demo vs production path flexibility.
- Comments SHOULD explain non-obvious compatibility behavior and render pipeline decisions.
- Any introduced breaking change MUST include migration notes in repository documentation.

## Development Workflow and Quality Gates

- Specifications, plans, and tasks MUST include an explicit constitution check before implementation.
- Feature specs MUST include measurable outcomes and accessibility considerations where UI output changes.
- Task breakdowns MUST include work for compatibility validation, accessibility validation, and build
	verification when applicable.
- Before merging, contributors MUST verify:
	- Source edits only for authored assets (no manual edits to generated outputs).
	- Build commands for touched surfaces complete successfully.
	- Demo behavior matches intended layout/theme semantics.

## Governance

This constitution is authoritative for repository development practices and supersedes conflicting local
workflow notes. Amendments require:

1. A documented rationale and impacted artifact list.
2. Version update using semantic governance versioning:
	 - MAJOR for incompatible principle removals or redefinitions.
	 - MINOR for new principles/sections or materially expanded obligations.
	 - PATCH for clarifications that do not alter obligations.
3. Synchronization updates across impacted templates and guidance files in the same change.

Compliance review is required in planning and review phases for all substantive feature work.

**Version**: 1.0.0 | **Ratified**: 2026-04-16 | **Last Amended**: 2026-04-16
