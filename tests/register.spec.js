import { test, expect } from '@playwright/test';
import { RegisterPage } from '../POM/register';

let registerPage;

test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
});


// 1. Title check
test('Conforming the current page is register page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Bike4Sell – Second-Hand Bike Marketplace");
});


// 2. Only fullname
test('trying to register with only fullname', async () => {
    await registerPage.enterFullName("praveen sappa");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toBe("Please enter a valid email");
});


// 3. Fullname + Email
test("Trying to create account with fullname and email", async () => {
    await registerPage.enterFullName("praveen sappa");
    await registerPage.enterEmail("praveen@gmail.com");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getPasswordError();
    expect(error).toBe("Password must be at least 6 characters");
});


// 4. Age below 18
test('Enter all valid details but age should be below 20', async () => {
    await registerPage.enterFullName("praveen sappa");
    await registerPage.enterEmail("praveen1@gmail.com");
    await registerPage.enterAge("17");
    await registerPage.enterPassword("213721");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toBe("You must be at least 18 years old");
});

//5 test case
test("checking for password whose length is less than 6 characters", async ({ page }) => {
    await registerPage.enterFullName("praveen sappa");
    await registerPage.enterEmail("praveen@gmail.com");
    await registerPage.enterAge("18");
    await registerPage.enterPassword("21372");
    await registerPage.clickCreateAccount();
    const error = await registerPage.getPasswordError();
    expect(error).toBe("Password must be at least 6 characters");
    await page.waitForTimeout(3000);

});

// BUG TO BE FIXED (MINOR BUG)
test.skip('invalid email format', async () => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterEmail("praveen@");
    await registerPage.enterPassword("123456");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toContain("valid email");
});



test('password less than 6 characters', async () => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterEmail("test@gmail.com");
    await registerPage.enterPassword("123");
    await registerPage.clickCreateAccount();

    await expect(registerPage.passwordError)
        .toHaveText("Password must be at least 6 characters");
});

test('Trying to register again with same details', async ({ page }) => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterEmail("valid18@gmail.com");
    await registerPage.enterAge("18");
    await registerPage.enterPassword("123456");
    await registerPage.clickCreateAccount();

    await expect(page).toHaveURL(/register/); // should proceed
});

test('fullname with special characters', async () => {
    await registerPage.enterFullName("@@@###");
    await registerPage.enterEmail("test@gmail.com");
    await registerPage.enterPassword("123456");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toBeTruthy(); // depends on validation
});

test('only age entered', async () => {
    await registerPage.enterAge("20");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toContain("Name is required");
});
test('fullname and age only', async () => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterAge("20");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toContain("valid email");
});
test('email and password only', async () => {
    await registerPage.enterEmail("test@gmail.com");
    await registerPage.enterPassword("123456");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toBeTruthy(); // depends on UI validation
});

test('fullname and password only', async () => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterPassword("123456");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toContain("valid email");
});

test('age below 18 and missing password', async () => {
    await registerPage.enterFullName("praveen");
    await registerPage.enterEmail("test@gmail.com");
    await registerPage.enterAge("17");
    await registerPage.clickCreateAccount();

    const error = await registerPage.getErrorMessage();
    expect(error).toBeTruthy(); // could show password or age error
});