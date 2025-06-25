# Testing Strategy Summary

## Technical Test Prompt 3

What testing phases/processes would you apply to validate the implemented sorting feature, from the initial idea to production delivery? (e.g., exploratory testing, system testing, etc.)

This Summary is to be seen as a TLDR overview of the original Testing Strategy document. This could be utilised for stakeholders, juniors, or other teams in a real situation.

## Purpose  
A concise overview of how we’ll validate the “Sort By” feature on the High Life Café product listing page-from requirements through to production release - so anyone (stakeholders, juniors, or team members) can understand our quality guardrails, risk mitigation, and timeline.

## High-Level Phases

1. **Requirements & Criteria Refinement**  
   • Work with Product to turn “Sort By” ideas into clear, testable criteria.  
   • Capture must-haves (“Default sort”, “Sort options”, “Toggle direction”) and provisional items (URL state, large-set performance).

2. **Unit Testing**  
   • Devs write fast, low-level tests for sorting logic and helper functions.  
   • Ensures core JavaScript/TypeScript code behaves as expected.

3. **End-to-End (E2E) Testing**  
   • Automated Playwright scripts validate UI interactions (dropdown, toggle, filtering, URL persistence).  
   • Runs on each pull request in our CI pipeline.

4. **Exploratory & Accessibility**  
   • QA explores edge cases (rapid toggles, filters + sort, pagination, offline).  
   • Keyboard and screen-reader checks to meet WCAG 2.1 AA.

5. **Performance & Load**  
   • Simulate sorting on hundreds of products to ensure <2 s response.  
   • Concurrent-user testing with lightweight Python scripts or tools like Locust/K6.

6. **Regression & Release**  
   • Full E2E suite runs on every deploy to staging/production.  
   • Manual smoke tests confirm core flows (sort, reset, URL deep-link) before sign-off.

## Sprint-Level Roadmap

| Sprint Week      | Focus                                        |
|------------------|----------------------------------------------|
| Week 1 (Plan)    | Refine acceptance criteria                   |
| Week 2–3         | Develop UI + unit tests; scaffold E2E tests  |
| Week 4–5         | Complete automation; exploratory & a11y      |
| Week 6 (Pre-Ship)| Performance/load checks; smoke & sign-off    |

## Key Readiness Checkpoints

- All must-have criteria have at least one automated test  
- Core UI interactions (dropdown, toggle, URL) verified  
- Edge cases and accessibility flows manually vetted  
- Performance targets met (<2 s for large lists)  
- CI build passes & smoke tests green on staging  

## Summary  
Our layered approach ensures we catch issues early, automate repeatable checks, and deliver a robust, accessible, high-performing sort experience. For the full traceability matrix and detailed test cases, see **02_test-cases.md**.

## Next Page 
- [04 – Automation Setup Guide](04_automation-setup-guide.md)