import { test, expect } from '@playwright/test';
import CafePage from '../pages/CafePage';

// Archived test to ensure all locators are working correctly, can be utilised when adding new locators or changing existing ones.

test('locator sanity check', async ({ page }) => {
  const P = new CafePage(page);
  await page.goto('/cafe');
  await page.waitForLoadState('networkidle');

  // just ensure every locator finds at least one element
  await expect(P.declineCookies.first()).toBeHidden();      // banner may not show
  await expect(P.sortDropdown).toBeVisible();
  await expect(P.sortOption('position')).toBeVisible();
  await expect(P.showLimit).toBeVisible();
  await expect(P.showLimitOption('9')).toBeVisible();
  await expect(P.productNames.first()).toBeVisible();
  await expect(P.page1Link).toBeVisible();
  await expect(P.page2Link).toBeVisible();
});