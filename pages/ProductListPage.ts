import { Page } from '@playwright/test';

export class ProductListPage {
  constructor(private page: Page) {}

  // Navigates to the product listing page
  async open() {
    await this.page.goto('https://highlifeshop.com/speedbird-cafe');
  }

  // Selects a sort option from the dropdown
  async selectSortBy(option: string) {
    await this.page.click('text="Sort by"');
    await this.page.click(`text="${option}"`);
  }

  // Clicks the button to toggle sort order (ascending <-> descending)
  async toggleSortDirection() {
    await this.page.click('[data-testid="sort-direction-toggle"]');
  }

  // Grabs all product names currently displayed
  async getProductNames(): Promise<string[]> {
    return this.page.locator('[data-testid="product-name"]').allInnerTexts();
  }
}