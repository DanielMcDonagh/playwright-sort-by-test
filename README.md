# Playwright Sort-By Test Suite

A focused end-to-end test suite that validates the **"Sort By"** functionality on [High Life Shop’s Speedbird Café](https://highlifeshop.com/speedbird-cafe). This project was built to demonstrate test design thinking, automation best practices, and CI/CD integration using Playwright + TypeScript.

---

## Project Structure

```
playwright-sort-by-test/
├── pages/                         # Page Object abstraction for product listing
│   └── ProductListPage.ts
├── tests/                         # End-to-end tests for sorting feature
│   └── sort-by-name.spec.ts
├── .github/workflows/             # GitHub Actions CI pipeline
│   └── playwright-ci.yml
├── playwright.config.ts           # Test runner config
├── 01_acceptance-criteria.md      # Refined, testable acceptance criteria
├── 02_test-cases.md               # Manual and exploratory scenarios
├── 03_testing-strategy.md         # Full lifecycle QA strategy
├── 04_automation-setup-guide.md   # How to run and extend the automation suite
├── 05_framework-design.md         # Future-facing design principles
└── README.md                      # You're here
```

---

## What's Covered

- Sorting by name in **descending** order using Playwright E2E tests  
- Custom **Page Object Model** for better scalability and maintainability  
- Robust test assertions using array comparison  
- Functional, isolated automation — one spec, one job  
- **CI-integrated** via GitHub Actions (`.yml` file included)  
- Annotated Markdown documentation explaining:
  - Acceptance criteria
  - Testing approach
  - Automation reasoning and setup

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/playwright-sort-by-test.git
cd playwright-sort-by-test
npm ci
npx playwright install --with-deps
```

Run the test locally:

```bash
npx playwright test
```

Optional: open the HTML report after test run

```bash
npx playwright show-report
```

---

## Tech Stack

- [Playwright](https://playwright.dev) + [TypeScript](https://www.typescriptlang.org/)  
- GitHub Actions for Continuous Integration  
- Page Object Model for separation of concerns  
- Markdown for documentation + review visibility

---

## Why This Project Exists

This suite simulates a real QA Engineer challenge — demonstrating not just technical execution but the thought process behind test coverage, documentation clarity, and automation that aligns with business expectations.

You can follow the included `.md` files to see **how the feature was decomposed and tested**, including setup steps, scaling philosophy, and test case structure.

---

## Next Steps / Ideas

- Add sorting coverage for **Price**, **New Arrivals**, etc.  
- Introduce filtering + sorting combination tests  
- Integrate visual regression checks for layout shifts  
- Extend test tagging, retries, and parallel execution config
