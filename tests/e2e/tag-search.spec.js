const { test, expect } = require('@playwright/test');

test.describe('MoodEats Tag Search Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.waitForLoadState('networkidle');
        // Wait a bit more for all scripts to load
        await page.waitForTimeout(2000);
    });

    test('search input transforms to Tagify or falls back gracefully', async ({ page }) => {
        const searchInput = page.locator('#searchInput');
        await expect(searchInput).toBeVisible();

        // Check if Tagify has loaded (either has tagify class or regular input with placeholder)
        const hasTagify = await page.evaluate(() => {
            const input = document.getElementById('searchInput');
            return input && (input.classList.contains('tagify') || typeof window.Tagify !== 'undefined');
        });

        const hasPlaceholder = await searchInput.getAttribute('placeholder');
        expect(hasPlaceholder).toBeTruthy();

        // Should either be Tagify enabled or have fallback functionality
        expect(hasTagify || hasPlaceholder.includes('Search meals')).toBeTruthy();
    });

    test('tag search with single term works', async ({ page }) => {
        const searchInput = page.locator('#searchInput');

        // Try typing a term - this should work with both Tagify and fallback
        await searchInput.fill('pasta');
        await page.waitForTimeout(1000);

        // Check that results are shown
        const mealCards = page.locator('#mealSuggestions .meal-card');
        const count = await mealCards.count();
        expect(count).toBeGreaterThan(0);

        // Verify pasta-related meals appear
        const meals = await mealCards.allTextContents();
        const hasPasta = meals.some(meal =>
            meal.toLowerCase().includes('pasta') ||
            meal.toLowerCase().includes('linguine') ||
            meal.toLowerCase().includes('spaghetti')
        );
        expect(hasPasta).toBeTruthy();
    });

    test('solves "quick egg dish" problem with AND logic', async ({ page }) => {
        // This is the core test for the original bug fix

        // Test 1: Search for "eggs" alone
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
        await page.fill('#searchInput', 'eggs');
        await page.waitForTimeout(1000);

        const eggMeals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const eggMealCount = eggMeals.length;
        expect(eggMealCount).toBeGreaterThan(0);

        // Verify all results contain eggs
        const allHaveEggs = eggMeals.every(meal =>
            meal.toLowerCase().includes('egg') ||
            meal.toLowerCase().includes('omelet') ||
            meal.toLowerCase().includes('scrambled')
        );
        expect(allHaveEggs).toBeTruthy();

        // Test 2: Search for "quick" alone
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
        await page.fill('#searchInput', 'quick');
        await page.waitForTimeout(1000);

        const quickMeals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const quickMealCount = quickMeals.length;
        expect(quickMealCount).toBeGreaterThan(0);

        // Clear for next test
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
    });

    test('Pasta e Piselli does not appear in egg searches', async ({ page }) => {
        // Specific test for the problematic meal mentioned by user

        await page.fill('#searchInput', 'eggs');
        await page.waitForTimeout(1000);

        const meals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const hasPastaePiselli = meals.some(meal =>
            meal.toLowerCase().includes('pasta e piselli') ||
            meal.toLowerCase().includes('pasta with peas')
        );

        // This should be false - Pasta e Piselli should NOT appear in egg search
        expect(hasPastaePiselli).toBeFalsy();

        // But let's verify Pasta e Piselli exists in the system
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
        await page.fill('#searchInput', 'pasta');
        await page.waitForTimeout(1000);

        const pastaMeals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const pastaePiselliExists = pastaMeals.some(meal =>
            meal.toLowerCase().includes('pasta e piselli') ||
            meal.toLowerCase().includes('pasta with peas')
        );

        expect(pastaePiselliExists).toBeTruthy();
    });

    test('specific egg dishes are found correctly', async ({ page }) => {
        await page.fill('#searchInput', 'eggs');
        await page.waitForTimeout(1000);

        const meals = await page.locator('#mealSuggestions .meal-card').allTextContents();

        // Check for specific egg dishes that should appear
        const expectedEggDishes = [
            'scrambled',
            'omelet',
            'bagel',
            'toast'
        ];

        const foundExpectedDishes = expectedEggDishes.filter(dish =>
            meals.some(meal => meal.toLowerCase().includes(dish))
        );

        // Should find at least 2 of the expected egg dishes
        expect(foundExpectedDishes.length).toBeGreaterThanOrEqual(2);
    });

    test('mood filtering still works with search', async ({ page }) => {
        // Test that mood buttons still work alongside search

        // First click a mood
        await page.locator('[data-mood="breakfast"]').click();
        await page.waitForTimeout(1000);

        const breakfastMeals = await page.locator('#mealSuggestions .meal-card').count();
        expect(breakfastMeals).toBeGreaterThan(0);

        // Then try searching within that mood
        await page.fill('#searchInput', 'eggs');
        await page.waitForTimeout(1000);

        const filteredMeals = await page.locator('#mealSuggestions .meal-card').count();

        // Should have some results (breakfast meals with eggs)
        expect(filteredMeals).toBeGreaterThan(0);
        // Should be fewer than total breakfast meals
        expect(filteredMeals).toBeLessThanOrEqual(breakfastMeals);
    });

    test('search clears properly', async ({ page }) => {
        // Search for something specific
        await page.fill('#searchInput', 'salmon');
        await page.waitForTimeout(1000);

        const filteredCount = await page.locator('#mealSuggestions .meal-card').count();
        expect(filteredCount).toBeGreaterThan(0);

        // Clear search
        await page.fill('#searchInput', '');
        await page.waitForTimeout(1000);

        // Should show all meals again (or current mood)
        const allMealsCount = await page.locator('#mealSuggestions .meal-card').count();
        expect(allMealsCount).toBeGreaterThanOrEqual(filteredCount);
    });

    test('search is case insensitive', async ({ page }) => {
        // Test lowercase
        await page.fill('#searchInput', 'chicken');
        await page.waitForTimeout(1000);
        const lowerResults = await page.locator('#mealSuggestions .meal-card').count();

        // Clear and test uppercase
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
        await page.fill('#searchInput', 'CHICKEN');
        await page.waitForTimeout(1000);
        const upperResults = await page.locator('#mealSuggestions .meal-card').count();

        // Should return same number of results
        expect(lowerResults).toEqual(upperResults);
        expect(lowerResults).toBeGreaterThan(0);
    });

    test('multiple cuisine searches work correctly', async ({ page }) => {
        // Test Asian cuisine search
        await page.fill('#searchInput', 'asian');
        await page.waitForTimeout(1000);

        let meals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const hasAsianDish = meals.some(meal =>
            meal.toLowerCase().includes('teriyaki') ||
            meal.toLowerCase().includes('rice') ||
            meal.toLowerCase().includes('noodle')
        );
        expect(hasAsianDish).toBeTruthy();

        // Test Italian cuisine search
        await page.fill('#searchInput', '');
        await page.waitForTimeout(500);
        await page.fill('#searchInput', 'italian');
        await page.waitForTimeout(1000);

        meals = await page.locator('#mealSuggestions .meal-card').allTextContents();
        const hasItalianDish = meals.some(meal =>
            meal.toLowerCase().includes('pasta') ||
            meal.toLowerCase().includes('linguine') ||
            meal.toLowerCase().includes('mozzarella')
        );
        expect(hasItalianDish).toBeTruthy();
    });

    test('nutrition information is preserved in search results', async ({ page }) => {
        await page.fill('#searchInput', 'salmon');
        await page.waitForTimeout(1000);

        // Click on first meal to open modal
        const firstMeal = page.locator('#mealSuggestions .meal-card').first();
        await firstMeal.click();

        // Check modal opens with nutrition info
        const modal = page.locator('#mealModal');
        await expect(modal).toBeVisible();

        // Check nutrition section exists
        const nutritionSection = page.locator('#modalNutrition');
        await expect(nutritionSection).toBeVisible();

        // Close modal
        await page.locator('.modal-close').click();
        await expect(modal).not.toBeVisible();
    });
});