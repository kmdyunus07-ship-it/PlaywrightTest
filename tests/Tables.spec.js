import { test, expect } from "@playwright/test";

// test.skip("table test", async ({ page }) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");

//   await page.locator("productTable");
//   await page.locator("//tbody/tr[1]/td[4]/input[1]").check();

//   await page.locator('//*[@id="pagination"]/li[2]/a').click();

//   await page.locator('//*[@id="productTable"]/tbody/tr[3]/td[4]/input').check();
//   await page.waitForTimeout(3000);
// });

// test.skip(" Datepickertest", async ({ page }) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");

//   await page.locator("#datepicker").fill("23/06/1994");

//   await page.waitForTimeout(3000);
// });

test("screenshot test", async ({ page }) => {
  await page.goto("https://demoblaze.com/index.html");

    await page.waitForTimeout(3000);

  await page.screenshot({
    path:
      "C:\\Users\\Hp\\PlaywrightAutomation\\tests\\Screenshot\\" +
      Date.now() +
      "fullpage.png", fullPage: true,
  });

  await page.waitForTimeout(3000);
});
