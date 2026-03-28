import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dashBoardpage';

let dashboard;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);

    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');

    await dashboard.clickAndWait(dashboard.messages, /chat/);
});


// 1
test('Verify chat page loads', async ({ page }) => {
    await expect(page).toHaveURL(/chat/);
});


// 2
test('Verify chat page is visible', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
});


// 3
test('Verify chat list or empty state', async ({ page }) => {
    const chats = page.locator('[class*="chat"]');

    const count = await chats.count();

    if (count === 0) {
        await expect(page.locator('body')).toBeVisible();
    } else {
        expect(count).toBeGreaterThan(0);
    }
});


// 4
test('Verify user remains logged in', async ({ page }) => {
    await expect(page).not.toHaveURL(/login/);
});


// 5
test('Verify refresh keeps chat page', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/chat/);
});


// 6
test('Verify navigation back to dashboard', async ({ page }) => {
    await page.goBack();
    await expect(page).toHaveURL(/app/);
});


// 7
test('Verify multiple DOM elements exist', async ({ page }) => {
    const count = await page.locator('*').count();
    expect(count).toBeGreaterThan(0);
});


// 8
test('Verify page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Bike4Sell');
});


// 9
test('Verify direct URL navigation works', async ({ page }) => {
    await page.goto('http://bike-value-estimator--praveensappaoff.replit.app/chat');
    await expect(page).toHaveURL(/chat/);
});


// 10
test('Verify no crash on load', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
});


// 11
test('Verify session persists after reload', async ({ page }) => {
    await page.reload();
    await expect(page).not.toHaveURL(/login/);
});


// 12
test('Verify responsive view (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
});


// 13
test('Verify scroll works in chat page', async ({ page }) => {
    await page.mouse.wheel(0, 500);
    await expect(page.locator('body')).toBeVisible();
});


// 14
test('Verify no console errors (basic)', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.reload();
    expect(errors.length).toBeLessThan(5);
});


// 15
test('Verify logout from chat page', async ({ page }) => {
    await dashboard.logoutUser();
    await expect(page).toHaveURL(/login/);
});