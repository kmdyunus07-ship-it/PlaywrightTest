import { test, expect } from "@playwright/test";

// test("Dropdown test", async({page}) =>{

//      await page.goto('https://testautomationpractice.blogspot.com/');

//     //  await page.locator("//select[@id='country']").selectOption('canada');

//    //  await page.waitForTimeout(5000); //pausing for 5 seconds
// //Assertions
// const options = await page.locator("//select[@id='country']/option");
// await expect(options).toHaveCount(10);

//    await page.waitForTimeout(5000); //pausing for 5 seconds

// })


test('MultiDropdown test', async ({ page }) => {
    await page.goto(
        'https://www.htmlelements.com/demos/dropdownlist/multiple-selection/index.htm'
    );

    // Step 1: Click the actual dropdown button
    await page.locator('[smart-id="dropDownButton"]').click();

    // Step 2: Select Breve
    await page.locator('smart-list-item[label="Breve"]').click();

    // Step 3: Select Bicerin
    await page.locator('smart-list-item[label="Bicerin"]').click();

    // Step 4: Verify selected items
    await expect(
        page.locator('smart-list-item[label="Breve"]')
    ).toHaveAttribute('aria-selected', 'true');

    await expect(
        page.locator('smart-list-item[label="Bicerin"]')
    ).toHaveAttribute('aria-selected', 'true');


    await page.waitForTimeout(5000); //pausing for 5 seconds
});
