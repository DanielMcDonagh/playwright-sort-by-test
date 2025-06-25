import { test, expect } from '@playwright/test';
import { highlight } from './utils';
import CafePage from '../pages/CafePage';

test('TCX2 – descending Product Z-A sort persists across pages', async ({ page }) => {
  const Page = new CafePage(page);

  await test.step('Navigate to the cafe listing and decline cookies', async () => {
    // Navigate to the cafe listing
    await page.goto('/cafe');
    await page.waitForLoadState('networkidle');

    // Decline cookies banner if it appears
    if (await Page.declineCookies.isVisible()) {
      await highlight(Page.declineCookies, page);
      await Page.declineCookies.click();
    }
  });

  await test.step('Check initial state', async () => {
    // Check Sort By dropdown is set to default
    await Page.sortOption('position.selected').isVisible();

    // Check Show Limit dropdown is set to 9
    await Page.showLimitOption('9').isVisible();

    // Check the first products name is Mango, chickpea & turmeric wrap
    await expect(Page.productNames.first()).toHaveText(/Mango, chickpea & turmeric wrap/);
    await highlight(Page.productNames.first(), page);
  });

  await test.step('Check pagination', async () => {
    // Highlight and go to Page 2
    await highlight(Page.page2Link, page);
    await Page.page2Link.click();
    await page.waitForLoadState('networkidle');

    // check the first product is Grind Flat White Coffee
    await expect(Page.productNames.first()).toHaveText(/Grind Flat White Coffee/, {timeout: 30000});
    await highlight(Page.productNames.first(), page);

    // Highlight and go to Page 1
    await highlight(Page.page1Link, page);
    await Page.page1Link.click();
    await page.waitForLoadState('networkidle');
  });

  await test.step('Sort products by Product Z-A', async () => {
    // Highlight and Open the "Sort By" dropdown
    await highlight(Page.sortDropdown, page);
    await Page.sortDropdown.click();

    // Highlight and select the “Product Z-A” option (data-value="product_desc")
    await highlight(Page.sortOption('product_desc'), page);
    await Page.sortOption('product_desc').click();
    await page.waitForLoadState('networkidle');

    // Check first product is Wolfys Creamy Honey Porridge 50g, wait up to 30s for loading gif to finish
    await expect(Page.productNames.first()).toHaveText(/Wolfys Creamy Honey Porridge 50g/, {timeout: 30000});
  });
    await highlight(Page.productNames.first(), page);

  await test.step('Check sorting persists across pages', async () => {
    // Highlight and go to Page 2
    await highlight(Page.page2Link, page);
    await Page.page2Link.click();
    await page.waitForLoadState('networkidle');

    // Check the first product is Vithit Mango and Pineapple 330ml
    await expect(Page.productNames.first()).toHaveText(/Vithit Mango and Pineapple 330ml/, {timeout: 60000});
    await highlight(Page.productNames.first(), page);
  });

});