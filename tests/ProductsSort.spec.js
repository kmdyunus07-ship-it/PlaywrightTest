
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo - Product Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByPlaceholder('Username').fill(USERNAME);
    await page.getByPlaceholder('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  // PROD-01: Verify product listing
  test('PROD-01: Verify products and prices are displayed', async ({ page }) => {
    const products = page.locator('.inventory_item');
    const count = await products.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(products.nth(i).locator('.inventory_item_name'))
        .toBeVisible();

      await expect(products.nth(i).locator('.inventory_item_price'))
        .toBeVisible();
    }

    await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-02: Sort price low to high
  test('PROD-02: Sort products by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => a - b)
    );
        await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-03: Sort price high to low
  test('PROD-03: Sort products by price high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('hilo');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => b - a)
    );
        await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-04: Sort product name A-Z
  test('PROD-04: Sort product names A-Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('az');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    expect(names).toEqual(
      [...names].sort((a, b) => a.localeCompare(b))
    );
    await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-05: Sort product name Z-A
  test('PROD-05: Sort product names Z-A', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
      .selectOption('za');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    expect(names).toEqual(
      [...names].sort((a, b) => b.localeCompare(a))
    );
    await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-06: Open product details
  test('PROD-06: Open a product detail page', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';

    await page.getByText(productName, { exact: true }).click();

    await expect(
      page.locator('.inventory_details_name')
    ).toHaveText(productName);

    await expect(
      page.locator('.inventory_details_price')
    ).toBeVisible();

    await expect(
      page.locator('.inventory_details_desc')
    ).toBeVisible();
        await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-07: Verify product images
  test('PROD-07: Verify product images load', async ({ page }) => {
    const images = page.locator('.inventory_item_img img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);

      await expect(image).toBeVisible();
      await expect(image).toHaveJSProperty('complete', true);

      const naturalWidth = await image.evaluate(
        img => img.naturalWidth
      );

      expect(naturalWidth).toBeGreaterThan(0);
    }
        await page.waitForTimeout(5000); //pausing for 5 seconds
  });

  // PROD-08: Verify Add to cart buttons
  test('PROD-08: Add products to cart', async ({ page }) => {
    const backpack = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    const bikeLight = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    );

    await backpack.click();
    await bikeLight.click();
    await page.waitForTimeout(5000); //pausing for 5 seconds
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toBeVisible();

    await expect(
      page.locator('[data-test="remove-sauce-labs-bike-light"]')
    ).toBeVisible();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('2');
  });
      
});
