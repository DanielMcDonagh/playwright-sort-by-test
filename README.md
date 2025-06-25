# Playwright Sort-By Test Suite

This repository contains focused end-to-end test suite that validates the **"Sort By"** functionality on [High Life Shop’s Speedbird Café](https://highlifeshop.com/speedbird-cafe). This project was built to demonstrate test design thinking, automation best practices, and CI/CD integration using Playwright + TypeScript.
It was created as part of a technical test, and currently only holds one automated test case as per the technical test.

As per the technical test, for each point a markdown file has been created to document the outcomes. Click any link below to jump to the full spec, strategy, or design notes.

## Documentation

- [01 – Acceptance Criteria](01_acceptance-criteria.md)  
- [02 – Test Cases](02_test-cases.md)  
- [03 – Testing Strategy](03_testing-strategy.md)  
- [03b – Testing Strategy Summary](03b_testing-strategy-summary.md)  
- [04 – Automation Setup Guide](04_automation-setup-guide.md)  
- [05 – Framework Design](05_framework-design.md)

## Project Structure

```
playwright-sort-by-test/
├── pages/                                      # Locator-only Page Object Models
│   └── CafePage.ts                             
├── tests/                                      # Test scripts and utilities for the scripts
│   ├── txc2-sort-with-pagination.spec.ts       
│   └── utils.ts                                # Highlight helper
├── tests-archive/                              # Archive for old tests
│   └── locators-check.spec.ts                  
├── .github/workflows/                          # GitHub Actions CI
|   └── playwright.yml                          
├── package-lock.json                           # Dependency tree
├── playwright.config.ts                        # Test runner configuration
├── 01_acceptance-criteria.md                   # Highlights the Acceptance Criteria which this project is built for
├── 02_test-cases.md                            # A copy of the test cases to be used against this project
├── 03_testing-strategy.md                      # A copy of the Test Strategy for this project
├── 03b_testing-strategy-summary.md             # A summarised version of the Test Strategy for stakeholders
├── 04_automation-setup-guide.md                # The documentation for the automation suite
├── 05_framework-design.md                      # A summary of how to scale and organise the test framework, along with some best practices
└── README.md                                   # You are here
```

## What's Covered

- Sorting by name in **descending** order using Playwright E2E tests  
- Custom **Page Object Model** for better scalability and maintainability  
- Robust test assertions using array comparison  
- Functional, isolated automation - one spec, one job  
- **CI-integrated** via GitHub Actions (`.yml` file included)  
- Annotated Markdown documentation explaining:
  - Acceptance criteria
  - Testing approach
  - Automation reasoning and setup

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/daniel-mcdonagh/playwright-sort-by-test.git
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

## Tech Stack

- [Playwright](https://playwright.dev) + [TypeScript](https://www.typescriptlang.org/)  
- GitHub Actions for Continuous Integration  
- Page Object Model for separation of concerns  
- Markdown for documentation + review visibility

## Why This Project Exists

This suite simulates a real QA Engineer challenge - demonstrating not just technical execution but the thought process behind test coverage, documentation clarity, and automation that aligns with business expectations.

You can follow the included `.md` files to see **how the feature was decomposed and tested**, including setup steps, scaling philosophy, and test case structure.

## Next Steps / Ideas

- Add further automation tests based on test cases documented in 02_test-cases.md
- Add sorting coverage for **Price**, **New Arrivals**, etc.  
- Introduce filtering + sorting combination tests  
- Integrate visual regression checks for layout shifts  
- Extend test tagging, retries, and parallel execution config