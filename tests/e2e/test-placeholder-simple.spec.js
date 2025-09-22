const { test, expect } = require('@playwright/test');

test.describe('Simple Tagify Test', () => {
    test('check tagify input behavior', async ({ page }) => {
        // Navigate to the page
        await page.goto('http://localhost:8080');
        await page.waitForLoadState('networkidle');

        // Wait for Tagify to initialize
        await page.waitForTimeout(2000);

        // Take screenshot of initial state
        await page.screenshot({ path: 'placeholder-test-1-initial.png', fullPage: false });

        // Try to find and interact with the tagify container
        const tagifyContainer = await page.locator('.tagify').first();
        await tagifyContainer.click();

        // Take screenshot after clicking
        await page.screenshot({ path: 'placeholder-test-2-clicked.png', fullPage: false });

        // Type in the tagify input (it becomes available after click)
        await page.keyboard.type('peanut butter', { delay: 50 });

        // Take screenshot while typing
        await page.screenshot({ path: 'placeholder-test-3-typing.png', fullPage: false });

        // Check the visual result
        console.log('Screenshots saved to placeholder-test-*.png');
    });
});