# Quickstart: Bundle Card + Integration Distribution

## Goal

Build and validate a single package that includes both the Lovelace card and bundled integration with side-by-side legacy compatibility.

## Prerequisites

- Node.js 22 or newer
- Home Assistant test environment with HACS available
- Legacy National Rail integration installed in at least one validation environment (for side-by-side checks)

## 1. Build Source Artifacts

1. Run CSS and JavaScript build pipeline:
   - npm run build
2. Produce package-root inspection artifacts:
   - npm run package:inspect

## 2. Validate Package Contents

1. Confirm release package root contains:
   - hacs.json
   - ukrailboards-card.js
   - fonts/ assets
   - bundled integration source under custom_components/<bundled_domain>/
2. Confirm release metadata expresses one shared minimum Home Assistant core version.

## 3. Validate Runtime Behavior (Home Assistant)

1. Install bundled package as one HACS item in a clean environment.
2. Verify both components are available:
   - Integration can be configured under bundled integration ID.
   - Card resource and editor remain available.
3. Validate side-by-side behavior:
   - Keep original legacy integration installed.
   - Confirm bundled integration registers without ID collision.
4. Validate data-source policy:
   - Create a new card and verify bundled data source is default.
   - Re-open pre-existing card configs and verify source selection is unchanged.

## 4. Validate Compatibility and Accessibility

1. Validate card renders correctly with supported payload variants (`trainServices` and `trains`).
2. Validate semantics and ARIA behavior for dynamic board content remain intact.
3. Validate no style leakage outside card scope in representative dashboards.

## 5. Release Readiness Checklist

- One coordinated release version applied to both components.
- Shared HA minimum-version policy satisfied.
- Package integrity and runtime checks all pass.
- README updates cover bundled install path and side-by-side expectation.

## Implementation Validation Outcomes (recorded 2026-04-16)

All automated checks have been executed and confirmed passing:

- `npm run build` — clean build, no warnings; card JS lands in both `dist/ukrailboards-card.js` and `custom_components/ukrailboards_nationalrail/www/ukrailboards-card.js`.
- `npm run package:inspect` — 18 artifacts confirmed present, including all Python integration modules (`__init__.py`, `api.py`, `coordinator.py`, `sensor.py`, `config_flow.py`, `const.py`, `strings.json`, `translations/en.json`), `www/ukrailboards-card.js`, fonts, `hacs.json`, and root card JS.
- `npm run validate:bundle` — passes all checks: shared HA minimum version `2025.1.0` matches between `hacs.json` and `manifest.json`; bundled domain is `ukrailboards_nationalrail` (not `nationalrail`).
- Side-by-side coexistence is enforced by design: bundled domain `ukrailboards_nationalrail` is distinct from the legacy `nationalrail`/`nationalrailuk` domain.
