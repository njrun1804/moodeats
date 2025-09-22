const { test, expect } = require('@playwright/test');

test.describe('Tagify Placeholder Test', () => {
    test('placeholder should not overlap with typed text', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.waitForLoadState('networkidle');

        // Take initial screenshot
        await page.screenshot({ path: 'test-results/1-initial.png' });

        // Click on the search input
        const tagifyInput = page.locator('.tagify__input');
        await tagifyInput.click();

        // Take screenshot after clicking
        await page.screenshot({ path: 'test-results/2-after-click.png' });

        // Type "peanut butter" slowly
        await tagifyInput.type('peanut butter', { delay: 100 });

        // Take screenshot while typing
        await page.screenshot({ path: 'test-results/3-while-typing.png' });

        // Wait a moment
        await page.waitForTimeout(1000);

        // Take final screenshot
        await page.screenshot({ path: 'test-results/4-final.png' });

        // Check that placeholder is not visible when there's text
        const placeholderVisible = await page.evaluate(() => {
            const input = document.querySelector('.tagify__input');
            if (!input) return false;
            const beforeContent = window.getComputedStyle(input, '::before');
            return beforeContent.opacity !== '0' && beforeContent.display !== 'none';
        });

        expect(placeholderVisible).toBe(false);
    });
});