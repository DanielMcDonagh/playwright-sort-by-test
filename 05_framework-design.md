# Framework Design

## Technical Test Prompt 5

Can you explain how you would organize and scale the test framework, and what best practices you would apply for a larger project from a theoretical standpoint?

## Introduction

This document describes how to evolve our Playwright+TypeScript test suite as it grows - adding new tests, pages or entire domains - while minimising maintenance overhead. It also revisits the key best practices we’ve applied here and introduces additional ones suited to larger projects.

## 1. What We’ve Done Well

- **Locator‐Only POMs**  
  All selectors live in `pages/` classes with no embedded actions, so UI updates touch one file only.

- **Utility Wrappers**  
  Reusable helpers (`clickHighlighted()`) centralise the highlighting logic, cna be expanded to include other utility helpers.

- **Structured Tests**  
  Use of `test.step()` blocks and named specs makes failures self-documenting and easy to debug.

- **Deterministic Artifacts**  
  Configured `screenshot: 'on'`, `video: 'on'`, and `trace: 'on'` so every run-pass or fail-yields full diagnostics.

- **TypeScript Safety**  
  Strict typing catches invalid locators and mis-named methods at compile time.

## 2. Scaling the Framework

As the suite grows - more pages, features or test categories - we can apply these organisational strategies:

### 2.1 Feature-First Test Grouping  
Group specs by domain under `tests/`, e.g.:

```
tests/
├── sorting/           # “Sort By” tests
├── filtering/         # future filter scenarios
├── checkout/          # basket & payment flows
└── auth/              # login, signup, permissions
```

Inside each folder, split “happy path” from edge cases by wrapping them in `test.describe()` or separate files.

### 2.2 Component-Level POMs  
For shared widgets (headers, footers, modals), introduce `pages/components/`. Tests import only the component classes they need.

### 2.3 Fixtures & Shared State  
Use Playwright’s fixture system (`fixtures/`) to set up global preconditions-authentication tokens, test data, feature flags - so tests remain declarative:

```ts
import { test as base } from '@playwright/test';

export const test = base.extend<{ authToken: string }>({
  authToken: async ({}, use) => {
    const token = await getAuthToken();
    await use(token);
  }
});
```

### 2.4 Data-Driven and Parameterised Tests  
Centralise test data in `tests/data/` (JSON, factories). Use `test.describe.parallel()` or `test.each()` to run through permutations (user roles, sorting options) without bloating spec files.

### 2.5 Config Profiles & Multiple Projects  
In `playwright.config.ts`, define multiple projects for:

- Browsers (Chromium, Firefox, WebKit)  
- Viewports (desktop, tablet, mobile)  
- Environments (staging, production)

This structure keeps test code unchanged while extending coverage.

## 3. Additional Best Practices for Larger Projects

As we look ahead to larger feature sets and team growth, here are a handful of simple, human-friendly guidelines to keep our test suite maintainable, reliable, and easy to understand-whether you’re a developer, QA specialist, or stakeholder.

### 1. Group Tests by Feature, Not by File Count

• **Why it matters**  
  When dozens (or hundreds) of tests pile up, finding the right one can feel like digging through haystacks.

• **What to do**  
  - Create folders under `tests/` named after high-level features (e.g. `sorting/`, `checkout/`, `login/`).  
  - Keep “happy-path” and “edge-case” scenarios together, so everyone knows where to add or look for new tests.

### 2. Centralise Page Structure & Shared Components

• **Why it matters**  
  If a button’s label changes or a new popup appears, we don’t want to hunt through every test file.

• **What to do**  
  - Maintain one “map” of selectors for each page or common component (headers, footers, modals).  
  - Let tests simply say “click the Sort dropdown” rather than spelling out every CSS rule.

### 3. Streamline Our CI Pipeline

• **Why it matters**  
  Fast, predictable feedback on each code change keeps everyone moving confidently.

• **What to do**  
  - **Smoke vs. Full Suite**: Run a small, high-value “smoke” set on every pull request; run the full suite on merges or nightly.  
  - **Parallel Runs**: Divide tests across multiple workers so a 5-minute suite can run in 1–2 minutes.  
  - **Caching**: Store downloaded browsers and dependencies so builds start instantly.

### 4. Deliver Clear, Actionable Reports

• **Why it matters**  
  Screenshots and videos turn “something failed” into “I see exactly what broke.”

• **What to do**  
  - Always capture screenshots and short video clips-even on passing tests-so we can replay the user journey.  
  - Publish an HTML report that anyone can click through; no command-line expertise required.  
  - Send automatic notifications (Slack, email) with clear pass/fail summaries and links to artifacts.

### 5. Separate Test Data & Environment Settings

• **Why it matters**  
  Hard-coding usernames, URLs, or feature flags makes tests brittle and hard to move between DEV, STAGING, and PROD.

• **What to do**  
  - Keep test data (user accounts, sample orders) in simple JSON or spreadsheet tables.  
  - Store URLs, credentials, and flags in environment-specific config-never inside test scripts.  
  - Use a tiny “setup” step to log in or seed data before each test, so scenarios stay independent and repeatable.

### 6. Emphasise Code Quality & Collaboration

• **Why it matters**  
  Even the smartest teams slow down if tests become untidy or inconsistent.

• **What to do**  
  - Enforce consistent styling (auto-formatting) and linting so diffs are clean and reviews are fast.  
  - Require every new test or selector change to pass through a peer review-sharing context helps everyone learn.  
  - Maintain a short, printable “cheat sheet” of commands, folder layout, and troubleshooting tips for new team members.

### 7. Keep Evolving

Finally, treat the framework itself as a living project. Schedule periodic “health checks” to:

- Identify and fix flaky tests.  
- Remove or refactor rarely used helpers.  
- Add new utilities (e.g. accessibility checks, performance metric capture) as the team’s skills and priorities grow.

By adopting these practices in our next project, we’ll ensure our end-to-end suite remains fast to run, easy to maintain, and transparent for everyone-developers, QA, and stakeholders alike.

## 4. Summary

By layering locators, actions, fixtures and tests; grouping by feature; parameterising via data files; and enforcing CI best practices, we can scale from a single “Sort By” workflow to a comprehensive E2E suite covering all user journeys-while keeping maintenance manageable and team contributions friction-free.  
