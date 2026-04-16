# Implementation Plan: Bundle Card + Integration Distribution

**Branch**: `001-create-feature-branch` | **Date**: 2026-04-16 | **Spec**: `specs/001-bundle-card-integration/spec.md`
**Input**: Feature specification from `specs/001-bundle-card-integration/spec.md`

## Summary

Ship a single HACS-distributed package that contains both the UK Rail Boards Lovelace card and a bundled National Rail integration variant with a distinct integration ID. Preserve side-by-side operation with the legacy integration, default new card setups to bundled data, keep existing card data-source selections unchanged, and enforce one shared Home Assistant minimum-version policy across both components.

## Technical Context

**Language/Version**: JavaScript (ESM, Node.js >=22 build tooling) and Python (Home Assistant custom integration runtime aligned to shared HA minimum version)  
**Primary Dependencies**: Home Assistant custom integration APIs, HACS packaging conventions, esbuild, Handlebars runtime/precompile, Sass build, existing card template/style pipeline  
**Storage**: N/A (state managed by Home Assistant integration entities and card configuration)  
**Testing**: Manual integration verification in Home Assistant, demo build validation, package-root inspection via `npm run package:inspect`, targeted side-by-side behavior checks  
**Target Platform**: Home Assistant (core version floor shared by integration and card), Lovelace dashboard clients  
**Project Type**: Home Assistant bundled distribution (custom integration + Lovelace frontend card in one release package)  
**Performance Goals**: Maintain current card render responsiveness and refresh behavior; no additional user-visible lag after bundling  
**Constraints**: Source-first editing only; maintain `trainServices` and `trains` compatibility; preserve semantic markup/ARIA behavior; bundled integration ID must not collide with legacy ID; existing card configs must not be auto-repointed  
**Scale/Scope**: One repository, one coordinated release artifact, one bundled integration variant, existing board layouts/themes remain in scope

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Gate Review (Pre-Phase 0): PASS

- Source-first assets only: PASS. Planned edits are source files, packaging metadata, and documentation; no manual generated-output edits.
- Compatibility preserved: PASS. Plan keeps explicit normalization support for both `trainServices` and `trains`.
- Accessibility preserved: PASS. No semantic-template removals; accessibility checks included in quickstart validation.
- Isolation preserved: PASS. No global style leakage planned; existing Shadow DOM isolation remains required.
- Validation plan defined: PASS. Build chain and demo/package verification steps are defined in quickstart and research outputs.

### Post-Design Review (Post-Phase 1): PASS

- Research, data model, contracts, and quickstart all retain constitution obligations.
- No justified violations required.

## Project Structure

### Documentation (this feature)

```text
specs/001-bundle-card-integration/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── bundled-distribution-contract.md
│   └── runtime-selection-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── demo/
├── fonts/
├── images/
├── lovelace/
├── scripts/
├── shared/
├── styles/
└── templates/

dist/
demo/

build-lovelace.mjs
hacs.json
README.md

# Planned addition for this feature
custom_components/
└── <bundled_integration_domain>/
```

**Structure Decision**: Keep a single-project repository structure and add Home Assistant integration source under `custom_components/` while preserving current card source/build locations under `src/`.

## Complexity Tracking

No constitution violations identified; complexity tracking table not required.
