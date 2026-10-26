const { expect, test } = require('@playwright/test');

const baseUrl = 'https://demoblaze.com/index.html';
const validUsername = process.env.DEMOBLAZE_USERNAME;
const validPassword = process.env.DEMOBLAZE_PASSWORD;

async function openLogin(page) {
  await page.goto(baseUrl);
  await page.locator('#login2').click();
  await expect(page.locator('#logInModal')).toBeVisible({ timeout: 15_000 });
}

async function submitAndExpectAlert(page, expectedMessage) {
  const dialogPromise = page.waitForEvent('dialog').then(async (dialog) => {
    const type = dialog.type();
    const message = dialog.message();
    await dialog.accept();
    expect(type).toBe('alert');
    expect(message).toBe(expectedMessage);
  });

  await page.getByRole('button', { name: 'Log in' }).click();
  await dialogPromise;
}

test('valid credentials log in and display the welcome message', async ({ page }) => {
  test.skip(
    !validUsername || !validPassword,
    'Set DEMOBLAZE_USERNAME and DEMOBLAZE_PASSWORD to run this test.',
  );
  if (!validUsername || !validPassword) {
    throw new Error('DEMOBLAZE_USERNAME and DEMOBLAZE_PASSWORD are required.');
  }

  await openLogin(page);
  await page.locator('#loginusername').fill(validUsername);
  await page.locator('#loginpassword').fill(validPassword);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByText(`Welcome ${validUsername}`, { exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible({ timeout: 15_000 });
});

test('invalid credentials joker1 and test223 show the wrong-password alert', async ({ page }) => {
  await openLogin(page);
  await page.locator('#loginusername').fill('joker1');
  await page.locator('#loginpassword').fill('test223');

  await submitAndExpectAlert(page, 'Wrong password.');
  await expect(page.locator('#logInModal')).toBeVisible();
});

const missingCredentialCases = [
  { name: 'both username and password', username: '', password: '' },
  { name: 'the username', username: '', password: 'test-password' },
  { name: 'the password', username: 'test-user', password: '' },
];

for (const missingCase of missingCredentialCases) {
  test(`empty ${missingCase.name} shows the required-fields alert`, async ({ page }) => {
    await openLogin(page);
    await page.locator('#loginusername').fill(missingCase.username);
    await page.locator('#loginpassword').fill(missingCase.password);

    await submitAndExpectAlert(page, 'Please fill out Username and Password.');
    await expect(page.locator('#logInModal')).toBeVisible();
  });
}
