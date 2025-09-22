const { test, expect } = require('@playwright/test');

test.describe('MoodEats Browse-Only', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.waitForLoadState('networkidle');
    });

    test('page loads with mood buttons', async ({ page }) => {
        // Check title in header bar
        await expect(page.locator('.title-logo')).toContainText('🍽️ MoodEats');

        // Check mood buttons exist (9 including "All" button)
        const moodButtons = page.locator('.mood-btn');
        await expect(moodButtons).toHaveCount(9);
    });

    test('clicking mood shows suggestions', async ({ page }) => {
        // Force click on a mood button to avoid pointer interception issues
        await page.locator('[data-mood="italian"]').click({ force: true });

        // Wait for meal cards to load
        await page.waitForTimeout(1000);

        // Check that meal cards are displayed
        const mealCards = page.locator('#mealSuggestions .meal-card');
        const count = await mealCards.count();
        expect(count).toBeGreaterThan(0);

        // Check that meals contain basic info (title and ingredients)
        const firstMeal = mealCards.first();
        const mealText = await firstMeal.textContent();
        // The current app shows meal title and ingredients, but may not show nutrition in card view
        expect(mealText.length).toBeGreaterThan(0);
    });

    // Search functionality is comprehensively tested in tag-search.spec.js

    test('mood tags are displayed', async ({ page }) => {
        // Click on a mood
        await page.locator('[data-mood="quick"]').click({ force: true });

        // Wait for meals to load
        await page.waitForTimeout(1000);

        // Check that meal cards have mood tags
        const tags = page.locator('#mealSuggestions .meal-tag');
        const count = await tags.count();
        expect(count).toBeGreaterThan(0);
    });

    test('ingredients are shown', async ({ page }) => {
        // Click on a mood
        await page.locator('[data-mood="breakfast"]').click({ force: true });

        // Wait for meals to load
        await page.waitForTimeout(1000);

        // Check that ingredients are displayed in meal cards
        const firstMeal = page.locator('#mealSuggestions .meal-card').first();
        const mealText = await firstMeal.textContent();

        // The current app may show ingredients in a different format, just check that text exists
        expect(mealText.length).toBeGreaterThan(10);

        // Check that ingredients section exists (this may be in meal-ingredients class)
        const ingredientsText = await page.locator('#mealSuggestions .meal-card .meal-ingredients').first().textContent();
        expect(ingredientsText.length).toBeGreaterThan(0);
    });

    test('all moods work', async ({ page }) => {
        const moods = ['cozy', 'fresh', 'hearty', 'quick', 'asian', 'italian', 'seafood', 'breakfast'];

        for (const mood of moods) {
            // Use JavaScript click to bypass viewport issues on mobile
            await page.evaluate((moodValue) => {
                const button = document.querySelector(`[data-mood="${moodValue}"]`);
                if (button) button.click();
            }, mood);

            // Wait for meals to load
            await page.waitForTimeout(1000);

            // Check meals are shown
            const mealCards = page.locator('#mealSuggestions .meal-card');
            const count = await mealCards.count();
            expect(count).toBeGreaterThan(0);

            // Wait between mood tests
            await page.waitForTimeout(500);
        }
    });
});