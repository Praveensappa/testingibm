import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dashBoardpage';
import { SellBikePage } from '../POM/sellBikePage';

let dashboard;
let sellBike;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    sellBike = new SellBikePage(page);

    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');
    await expect(page).toHaveURL(/app/);

    await dashboard.clickAndWait(dashboard.sellBike, /sell/);
    await expect(page).toHaveURL(/sell/);
});

test('Verify validation when attempting to publish listing without entering any details', async ({ page }) => {
    await sellBike.publishBtn.click();
    await expect(page.getByText("Brand is required")).toHaveText("Brand is required");
});

test('Verify validation when only brand is provided', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.publishBtn.click();
    await expect(page.getByText("Model is required")).toHaveText("Model is required");
});

test('Verify validation when brand and model are provided', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.publishBtn.click();
    await expect(page.getByText("Invalid year")).toHaveText("Invalid year");
});

test('Verify validation when brand, model, and year are provided', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");
    await sellBike.publishBtn.click();
    await expect(page.getByText("Original price required")).toHaveText("Original price required");
});

test('Verify validation when brand, model, year, and price are provided', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");
    await sellBike.originalPrice.fill("12000");
    await sellBike.publishBtn.click();
    await expect(page.getByText("Location is required")).toHaveText("Location is required");
});

test('Verify listing failure when mandatory fields are filled without km driven', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");

    await sellBike.originalPrice.clear();
    await sellBike.originalPrice.fill("12000");

    await sellBike.originalPrice.clear();
    await sellBike.location.fill("banglore");

    await sellBike.publishBtn.click();

    await expect(page.getByText("Failed to create listing").last())
        .toBeVisible({ timeout: 10000 });
});

test('Verify price estimation functionality for bike', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");

    await sellBike.originalPrice.clear();
    await sellBike.originalPrice.fill("12000");

    await sellBike.originalPrice.clear();
    await sellBike.location.fill("banglore");

    await sellBike.estimatorBtn.click();

    await expect(page.getByText("₹8,190").last())
        .toBeVisible({ timeout: 10000 });
});

test('Verify estimated price calculation without km driven', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2025");

    await sellBike.originalPrice.fill("200000");
    await sellBike.location.fill("banglore");

    await sellBike.estimatorBtn.click();

    await expect(page.getByText("₹1,78,500").last())
        .toBeVisible({ timeout: 10000 });
});

test('Verify estimated price calculation with km driven', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2025");

    await sellBike.originalPrice.fill("200000");
    await sellBike.location.fill("banglore");

    await sellBike.kmDriven.clear();
    await sellBike.kmDriven.fill("20000");

    await sellBike.estimatorBtn.click();
    await page.waitForTimeout(3000);

    await expect(page.getByText("₹1,70,000").last())
        .toBeVisible({ timeout: 10000 });
});

test('Verify successful listing without description', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");

    await sellBike.originalPrice.clear();
    await sellBike.originalPrice.fill("12000");

    await sellBike.originalPrice.clear();
    await sellBike.location.fill("banglore");

    await sellBike.kmDriven.clear();
    await sellBike.kmDriven.fill("20000");

    await sellBike.publishBtn.click();

    await expect(page).toHaveURL(/app/);
});

test('Verify successful listing with description', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");

    await sellBike.originalPrice.clear();
    await sellBike.originalPrice.fill("12000");

    await sellBike.originalPrice.clear();
    await sellBike.location.fill("banglore");

    await sellBike.kmDriven.clear();
    await sellBike.kmDriven.fill("20000");

    await sellBike.description.fill("filling discription");

    await sellBike.publishBtn.click();

    await expect(page).toHaveURL(/app/);
});

test('Verify successful listing with description and additional data', async ({ page }) => {
    await sellBike.brand.fill("honda");
    await sellBike.model.fill("Rx-100");
    await sellBike.year.fill("2023");

    await sellBike.originalPrice.clear();
    await sellBike.originalPrice.fill("12000");

    await sellBike.originalPrice.clear();
    await sellBike.location.fill("banglore");

    await sellBike.kmDriven.clear();
    await sellBike.kmDriven.fill("20000");

    await sellBike.description.fill("filling discription");

    await sellBike.publishBtn.click();

    await expect(page).toHaveURL(/app/);
});