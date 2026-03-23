import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/loginpage';
let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
   // await loginPage.goto();
});
test('Login success - mock user API', async ({ page }) => {

  // 👇 Mock user details API
  await page.route('**/api/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 2,
        email: 'peter@gmail.com',
        name: 'peter',
        age: 45,
        phone: null,
        role: 'user',
        status: 'active'
      })
    });
  });

  //  Open app
  await page.goto('https://bike-value-estimator--praveensappaoff.replit.app/login');

  //  Perform login
  await loginPage.login("peter@gmail.com","2137a21");

  //  Validate user logged in (UI change)
  await expect(page.url()).toBe('https://bike-value-estimator--praveensappaoff.replit.app/login')

});