

import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js'
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test.describe('DemoBlaze tests', () => {
  let loginPage;
  let homePage;
  let productPage;

  // Login before each test to keep tests independent.
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    await loginPage.open();
    await loginPage.login('yunus1', 'test@123');
  });

  // Test 1: Verify login
  test('Login test', async ({ page }) => {
    await loginPage.open(page);
    await loginPage.login('yunus1', 'test@123');
  });

  // Test 2: Verify home page products
  test('Home page product count test', async () => {
    await expect(homePage.products).toHaveCount(9);
  });

  // Test 3: Add product to cart
  test('Add Samsung Galaxy S6 to cart', async () => {
    await homePage.openSamsungGalaxyS6();

    await productPage.addToCart();
  });
});



// test ( 'pom test',async ({ page  }) => {

//   await page.goto("https://demoblaze.com/index.html");

//   await page.locator("//a[@id='login2']").click();

//   await page.locator("#loginusername").fill("yunus1");

//   await page.locator("#loginpassword").fill("test@123");
//   await page.locator("//button[normalize-space()='Log in']").click();
// });
