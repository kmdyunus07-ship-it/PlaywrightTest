import { test, expect } from "@playwright/test";

test("Hidden dropdown test", async ({ page }) => {
  // Login
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.locator("//input[@placeholder='Username']").fill("Admin");
  await page.locator("//input[@placeholder='Password']").fill("admin123");
  await page.locator("//button[@type='submit']").click();

  // Navigate to PIM

  await page.locator("//a[normalize-space()='PIM']").click();

  const jobTitleGroup = page.locator(".oxd-input-group").filter({
    has: page.locator("label", {
      hasText: /^Job Title$/,
    }),
  });

  const dropdown = jobTitleGroup.locator(".oxd-select-text");

  // Open dropdown
  await dropdown.click();

  // Wait for the option to appear
  const roleOption = page
    .locator(".oxd-select-option")
    .filter({ hasText: /^Content Specialist$/ });

  await expect(roleOption).toBeVisible();

  // Select the role
  await roleOption.click();

  // Verify the selected role
  await expect(dropdown).toContainText("Content Specialist");

  await page.locator("//button[@type='submit']").click();

  await page.locator("//button[normalize-space()='Add']").click();

  await page.locator("//input[@placeholder='First Name']").fill("yunus");
  await page.locator("//input[@placeholder='Middle Name']").fill("kaya");
  await page.locator("//input[@placeholder='Last Name']").fill("bhai");



  await page.locator("//button[@type='submit']").click();

  await page.waitForTimeout(5000); // Wait for 5 seconds to observe the selected role
});
