# Feature Specification: Bundle Card + Integration Distribution

**Feature Branch**: `001-create-feature-branch`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "The application currently defines a lovelace card which is deployed separately to the required integration which provides the underlying data. I have a fork of the integration with the needed changes (CraigHawker/homeassistant_nationalrail branch: with-details), but my PR is unlikely to be merged to the main project. We need to update this application so that it includes both the integration and the card in one (user installs one HCAS item and gets both)."

## Clarifications

### Session 2026-04-16

- Q: Should migration prioritize hard switch, coexistence, or manual-only behavior? -> A: Bundled package must use a different integration ID so it can run side-by-side with the original integration; migration is out of scope.
- Q: When both integrations are present, what should be the default data-source behavior for card configuration? -> A: New card setups default to bundled integration data; existing card configurations keep their current data source until explicitly changed by the user.
- Q: How should Home Assistant core compatibility be defined for the bundled package? -> A: Define one minimum supported Home Assistant core version that applies to both bundled integration and card components.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Single-Step Install (Priority: P1)

As a Home Assistant user, I can install one HACS item and receive both the National Rail integration and the Lovelace card so I do not need to find, install, and coordinate two separate components.

**Why this priority**: The core value is eliminating split installation and setup friction. Without this, the feature does not solve the stated problem.

**Independent Test**: Can be fully tested by installing the single HACS item in a clean Home Assistant environment and confirming both components are present and available for use.

**Acceptance Scenarios**:

1. **Given** a user has HACS available, **When** they install this project from HACS, **Then** both the integration and card assets are installed from one package.
2. **Given** installation is complete, **When** the user opens integration management and Lovelace resources, **Then** both the integration and card are discoverable without a second package install.

---

### User Story 2 - Unified Updates (Priority: P2)

As a Home Assistant user, I receive coordinated updates for the integration and the card from one source so the displayed board behavior remains compatible with the data provider.

**Why this priority**: Combined installation must remain reliable over time; update mismatch between card and integration is a key current risk.

**Independent Test**: Can be tested by upgrading from one released version to another and verifying both components update together and continue to function.

**Acceptance Scenarios**:

1. **Given** a user has an earlier bundled release installed, **When** they apply an update from the same HACS item, **Then** both integration and card versions are updated as one release.
2. **Given** a bundled update is installed, **When** the user loads the board card with live data, **Then** no manual version alignment is required.

---

### User Story 3 - Side-by-Side Operation with Legacy Integration (Priority: P3)

As a Home Assistant user, I can keep the original National Rail integration installed while using the bundled package because the bundled integration has a distinct ID and does not collide with the legacy one.

**Why this priority**: It removes upgrade risk by avoiding forced migration and allows gradual adoption without breaking existing setups.

**Independent Test**: Can be tested by running a system with the original integration already installed, adding the bundled package, and confirming both integrations remain registered and functional.

**Acceptance Scenarios**:

1. **Given** the original National Rail integration is installed, **When** the user installs the bundled package, **Then** Home Assistant registers the bundled integration under a different ID and both can coexist.
2. **Given** both integrations exist side-by-side, **When** the user creates a new board card configuration, **Then** the default data source is the bundled integration.
3. **Given** both integrations exist side-by-side and a board card is already configured, **When** the bundled package is installed or updated, **Then** the existing card keeps its current data source unless the user explicitly changes it.

---

### Edge Cases

- A user installs the bundled package while an incompatible older standalone integration is still active.
- A user has both original and bundled integrations installed and selects the wrong data source in card configuration.
- One component in a release package is missing or corrupted during installation.
- The integration provides partial or delayed data and the card must still present usable fallback states.
- A user rolls back to a previous bundled version and expects card and integration behavior to remain aligned.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST distribute the National Rail integration and the Lovelace card as a single installable HACS item.
- **FR-002**: System MUST ensure one installation action makes both components available for setup and use.
- **FR-003**: System MUST publish releases so integration and card updates are delivered as one coordinated version.
- **FR-004**: System MUST use a bundled integration ID that is different from the original National Rail integration ID so both can operate side-by-side.
- **FR-005**: System MUST preserve existing board functionality for users whose configurations already work with supported integration data.
- **FR-006**: System MUST define compatibility expectations for existing inputs and integrations.
- **FR-007**: System MUST define accessibility expectations for user-visible output changes.
- **FR-008**: System MUST clearly communicate installation or upgrade failures when either component cannot be installed successfully.
- **FR-009**: System MUST avoid requiring users to manually align integration and card versions after install or update.
- **FR-010**: System MUST treat migration from the original integration to the bundled integration as out of scope for this feature.
- **FR-011**: System MUST default new card configurations to bundled integration data when both bundled and legacy integrations are present.
- **FR-012**: System MUST NOT automatically change data-source selection for existing card configurations during install or update.
- **FR-013**: System MUST define one minimum supported Home Assistant core version for the bundled package, and both bundled components MUST conform to that same version floor.

### Key Entities *(include if feature involves data)*

- **Bundled HACS Package**: The single user-facing distribution unit that contains both installable components and release metadata.
- **Integration Component**: The Home Assistant backend data-provider portion that supplies rail data and exposes it for UI use.
- **Bundled Integration ID**: The unique Home Assistant integration identifier used by the bundled package and guaranteed not to match the original integration ID.
- **Card Component**: The Lovelace board card assets and configuration behavior used to render rail board information.
- **Legacy Integration**: The original National Rail integration installation that may remain installed but is not the target of this feature.
- **Release Version**: The shared version identity representing one coordinated integration+card release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of new users can complete initial setup using one HACS item without installing an additional package.
- **SC-002**: 100% of official releases include both integration and card components under one coordinated version.
- **SC-003**: In side-by-side test environments, 100% of validation runs confirm the bundled and original integrations can both remain installed without ID collisions.
- **SC-004**: Support requests related to "card and integration version mismatch" decrease by at least 70% within one release cycle after launch.
- **SC-005**: In side-by-side regression tests, 100% of existing card configurations retain their pre-update data-source selection after bundled package install/update.
- **SC-006**: Release validation confirms 100% of bundled releases declare and satisfy a single shared Home Assistant minimum-version policy.

## Assumptions

- Users install and manage this project through HACS as the primary distribution channel.
- The maintained integration fork is the authoritative source for required data behavior until upstream parity exists.
- Existing board configurations that use currently supported entities are expected to remain valid after bundling.
- The original National Rail integration may remain installed, but users can choose to adopt only the bundled integration over time.
- A single Home Assistant minimum-version policy is acceptable for this feature, even if it excludes some older environments currently supported by only one standalone component.
- Packaging both components together is in scope; creating new data features beyond current fork capabilities is out of scope for this feature.
