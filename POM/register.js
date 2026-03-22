import { expect } from '@playwright/test';

export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.fullname = page.locator('[placeholder="John Doe"]');
        this.email = page.locator('[placeholder="you@example.com"]').first();
        this.age = page.locator('input[placeholder="25"]');
        this.password = page.locator('input[name="password"]');
        this.createAccountBtn = page.locator('//button[text()="Create Account"]');

        this.errorMsg = page.locator('.text-sm.text-destructive.mt-1').first();
        this.passwordError = page.locator('//p[text()="Password must be at least 6 characters"]');
    }

    async goto() {
        await this.page.goto('http://bike-value-estimator--praveensappaoff.replit.app/register');
    }

    async enterFullName(name) {
        await this.fullname.fill(name);
    }

    async enterEmail(email) {
        await this.email.fill(email);
    }

    async enterAge(age) {
        await this.age.fill(age);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async clickCreateAccount() {
        await this.createAccountBtn.click();
    }

    async getErrorMessage() {
        return await this.errorMsg.textContent();
    }

    async getPasswordError() {
        return await this.passwordError.textContent();
    }
}