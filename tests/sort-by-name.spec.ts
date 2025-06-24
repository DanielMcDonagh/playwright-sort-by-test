import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';

test('Sort Products by Name Descending', async ({ page }) => {
  const productList = new ProductListPage(page);

  await productList.open();
  await productList.selectSortBy('Product Name');
  await productList.toggleSortDirection();

  const productNames = await productList.getProductNames();
  const expected = [...productNames].sort().reverse();

  expect(productNames).toEqual(expected);
});