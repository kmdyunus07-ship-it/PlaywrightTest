
export class HomePage {
  constructor(page) {
    this.page = page;

    this.products = page.locator('.hrefch');

    this.samsungGalaxyS6 = page.locator(
      "//a[normalize-space()='Samsung galaxy s6']"
    );
  }

  async getProductCount() {
    return await this.products.count();
  }

  async openSamsungGalaxyS6() {
    await this.samsungGalaxyS6.click();
  }
}
