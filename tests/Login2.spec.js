
const { test, expect } = require('@playwright/test');

const baseURL = 'https://www.saucedemo.com/';
const password = 'secret_sauce';

test.describe('SauceDemo Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForTimeout(3000);
  });

  test('LOGIN-01: Login with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true }))
      .toBeVisible();

  });

  test('LOGIN-02: Invalid password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText(
        'Username and password do not match any user in this service'
      );
  });

  test('LOGIN-03: Empty username and password', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });

  test('LOGIN-04: Username only', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Password is required');
  });

  test('LOGIN-05: Locked-out user', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });

  test('LOGIN-06: Password is masked', async ({ page }) => {
    await page.getByPlaceholder('Password').fill(password);

    await expect(page.getByPlaceholder('Password'))
      .toHaveAttribute('type', 'password');
  });

  test('LOGIN-07: Submit login using Enter key', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByPlaceholder('Password').press('Enter');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true }))
      .toBeVisible();
  });

  test('LOGIN-08: Refresh after login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await page.reload();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true }))
      .toBeVisible();
  });

  test('LOGIN-09: Logout successfully', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('//a[@id=\'logout_sidebar_link\']').click();

    await expect(page).toHaveURL(baseURL);
    await expect(page.getByRole('button', { name: 'Login' }))
      .toBeVisible();
  });

  test('LOGIN-10: Protected page after logout', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('//a[@id=\'logout_sidebar_link\']').click();

    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL(baseURL);
    await expect(page.getByRole('button', { name: 'Login' }))
      .toBeVisible();
  });
});
