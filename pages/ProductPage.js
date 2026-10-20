
import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;

    this.addToCartButton = page.locator(
      "//a[normalize-space()='Add to cart']"
    );
  }

  async addToCart() {
    // Register the listener BEFORE clicking.
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.addToCartButton.click();

    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Product added.');

    await dialog.accept();
  }
}
