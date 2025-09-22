const { test, expect } = require('@playwright/test');

test.describe('Tagify Clean Test', () => {
    test('verify text is visible when typing', async ({ page }) => {
        await page.goto('http://localhost:8080');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Click on the tagify container to focus
        const tagify = await page.locator('.tagify').first();
        await tagify.click();

        // Type some text
        await page.keyboard.type('capers', { delay: 50 });

        // Take screenshot to verify visibility
        await page.screenshot({ path: 'tagify-clean-typing.png', fullPage: false });

        console.log('Screenshot saved to tagify-clean-typing.png');
    });
});