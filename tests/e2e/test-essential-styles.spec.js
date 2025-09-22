const { test } = require('@playwright/test');

test.describe('Essential Styles Test', () => {
    test('verify tags display with proper colors', async ({ page }) => {
        await page.goto('http://localhost:8082');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Click and type in tagify
        const tagify = await page.locator('.tagify').first();
        await tagify.click();

        // Type and select a tag
        await page.keyboard.type('bagel');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');

        // Take screenshot
        await page.screenshot({ path: 'essential-styles-test.png', fullPage: false });

        console.log('Screenshot saved to essential-styles-test.png');
    });
});