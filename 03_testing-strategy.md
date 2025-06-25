# Testing Strategy

## 1. Introduction

This document outlines the planned testing approach for the "Sort By" functionality on the High Life Café product listing page. It describes which testing practices will be applied across the lifecycle of delivery—from initial requirements through to production validation—and how they contribute to team confidence, risk mitigation, and sustainable coverage.

We take a layered approach to quality, introducing different testing types at appropriate stages, combining proactive collaboration with repeatable automation.

---

## 2. Testing Phases and Processes

### Phase 1: Requirement Analysis & Acceptance Criteria Refinement

- Collaborate early with the Product Owner and team to clarify vague or ambiguous scenarios.
- Surface unconsidered edge cases through question-driven refinement.
- Record all signed-off and provisional acceptance criteria in a shared Markdown file.

This phase ensures we build the right thing before building it right.

---

### Phase 2: Unit Testing (Developer-level)

- Developers will validate local logic for sort selection, dropdown toggling, and parameter parsing using unit tests.
- Sorting utility functions and component state transitions will be isolated and tested independently of the DOM.
- Component-level unit tests using a UI framework (e.g., React Testing Library) may be used to verify prop/state behavior.

---

### Phase 3: System and Functional Testing

- As the sorting UI is implemented, we will begin developing a maintainable end-to-end test suite using Playwright.
- These tests will validate:
  - Correct ordering of items by sort type and direction
  - UI behavior (e.g. dropdown state, toggle visibility)
  - Persistence across refresh/navigation
  - Filtering + sort interaction
  - URL-driven sort restoration

**Progressive test development:**  
We will stub selectors and draft test steps in advance, allowing us to validate markup expectations and ensure shared understanding between developers and testers—even before full UI rendering is available.

Once stable, the suite will run in CI via GitHub Actions against each pull request and deployment to prevent regressions.

---

### Phase 4: Exploratory Testing

- Risk-based exploratory testing will supplement automated coverage with human insight.
- Exploratory sessions will focus on:
  - Sorting with unexpected input combinations
  - Browser-specific rendering
  - Realistic user journeys (search + sort + pagination)
  - Unexpected user actions (e.g. rapid toggling, filter chains)

Findings will be documented and used to harden the suite and prompt functional refinement.

---

### Phase 5: Accessibility Testing

- Manual keyboard navigation will be tested on all sort controls.
- Screen reader output (e.g., NVDA and VoiceOver) will be observed to ensure dropdowns and toggles are correctly labeled and operable.
- ARIA attributes and visible focus indicators will be reviewed to align with WCAG 2.1 AA standards.

---

### Phase 6: Performance and Load Testing

- Test cases will simulate sorting on large datasets (100+ products) to validate client-side responsiveness.
- Tools such as Locust, K6, or asynchronous Python scripts (e.g. using `httpx` or `aiohttp`) will simulate concurrent sort interactions and validate backend/API handling.
- Cold start scenarios (e.g., clearing cache, applying sort immediately) will be profiled with Lighthouse to assess first-paint and interaction timing.

---

### Phase 7: Regression Testing

- The end-to-end suite will be run automatically in CI to protect the feature during product iterations.
- Tagged tests may allow selective execution on critical branches or build stages.

---

### Phase 8: Release Validation

- Manual and automated smoke tests will validate the sort behavior after deployment to staging or production.
- Sort order, UI feedback, and dropdown accessibility will be verified across supported browsers/devices.

---

## 3. Tooling Overview

| Tool                  | Purpose                                       |
|-----------------------|-----------------------------------------------|
| Playwright            | End-to-end UI test automation (TypeScript)    |
| GitHub Actions        | CI pipeline for test execution on push/PR     |
| Markdown              | Test documentation and acceptance criteria    |
| Lighthouse            | Performance auditing                          |
| Locust / K6 (optional)| Load and concurrency simulation tooling       |
| Python (httpx/aiohttp)| Lightweight async load testing (alternative)  |
| VoiceOver / NVDA      | Manual accessibility testing (screen readers) |

---

## 4. Traceability and Coverage

Each acceptance criterion—refined or provisional—has at least one corresponding test case. This traceability allows us to audit test completeness and demonstrate feature readiness at a glance.

### Summary Table

| Category                          | Total Criteria | Criteria with Coverage | % Coverage |
|----------------------------------|----------------|-------------------------|------------|
| Refined Acceptance Criteria      | 3              | 3                       | 100%       |
| Provisional Acceptance Criteria  | 4              | 4                       | 100%       |

For detailed mapping of tests to criteria and their automation status, see `02_test-cases.md`.

---

## 5. Risks and Mitigations

| Risk                                       | Mitigation Strategy                                  |
|--------------------------------------------|------------------------------------------------------|
| Vague sorting definitions (e.g. “Position”) | Clarified during refinement; mapped to internal ID   |
| Duplicate product values                    | Tested fallback sorting with repeated inputs         |
| Accessibility regressions                   | Manual screen reader and keyboard navigation tests   |
| Performance lag with large data sets        | Simulated via high-volume test data and profiling    |
| Unstable sort state on refresh/navigation   | Validated with exploratory flows and URL tracing     |

---

## 6. Practical Test Roadmap

| Sprint Phase       | Activity                                                                  |
|--------------------|---------------------------------------------------------------------------|
| Planning           | Confirm and refine acceptance criteria                                    |
| Early Development  | Write unit tests for sort logic; start building UI; stub E2E tests        |
| Mid Development    | Implement core sorting logic; begin functional test execution             |
| Late Development   | Complete Playwright automation; begin exploratory and accessibility testing|
| Pre-release        | Run performance/load tests; validate accessibility on staging             |
| Post-release       | Conduct smoke testing; verify URL-driven sorting; gather feedback         |

---

## 7. QA Readiness Checklist

Before merging or releasing the Sort By feature, confirm the following:

- [ ] All refined and provisional acceptance criteria are covered by test cases  
- [ ] Functional and URL-driven sort behavior verified (each field + toggle direction)  
- [ ] Filters, search, and pagination behavior verified with sorting applied  
- [ ] Dropdown and toggle pass keyboard navigation and screen reader audit  
- [ ] Sorting behavior under large datasets tested (performance/load)  
- [ ] E2E test suite runs cleanly in CI/CD pipeline  
- [ ] Manual smoke test executed in staging and/or production  

---

## 8. Summary

This strategy balances agility with accountability. Testing isn't left to the end or siloed off—it’s a collaborative effort embedded into refinement, development, and deployment. By pairing automation with thoughtful manual exploration, we can deliver a sort experience that is resilient to change, thoroughly monitored, and consistently validated.