import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dashBoardpage';

let dashboard;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');
    await expect(page).toHaveURL(/app/);
   // const estimator= page.locator('nav').nth(6);
  
});

test('test', async ({ page }) => {
   await  page.goto('https://bike-value-estimator--praveensappaoff.replit.app/')
   const es = page.getByRole('link', {name: 'Estimator'});
    const estimator = page.locator('svg[xmlns="http://www.w3.org/2000/svg"]').nth(1);
    console.log(es);
await es.click();
  console.log(await es.textContent());
//  console.log(page.url());
    expect(page.url()).toBe("https://bike-value-estimator--praveensappaoff.replit.app/price-estimator");

})

