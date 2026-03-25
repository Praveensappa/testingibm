import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';
let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});


// 1. Title Check
test('has title', async ({ page }) => {
    const pagetitle = await page.title();
    expect(pagetitle).toBe("Bike4Sell – Second-Hand Bike Marketplace");
});


// 2. Only Email Entered
test('email only validation', async () => {
    await loginPage.enterEmail('praveen@gmail.com');
    await loginPage.clickSignIn();

    const error = await loginPage.getErrorMessage();
    expect(error).toBe("Password is required");
});


// 3. Correct Login
test('correct login', async ({ page }) => {
    await loginPage.login('peter@gmail.com', '213721');
    await expect(page).toHaveURL(/app/);
});


// 4. Invalid Email + Valid Password
test.fixme('invalid email and valid password', async () => {
    await loginPage.login('wrong@gmail.com', '213721');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain("Invalid"); // flexible check
});


//5th testcase
test('checking hyperlink of create account', async ({ page }) => {
    await loginPage.clickCreateAccount();
    await expect(page).toHaveURL(/regis/);
});

//6th testcase
test('signup button is visible', async ({ page }) => {
    await loginPage.clickSignup();
    await expect(page).toHaveURL(/register/);
});

test('Checking visibility of price estimator on login page', async ({ page }) => {
    const est = loginPage.getPriceEstimator();
    await expect(est).toBeVisible();
    await expect(page).toHaveURL(/login/);
});


// 8th testcase
test('checking the contact page visibility', async ({ page }) => {
    const contactbtn = loginPage.getContactBtn();
    await expect(contactbtn).toBeVisible();
    await expect(page).toHaveURL(/login/);
});
//9th testcase
test('checking the copyright licence', async ({ page }) => {
    const sen = loginPage.getCopyrightText();
    await expect(sen).toHaveText("© 2026 Bike4Sell. The premium second-hand bike marketplace.");
});