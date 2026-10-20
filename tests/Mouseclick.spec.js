import { test, expect } from "@playwright/test";

test.skip("Mouse hover test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.locator("//button[normalize-space()='Point Me']").hover();

  await page.locator("//a[normalize-space()='Mobiles']").click();

  await page.waitForTimeout(3000);
});

test.skip("Mouse Right test", async ({ page }) => {
  await page.goto("https://vinothqaacademy.com/mouse-event/");

  const button =  await page.locator("(//button[normalize-space()='Right Click Me'])");

  await button.click({ button: "right" });



  await page.click("//button[normalize-space()='Edit']");
  await page.waitForTimeout(3000);
});


test.skip("Mouse double test", async ({ page }) => {
 await page.goto("https://testautomationpractice.blogspot.com/");

 await page.locator("//button[normalize-space()='Copy Text']").dblclick();

 await expect(page.locator("#field2")).toHaveValue("Hello World!");


  await page.waitForTimeout(3000);
});



test("Mouse drag and drop test", async ({ page }) => {
 await page.goto("https://testautomationpractice.blogspot.com/");

const source = await page.locator("#draggable");

const target = await page.locator("#droppable");


await source.dragTo(target);

  await page.waitForTimeout(5000);
});