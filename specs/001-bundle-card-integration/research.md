# Research: Bundle Card + Integration Distribution

## Decision 1: Distribution Topology

- Decision: Use one repository and one HACS-facing package root that ships both the Lovelace card artifact and the bundled Home Assistant integration source.
- Rationale: This directly satisfies single-install intent and keeps releases coordinated under one version.
- Alternatives considered:
  - Keep separate repositories and synchronize release tags: rejected due to ongoing mismatch risk.
  - Keep separate HACS items with documentation-only coordination: rejected because it does not meet one-item installation goal.

## Decision 2: Integration Identity Strategy

- Decision: Assign a distinct bundled integration ID/domain that is guaranteed not to collide with the original National Rail integration.
- Rationale: Enables side-by-side operation and avoids forced migration or runtime conflicts.
- Alternatives considered:
  - Reuse original integration ID: rejected because it creates collision/override behavior.
  - Auto-disable legacy integration: rejected because migration is explicitly out of scope.

## Decision 3: Data-Source Selection Policy

- Decision: Default new card setups to bundled integration data, but preserve existing card data-source selection unless explicitly changed by the user.
- Rationale: Balances forward adoption with zero-surprise behavior for existing dashboards.
- Alternatives considered:
  - Force bundled source for all cards: rejected as breaking behavior for existing setups.
  - Keep legacy default for all setups: rejected because it undercuts bundled package value.

## Decision 4: Compatibility Baseline

- Decision: Enforce one shared minimum Home Assistant core version floor for both bundled integration and card.
- Rationale: Prevents fragmented support matrix and keeps release validation deterministic.
- Alternatives considered:
  - Separate minimum versions for card vs integration: rejected due to support complexity.
  - No explicit version floor in planning: rejected due to ambiguity in acceptance criteria.

## Decision 5: Release Validation Surface

- Decision: Validate bundle integrity through source-first builds, package-root inspection, and side-by-side Home Assistant runtime checks.
- Rationale: Existing repo already has deterministic build and package inspection flow; extending it is low-risk.
- Alternatives considered:
  - Runtime-only validation without package inspection: rejected because packaging regressions could be missed.
  - Build-only validation without runtime checks: rejected because side-by-side behavior is a runtime concern.

## Decision 6: Compatibility Payload Handling

- Decision: Preserve support for both `trainServices` and legacy `trains` payloads in the bundled pathway.
- Rationale: Constitution requires backward-compatible rail data handling and current users may rely on legacy payload shapes.
- Alternatives considered:
  - Drop legacy payload handling: rejected as a breaking behavior change.
  - Add temporary compatibility shim outside existing pipeline: rejected in favor of explicit normalization where data is consumed.
