import { test, expect } from "@playwright/test";

test.skip("alert box test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toContain("I am an alert box!");
    await dialog.accept();
  });

  await page.locator("//button[@id='alertBtn']").click();
  await page.waitForTimeout(3000);
});

test.skip("Confirmation dialog test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toContain("Press a button!");
    await dialog.accept(); //accept alert
    
    // await dialog.dismiss(); //dismiss alert
  });

  await page.locator("//button[@id='confirmBtn']").click();

  await expect(page.locator("//p[@id='demo']")).toHaveText("You pressed OK!");
  await page.waitForTimeout(5000);
});

test("text prompt dialog test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("prompt");
    expect(dialog.message()).toContain("Please enter your name:");
    expect(dialog.defaultValue()).toBe("Harry Potter");
    await dialog.accept('John' ); //accept alert
    //    await dialog.accept(john); //accept alert we need to pass the value in the prompt alert
    
    // await dialog.dismiss(); //dismiss alert
  });

  await page.locator("#promptBtn").click();

  await expect(page.locator("//p[@id='demo']")).toHaveText("Hello John! How are you today?");
  await page.waitForTimeout(5000);
});
