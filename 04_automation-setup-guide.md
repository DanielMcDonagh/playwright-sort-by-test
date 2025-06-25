
# Automation Setup Guide

This document walks through the setup and execution of the end-to-end test suite for validating **“Sort By”** functionality on [High Life Café](https://highlifeshop.com/cafe). It outlines the tools, structure, and reasoning behind key automation decisions to support readability, reuse, and reliable CI integration.

---

## Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)  
- [Git](https://git-scm.com/downloads)  
- Recommended Terminals: Git Bash (Windows) and Command Line, or any Unix-compatible shell  

---

## Project Setup

```bash
git clone https://github.com/daniel-mcdonagh/playwright-sort-by-test.git
cd playwright-sort-by-test
npm ci
npx playwright install --with-deps
```

This installs all dependencies from 'package-lock.json' and sets up browser drivers required by Playwright (Chromium, Firefox, WebKit).

---

## Folder Overview

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
├── 04_automation-setup-guide.md                # The documentation against this automation suite (This guide)
├── 05_framework-design.md                      # A summary of how to scale and organise the test framework, along with some best practices
└── README.md                                   # The README file
```

We follow a modular structure, separating **selectors** into their `pages/`, **test logic** into `tests/`, and environment/config into `.github/` & `playwright.config.ts`.

---

## How to Run the Test Suite

- Run all tests headless (default):
  ```bash
  npx playwright test
  ```
- Open the rich HTML report:
  ```bash
  npx playwright show-report
  ```

By default, tests run headless with a fixed viewport (1920x1080) as defined in `playwright.config.ts`.

---

## Understanding the Test

The primary test (`tests/tcx2-sort-with-pagination.spec.ts`) validates that sorting by **Product Name** in descending order persists across page 1 and page 2. It uses:

1. A **locator-only POM** (`pages/CafePage.ts`)  
2. **`test.step()`** blocks to name logical actions for clearer failures  
3. **Utility wrappers** (`tests/utils.ts`) to highlight elements, click, and assert. This is useful for further debugging within the report trace, video, or when displaying the viewport.

### Key files

- **`pages/CafePage.ts`**  
  Locator-only class exposing buttons, dropdown handles, product links, pagination links, etc.

- **`tests/tcx2-sort-with-pagination.spec.ts`**  
  Drives the flow:  
  - Navigate & dismisses cookies  
  - Validate default sort option and show limit  
  - Assert page-1 product order  
  - Switch pages, re-assert  
  - Apply “Z-A” sort, re-assert across pages  

- **`tests/utils.ts`**  
  Small helpers for:  
  - **`highlight()`** – briefly flashes a red outline around a Locator to help with visual recording of a test execution

---

## Key Config (`playwright.config.ts`)

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  timeout: 120000, // Set a global timeout of 120 seconds for each test
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use:
  {
    headless: true, // Run tests in headless mode
    viewport: {width: 1920, height: 1080}, // Set the viewport size for tests
    baseURL: process.env.BASE_URL || 'https://highlifeshop.com', // Base URL to use in actions like `await page.goto('/')`.
    screenshot: 'on', // Take a screenshot on every test
    video: 'on', // Record video only on test failure
    trace: 'on', // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
  },

  testDir: 'tests',
  retries: 1, // Retry on CI only once if a test fails. Set to 0 to disable retries.
  reporter:
  [
    ['list'], // Use the list reporter to output test results in the console. See https://playwright.dev/docs/test-reporters#list-reporter
    ['html'], // Use HTML reporter to generate a report of the test results. See https://playwright.dev/docs/test-reporters#html-reporter
  ],

  fullyParallel: true, // Run tests in parallel across all projects. Set to false to run tests sequentially.

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## Continuous Integration

In `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
      BASE_URL: .env.BASE_URL
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30

```

- Browsers are installed in CI  
- Artifacts (screenshots, videos, traces) are automatically uploaded by the GitHub-friendly reporter  

You can download and view report artifacts directly from the GitHub Actions UI.

---

## Optional Debugging

- **Headed mode** (browser visible):
  ```bash
  npx playwright test --headed
  ```
- **Slow down** execution:
  ```bash
  npx playwright test --slow-mo=300
  ```
- **Run a single spec**:
  ```bash
  npx playwright test tests/sort-with-pagination.spec.ts
  ```

---

## Extending the Suite

- **New sort scenarios**: plenty of scope to add other tests to the suite, based on contents of 02_test-cases.md
- **Enhance the current POM or add more POMs**: CafePage.ts might not be the only POM required for later tests. By keeping locators centralised to their pages, it helps maintainability.
- **Parallel & cross-browser**: configure projects in `playwright.config.ts`  

---

## Troubleshooting

### `chromium executable doesn't exist`

Run:
```bash
npx playwright install --with-deps
```

### `net::ERR_NAME_NOT_RESOLVED` on `page.goto()`

- Check internet connectivity  
- Verify the target URL

### Timeouts

- Increase default timeouts in config or per-action (`expect(..., { timeout: 60000 })`)  
- Use `test.step()` to locate the precise failing step  

### CI vs Local Failures

- Ensure Node.js versions match  
- Confirm `npx playwright install --with-deps` ran in CI  
- Check for environment-specific data (auth tokens, cookies) 

### Still stuck?

Enable full trace capture and inspect in the Playwright Trace Viewer:

```bash
npx playwright test --trace=on
npx playwright show-trace trace.zip
```

---

## Helpful Resources

- [Playwright Docs](https://playwright.dev/docs/intro)  
- [Playwright Troubleshooting](https://playwright.dev/docs/test-troubleshooting)  
- [GitHub Actions Docs](https://docs.github.com/actions)  
- [axe-core/playwright Accessibility](https://github.com/microsoft/playwright/tree/master/packages/playwright-core/src/server/axe)  

---

## FAQ

**Q: Why a locator-only POM?**  
A: It centralizes selectors in one place, making maintenance easier when the UI changes.

**Q: How do I see videos & screenshots?**  
A: Open `playwright-report/index.html` after `npx playwright show-report`. Passed tests will show their artifacts under the **Screenshots** and **Video** tabs.

**Q: What does `trace: 'on'` capture?**  
A: A complete record of network requests, DOM snapshots, and Playwright API calls—viewable with `npx playwright show-trace`.

---

*This guide exists to make your automation portable, understandable, and a joy to debug.*
```
