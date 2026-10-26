


const { test, expect } = require('@playwright/test');

test.skip('Select Delhi from autocomplete suggestions', async ({ page }) => {
    await page.goto('https://www.redbus.in/');

    // Step 1: Enter the source location
    const fromInput = page.locator('#srcinput');

    await fromInput.fill('Delhi');

    // Step 2: Wait for Delhi suggestion
    const delhiSuggestion = page.getByText('Delhi', {
        exact: true
    });

    await expect(delhiSuggestion.first()).toBeVisible();

    // Step 3: Click Delhi from the suggestions
    await delhiSuggestion.first().click();

    // Step 4: Verify the selected location
    await expect(fromInput).toHaveValue(/Delhi/i);
});
