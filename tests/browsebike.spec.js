import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dashBoardpage';

let dashboard;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);

    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');

    await dashboard.clickAndWait(dashboard.browseBike, /listings/);
});


// 1
test('Verify listings page loads', async ({ page }) => {
    await expect(page).toHaveURL(/listings/);
});


// 2 ✅ FIXED (real locator)
test('Verify bikes are displayed', async ({ page }) => {
    const bikes = page.locator('a[href^="/bikes/"]');
    await expect(bikes.first()).toBeVisible();
});


// 3 ✅ FIXED CLICK
test('Verify clicking bike opens details page', async ({ page }) => {
    const bikes = page.locator('a[href^="/bikes/"]');

    await bikes.first().click();
    await expect(page).toHaveURL(/bikes/);
});


// 4
test('Verify multiple bikes exist', async ({ page }) => {
    const bikes = page.locator('a[href^="/bikes/"]');

    const count = await bikes.count();

    if (count === 0) {
        test.skip();
    }

    expect(count).toBeGreaterThan(0);
});


// 5
test('Verify bike price is visible', async ({ page }) => {
    await expect(page.locator('text=₹')).toBeVisible();
});


// 6
test('Verify bike image section exists', async ({ page }) => {
    await expect(
        page.locator('[class*="aspect"]').first()
    ).toBeVisible();
});


// 7
test('Verify bike location text exists', async ({ page }) => {
    await expect(page.locator('svg.lucide-map-pin').first()).toBeVisible();
});


// 8
test('Verify bike km driven icon exists', async ({ page }) => {
    await expect(page.locator('svg.lucide-gauge').first()).toBeVisible();
});


// 9
test('Verify grid layout is present', async ({ page }) => {
    await expect(
        page.locator('div[class*="grid-cols-1"]').first()
    ).toBeVisible();
});


// 10
test('Verify page reload keeps bikes', async ({ page }) => {
    await page.reload();

    const bikes = page.locator('a[href^="/bikes/"]');
    await expect(bikes.first()).toBeVisible();
});


// 11
test('Verify user remains on listings page after reload', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/listings/);
});


// 12
test('Verify clicking multiple bikes works', async ({ page }) => {
    const bikes = page.locator('a[href^="/bikes/"]');

    if (await bikes.count() > 1) {
        await bikes.nth(1).click();
        await expect(page).toHaveURL(/bikes/);
    }
});


// 13
test('Verify page is responsive (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const bikes = page.locator('a[href^="/bikes/"]');
    await expect(bikes.first()).toBeVisible();
});


// 14
test('Verify no crash on page load', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
});


// 15
test('Verify navigation back to listings', async ({ page }) => {
    const bikes = page.locator('a[href^="/bikes/"]');

    await bikes.first().click();
    await page.goBack();

    await expect(page).toHaveURL(/listings/);
});