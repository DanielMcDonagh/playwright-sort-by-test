import { Page, Locator } from '@playwright/test';

export default class CafePage {
  readonly page: Page;

  readonly declineCookies: Locator;
  readonly sortDropdown: Locator;
  readonly sortOption: (value: string) => Locator;
  readonly productNames: Locator;
  readonly page1Link: Locator;
  readonly page2Link: Locator;
  readonly showLimit: Locator;
  readonly showLimitOption: (value: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.declineCookies = page.locator(
      'button.amgdprcookie-button.-decline'
    );

    this.sortDropdown = page.locator(
      '.toolbar-sorter.sorter ul > li.init'
    );

    this.sortOption = (value: string) =>
      page.locator(`.toolbar-sorter.sorter li.options[data-value="${value}"]`);

    this.productNames = page.locator('.product-item .product-item-name a');
    
    this.page1Link = page.locator('#layer-product-list > div:nth-child(3) > div.pages > ul > li:nth-child(2) > a');
    
    this.page2Link = page.locator('#layer-product-list > div:nth-child(3) > div.pages > ul > li:nth-child(3) > a');

    this.showLimit = page.locator('.toolbar-sorter.limiter li.init');

    this.showLimitOption = (value: string) =>
      page.locator(`.toolbar-sorter.limiter li.options[data-value="${value}"]`);

  }
}