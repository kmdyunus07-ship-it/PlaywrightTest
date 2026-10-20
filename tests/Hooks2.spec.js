import { test, expect } from "@playwright/test";

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://demoblaze.com/index.html");

  await page.locator("//a[@id='login2']").click();

  await page.locator("#loginusername").fill("yunus1");

  await page.locator("#loginpassword").fill("test@123");
  await page.locator("//button[normalize-space()='Log in']").click();
});

//login

//home
test("Home page  login test", async () => {
  const products = await page.$$(".hrefch");

  await expect(products).toHaveLength(9);

  await page.waitForTimeout(3000);
});

test(" product add to cart test", async () => {
  //adding to cart

  await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
  await page.locator("//a[normalize-space()='Add to cart']").click();

  await page.on("dialog", async (dialog) => {
    await expect(dialog.message()).toContain("Product added.");
    await dialog.accept();
  });
  await page.waitForTimeout(3000);
});

test.afterAll(async () => {
  await page.locator("#logout2").click();

  await page.waitForTimeout(3000);
});
