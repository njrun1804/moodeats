const { test } = require('@playwright/test');

test.describe('Safari Tagify Fix Test', () => {
    test('verify tags display correctly', async ({ page }) => {
        await page.goto('http://localhost:8081');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Click and type in tagify
        const tagify = await page.locator('.tagify').first();
        await tagify.click();

        // Type and select a tag
        await page.keyboard.type('chicken');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');

        // Take screenshot with tag
        await page.screenshot({ path: 'safari-fix-test.png', fullPage: false });

        console.log('Screenshot saved to safari-fix-test.png');
    });
});