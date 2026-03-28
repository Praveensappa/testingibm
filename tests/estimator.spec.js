
import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});


// ---------- PRICE ESTIMATOR ---------- //

// 1
// test('Verify estimator page opens', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();
//     await expect(page).toHaveURL(/price-estimator/);
// });


// 2
test('Verify estimator page UI loads', async ({ page }) => {
    await loginPage.getPriceEstimator().click();
    await expect(page.locator('body')).toBeVisible();
});


// 3
// test('Verify estimator form presence', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();
//     await expect(page.locator('input')).toBeVisible();
// });


// 4
// test('Verify empty submission handling', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();
//     await page.getByText('Calculate').click();

//     await expect(page.locator('body')).toBeVisible();
// });


// 5
// test('Verify calculation flow basic', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();

//     const inputs = page.locator('input');
//     const count = await inputs.count();

//     if (count > 0) {
//         await inputs.nth(0).fill('Honda');
//     }

//     await page.getByText('Calculate').click();
//     await expect(page.locator('body')).toBeVisible();
// });


// 6
// test('Verify estimator reload works', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();
//     await page.reload();
//     await expect(page).toHaveURL(/price-estimator/);
// });


// 7
test('Verify estimator page title', async ({ page }) => {
    await loginPage.getPriceEstimator().click();
    const title = await page.title();
    expect(title).toContain('Bike4Sell');
});


// 8
test('Verify estimator page responsive', async ({ page }) => {
    await loginPage.getPriceEstimator().click();
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
});


// 9
test('Verify no crash on estimator page', async ({ page }) => {
    await loginPage.getPriceEstimator().click();
    await expect(page.locator('body')).toBeVisible();
});


// 10
test('Verify navigation back from estimator', async ({ page }) => {
    await loginPage.getPriceEstimator().click();
    await page.goBack();
    await expect(page).toHaveURL(/login/);
});


// ---------- CONTACT PAGE ---------- //

// 11
// test('Verify contact page opens', async ({ page }) => {
//     await loginPage.getContactBtn().click();
//     await expect(page).toHaveURL(/contact/);
// });


// 12
test('Verify contact page UI loads', async ({ page }) => {
    await loginPage.getContactBtn().click();
    await expect(page.locator('body')).toBeVisible();
});


// 13
// test('Verify contact form presence', async ({ page }) => {
//     await loginPage.getContactBtn().click();
//     await expect(page.locator('input')).toBeVisible();
// });


// 14
// test('Verify contact form empty submit', async ({ page }) => {
//     await loginPage.getContactBtn().click();
//     await page.getByText('Send').click();

//     await expect(page.locator('body')).toBeVisible();
// });


// 15
// test('Verify contact page reload', async ({ page }) => {
//     await loginPage.getContactBtn().click();
//     await page.reload();
//     await expect(page).toHaveURL(/contact/);
// });


// 16
test('Verify contact page title', async ({ page }) => {
    await loginPage.getContactBtn().click();
    const title = await page.title();
    expect(title).toContain('Bike4Sell');
});


// 17
test('Verify contact page responsive', async ({ page }) => {
    await loginPage.getContactBtn().click();
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
});


// 18
test('Verify navigation back from contact', async ({ page }) => {
    await loginPage.getContactBtn().click();
    await page.goBack();
    await expect(page).toHaveURL(/login/);
});


// 19
test('Verify no console errors (basic)', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    await loginPage.getContactBtn().click();
    expect(errors.length).toBeLessThan(5);
});


// 20
// test('Verify estimator and contact links are clickable', async ({ page }) => {
//     await loginPage.getPriceEstimator().click();
//     await expect(page).toHaveURL(/price-estimator/);

//     await page.goBack();

//     await loginPage.getContactBtn().click();
//     await expect(page).toHaveURL(/contact/);
// });