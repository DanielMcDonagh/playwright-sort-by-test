// tests/utils.ts
import { Locator, Page } from '@playwright/test';

// Highlight an element by giving it a red glow for a short duration
// Useful for debugging and visual feedback in tests

export async function highlight(locator: Locator, page: Page, duration = 200) {
  // give the element a red glow
  await locator.evaluate((el: HTMLElement) => {
    const orig = el.style.boxShadow;
    el.style.boxShadow = '0 0 0 4px rgba(255,0,0,0.9)';
    return orig;
  }).then(origValue => {
    // after a short wait, restore original
    page.waitForTimeout(duration).then(() => {
      locator.evaluate((el: HTMLElement) => {
        el.style.boxShadow = '';
      });
    });
  });
}