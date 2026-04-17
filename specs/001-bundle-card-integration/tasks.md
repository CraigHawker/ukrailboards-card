# Tasks: Bundle Card + Integration Distribution

**Input**: Design documents from `/specs/001-bundle-card-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Explicit test tasks are omitted because the specification did not request a TDD-first or test-authoring workflow. Validation tasks are included in each story phase.

**Organization**: Tasks are grouped by user story so each story is independently implementable and verifiable.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare repository structure and packaging surfaces for bundled distribution.

- [X] T001 Create bundled integration folder scaffold in `custom_components/ukrailboards_nationalrail/__init__.py`
- [X] T002 [P] Add bundled integration package metadata baseline in custom_components/ukrailboards_nationalrail/manifest.json
- [X] T003 [P] Define bundled integration domain constants in custom_components/ukrailboards_nationalrail/const.py
- [X] T004 Update release packaging copy flow to include custom_components/ukrailboards_nationalrail in src/scripts/package-release.mjs
- [X] T005 Update release bundle assembly to include integration files in build-lovelace.mjs
- [X] T006 Document bundled package structure and source-first edit rules in README.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish cross-story rules that every user story depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T007 Set shared Home Assistant minimum-version policy in custom_components/ukrailboards_nationalrail/manifest.json
- [X] T008 Align shared minimum-version policy references in hacs.json
- [X] T009 [P] Add shared minimum-version and release-coordination notes in README.md
- [X] T010 Implement compatibility normalization entry point for `trainServices` and `trains` payloads in src/scripts/data.js
- [X] T011 [P] Add runtime data-source policy helper for bundled-default behavior in src/scripts/next-train.js
- [X] T012 [P] Add runtime data-source preservation helper for existing cards in src/lovelace/ukrailboards-card.js
- [X] T013 Add package integrity validation script for bundled artifacts in src/scripts/validate-bundle-release.mjs

**Checkpoint**: Foundation complete. User story work can now proceed.

---

## Phase 3: User Story 1 - Single-Step Install (Priority: P1) 🎯 MVP

**Goal**: One HACS install provides both integration and card.

**Independent Test**: Install one HACS item in a clean Home Assistant environment and verify both integration and card are discoverable.

### Implementation for User Story 1

- [X] T014 [US1] Import bundled integration runtime modules in custom_components/ukrailboards_nationalrail/ (coordinator.py, sensor.py, api.py)
- [X] T015 [US1] Implement integration setup lifecycle for bundled domain in `custom_components/ukrailboards_nationalrail/__init__.py`
- [X] T016 [US1] Implement bundled integration entity registration in custom_components/ukrailboards_nationalrail/sensor.py
- [X] T017 [P] [US1] Add bundled integration translation strings and diagnostics text in custom_components/ukrailboards_nationalrail/translations/en.json
- [X] T018 [US1] Ensure release package includes card artifact plus integration source in src/scripts/package-release.mjs
- [X] T019 [US1] Update card installation guidance for single-item HACS flow in README.md
- [X] T020 [US1] Validate clean-install behavior and record outcome in specs/001-bundle-card-integration/quickstart.md

**Checkpoint**: User Story 1 is independently functional and demoable.

---

## Phase 4: User Story 2 - Unified Updates (Priority: P2)

**Goal**: Integration and card update together as one coordinated release.

**Independent Test**: Upgrade from one bundled release to another and verify both components update in one action with no manual version alignment.

### Implementation for User Story 2

- [X] T021 [US2] Add coordinated release metadata synchronization logic in src/scripts/package-release.mjs
- [X] T022 [US2] Enforce shared release-version propagation for bundled integration in custom_components/ukrailboards_nationalrail/manifest.json
- [X] T023 [P] [US2] Add release validation checks for shared version and required artifacts in src/scripts/validate-bundle-release.mjs
- [X] T024 [P] [US2] Update release workflow to run bundled validation checks in .github/workflows/release.yml
- [X] T025 [US2] Update CI validation workflow for bundle integrity checks in .github/workflows/validate.yml
- [X] T026 [US2] Document coordinated update behavior and failure messaging in README.md
- [X] T027 [US2] Validate bundled update path and record outcome in specs/001-bundle-card-integration/quickstart.md

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Side-by-Side Operation with Legacy Integration (Priority: P3)

**Goal**: Bundled integration can coexist with the original integration while defaulting new cards to bundled data and preserving existing card selections.

**Independent Test**: Install bundled package alongside legacy integration, confirm no ID collision, verify new-card default and existing-card preservation behaviors.

### Implementation for User Story 3

- [X] T028 [US3] Enforce distinct bundled domain and integration ID declarations in custom_components/ukrailboards_nationalrail/manifest.json
- [X] T029 [P] [US3] Add coexistence and collision-avoidance guardrails in `custom_components/ukrailboards_nationalrail/__init__.py`
- [X] T030 [US3] Default new card configurations to bundled data source in src/lovelace/ukrailboards-card.js
- [X] T031 [US3] Preserve existing card data-source selections on install/update in src/lovelace/ukrailboards-card.js
- [X] T032 [P] [US3] Add user-facing guidance for ambiguous dual-source setups in src/templates/board.hbs
- [X] T033 [US3] Document side-by-side behavior and non-migration stance in README.md
- [X] T034 [US3] Validate side-by-side runtime behavior and record outcome in specs/001-bundle-card-integration/quickstart.md

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, accessibility, and release readiness checks across all stories.

- [X] T035 [P] Update plan-to-implementation trace notes in specs/001-bundle-card-integration/plan.md
- [X] T036 Verify compatibility behavior for both `trainServices` and `trains` payloads in src/scripts/data.js
- [X] T037 Verify accessibility and semantic output expectations for updated board messaging in src/templates/board.hbs
- [X] T038 Verify Shadow DOM style isolation for new UI indicators in src/styles/components/_boards.scss
- [X] T039 Run full build and package inspection workflow documentation update in specs/001-bundle-card-integration/quickstart.md
- [X] T040 Run bundled release validation and capture final readiness summary in specs/001-bundle-card-integration/research.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): No dependencies, starts immediately.
- Phase 2 (Foundational): Depends on Phase 1 completion and blocks all user stories.
- Phase 3 (US1): Depends on Phase 2 completion.
- Phase 4 (US2): Depends on Phase 2 completion and uses US1 packaging outputs.
- Phase 5 (US3): Depends on Phase 2 completion and bundled integration identity from US1.
- Phase 6 (Polish): Depends on completion of all targeted user stories.

### User Story Dependencies

- US1 (P1): Independent after foundational phase; defines MVP.
- US2 (P2): Independent after foundational phase but references bundled packaging established in US1.
- US3 (P3): Independent after foundational phase but requires bundled integration identity artifacts from US1.

### Within Each User Story

- Implement domain/model contracts first.
- Implement runtime/service behavior next.
- Implement packaging/UI wiring next.
- Run story-specific validation and record outcomes before moving on.

## Parallel Opportunities

- Setup: T002 and T003 can run in parallel after T001; T004 and T005 can run in parallel once scaffolding exists.
- Foundational: T009, T011, and T012 can run in parallel after T007 and T008.
- US1: T017 can run in parallel with T015/T016.
- US2: T023 and T024 can run in parallel after T021/T022.
- US3: T029 and T032 can run in parallel with T030/T031 sequencing.
- Polish: T035 can run in parallel with T036-T038.

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] Implement integration setup lifecycle in custom_components/ukrailboards_nationalrail/__init__.py"
Task: "T017 [P] [US1] Add translations in custom_components/ukrailboards_nationalrail/translations/en.json"
```

## Parallel Example: User Story 2

```bash
Task: "T023 [P] [US2] Add release validation checks in src/scripts/validate-bundle-release.mjs"
Task: "T024 [P] [US2] Update release workflow in .github/workflows/release.yml"
```

## Parallel Example: User Story 3

```bash
Task: "T029 [P] [US3] Add coexistence guardrails in custom_components/ukrailboards_nationalrail/__init__.py"
Task: "T032 [P] [US3] Add dual-source guidance in src/templates/board.hbs"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational blockers.
3. Complete Phase 3 (US1).
4. Validate single-step install in Home Assistant.
5. Demo/release MVP.

### Incremental Delivery

1. Deliver US1 for immediate single-install value.
2. Deliver US2 for coordinated updates and release integrity.
3. Deliver US3 for side-by-side behavior and data-source policy guarantees.
4. Finish cross-cutting polish and release readiness checks.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. After Phase 2:
   - Engineer A: US1 implementation.
   - Engineer B: US2 release pipeline tasks.
   - Engineer C: US3 coexistence and card policy tasks.
3. Consolidate in Phase 6 for final validation.
