import { test, expect } from '@playwright/test';

test('Locators', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/');
    await page.click("id=login2")
    await page.fill('#loginusername','yunus1')
    await page.fill('//input[@id="loginpassword"]','test@123')


    await page.click("//button[normalize-space()='Log in']")

    const logoutlink = await page.locator("//a[normalize-space()='Log out']")
    await expect(logoutlink).toBeVisible();

})
test('multiples elements anchor tags test', async ({ page }) => {
await page.goto('https://www.demoblaze.com/');

const products =await page.$$("//div[@id='tbodyid']//h4/a")

for (const product of products){

    const prodnName = await product.textContent();
    console.log('product name is:',prodnName);

}

// const links = await page.$$('a');
// for (const link of links) {
//   const linkText = await link.textContent();
//   console.log('Link text:', linkText);  

 
// }
})