import { test, expect } from '@playwright/test';

test('Home page' ,async({page}) =>{


    await page.goto('https://www.demoblaze.com/');

    const pageTitle = await page.title();
    console.log('page title is:'+ pageTitle)
    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL('https://www.demoblaze.com/')
    await page.close();
})