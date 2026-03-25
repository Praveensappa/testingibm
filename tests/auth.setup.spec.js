// import { expect, test as setup } from '@playwright/test';

// setup('login and save state', async ({ page }) => {
//     await page.goto('http://bike-value-estimator--praveensappaoff.replit.app/');

//     const emailInput = await page.getByRole('textbox', { name: 'you@example.com' });
//     await emailInput.fill("peter@gmail.com");
//     const passwordInput = await page.locator('[name="password"]');
//     await passwordInput.fill("213721");
//     const signInBtn = page.getByRole('button', { name: 'Sign in' });
//     await signInBtn.click();
//     await expect(page).toHaveURL(/app/);

//     // await page.context().storageState({ path: './auth.json' });
// });