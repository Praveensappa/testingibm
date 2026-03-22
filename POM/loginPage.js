import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators (same as your code)
        this.emailInput = page.getByRole('textbox', { name: 'you@example.com' });
        this.passwordInput = page.locator('[name="password"]');
        this.signInBtn = page.getByRole('button', { name: 'Sign in' });
        this.errorMsg = page.locator('.text-sm.text-destructive.mt-1');
        this.createAccountLink = page.locator('a[href="/register"]').last();
        this.signupLink = page.locator('a[href="/register"]').first();
        this.priceEstimator = page.locator('.rounded-full.text-sm.font-medium.transition-all.duration-200').last();
        this.contactBtn = page.locator('.rounded-full.text-sm.font-medium.transition-all.duration-200').first();
        // this.createaccount=page.
        this.copyrightText = page.locator('p').last();
    }

    async goto() {
        await this.page.goto('http://bike-value-estimator--praveensappaoff.replit.app/');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInBtn.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async getErrorMessage() {
        return await this.errorMsg.textContent();
    }
    async clickCreateAccount() {
        await this.createAccountLink.click();
    }
    async clickSignup() {
        await this.signupLink.click();
    }

    getPriceEstimator() {
        return this.priceEstimator;
    }

    getContactBtn() {
        return this.contactBtn;
    }
    getCopyrightText() {
        return this.copyrightText;
    }

}