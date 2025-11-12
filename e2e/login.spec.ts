import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {
  test.skip('should fail with invalid credentials and show an error message', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    const errorMessage = page.locator('p:text("Invalid credentials")');
    await expect(errorMessage).toBeVisible();
  });
});
