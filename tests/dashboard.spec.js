import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dashBoardpage';

let dashboard;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');
});

// 1
test('checking sellBike button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.sellBike, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 2
test('checking Browse bike functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.browseBike, /listings/);
    await expect(page).toHaveURL(/listings/);
});

// 3
test('checking My Orders button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myOrders, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 4
test('checking Messages button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.messages, /chat/);
    await expect(page).toHaveURL(/chat/);
});

// 5
test('checking Estimator button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.estimator, /price-estimator/);
    await expect(page).toHaveURL(/price-estimator/);
});

// 6
test('checking Contact button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.contact, /contact/);
    await expect(page).toHaveURL(/contact/);
});

// 7
test('checking logout button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.logout, /login/);
    await expect(page).toHaveURL(/login/);
});

// 8
test('checking for the logo visibility', async () => {
    await expect(dashboard.logo).toBeVisible();
});

// 9
test('checking for the second sell bike button', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.sellBike2, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 10
test("checking Homepage Mylisting functional block", async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myListings, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 11
test('checking for myorders functional block', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myOrdersBlock, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 12
test('checking for Active Chats functional block', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.activeChats, /chat/);
    await expect(page).toHaveURL(/chat/);
});

// 13
test('checking for the functionality of first View all link', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.viewAllFirst, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 14
test('checking for the functionality of second View all which navigates orders page', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.viewAllLast, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 15
test('checking for Browse available bikes link navigates to browse bike page', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.browseAvailable, /listings/);
    await expect(page).toHaveURL(/listings/);
});