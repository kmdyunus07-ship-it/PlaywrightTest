import { test, expect } from '@playwright/test';




// test("Inputbox test",async({page}) => {

// await page.goto('https://testautomationpractice.blogspot.com/');



// await expect( page.locator("//input[@id='name']")).toBeVisible();
// await expect( page.locator("//input[@id='name']")).toBeEmpty();
// await expect( page.locator("//input[@id='name']")).toBeEnabled();
// await expect( page.locator("//input[@id='name']")).toBeEditable();

// // await page.fill("//input[@id='name']",'yunus');
// await page.locator("//input[@id='name']").fill('yunus');
// await page.locator("//input[@id='email']").fill('yunus@gmail.com');
// await page.locator("//input[@id='phone']").fill('1234567890');
// await page.locator("//textarea[@id='textarea']").fill('Dno:11/1/655 krupananda nagar, anatapuram, hyderabad');

// await page.waitForTimeout(5000); //pausing for 5 seconds to see the filled value in the input box

// })


// test("Radio test",async({page}) => {

// await page.goto('https://testautomationpractice.blogspot.com/');

// await page.locator("//label[@for='male']").check();

// //asertions
// await expect( page.locator("//label[@for='male']")).toBeChecked();
// await expect( page.locator("//label[@for='male']").isChecked()).toBeTruthy();
// await expect( await page.locator("//label[@for='female']").isChecked()).toBeFalsy();

// await page.waitForTimeout(5000); //pausing for 5 seconds to see the filled value in the input box

// })


test("Checkbox test",async({page}) => {

await page.goto('https://testautomationpractice.blogspot.com/');

// await page.locator("//label[@for='monday']").check();
// await page.locator("//label[@for='saturday']").check();
// await page.waitForTimeout(3000);
// await page.locator("//label[@for='saturday']").uncheck();


const checkBoxlocator =[
    "//label[@for='monday']",
    "//label[@for='saturday']",
    "//label[@for='sunday']"
];
 for (const checkbox of checkBoxlocator)
 {
    await page.locator(checkbox).check();
 }

  for (const checkbox of checkBoxlocator)
 {
   if(await page.locator(checkbox).isChecked());
   {
    await page.locator(checkbox).uncheck();
   }
 }

//asertions
// await expect( page.locator("//label[@for='monday']")).toBeChecked();
// await expect( page.locator("//label[@for='monday']").isChecked()).toBeTruthy();
// await expect( page.locator("//label[@for='saturday']").isChecked()).toBeTruthy();




await page.waitForTimeout(5000); //pausing for 5 seconds to see the filled value in the input box

})