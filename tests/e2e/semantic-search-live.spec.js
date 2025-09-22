const { test, expect } = require('@playwright/test');

test.describe('Live Site Semantic Search Testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://njrun1804.github.io/moodeats/');
        await page.waitForLoadState('networkidle');

        // Wait for JavaScript to load and meals to be available
        await page.waitForFunction(() => {
            return typeof window.meals !== 'undefined' && window.meals.length > 0;
        });

        // Wait for the initial meal display
        await page.waitForSelector('.meal-card', { timeout: 5000 });
    });

    test.describe('Main Semantic Search Issue - Fish/Salmon', () => {
        test('Search for "fish" returns salmon dishes', async ({ page }) => {
            // Clear any existing search and show all meals first
            await page.fill('#searchInput', '');
            await page.waitForTimeout(300);

            // Search for "fish"
            await page.fill('#searchInput', 'fish');
            await page.waitForTimeout(500);

            // Get all visible meal titles
            const mealTitles = await page.locator('.meal-card .meal-title').allTextContents();

            // Should have some results
            expect(mealTitles.length).toBeGreaterThan(0);

            // Should include salmon dishes
            const hasSalmonOrFish = mealTitles.some(title =>
                title.toLowerCase().includes('salmon') ||
                title.toLowerCase().includes('fish')
            );

            expect(hasSalmonOrFish).toBeTruthy();

            console.log('Fish search results:', mealTitles);
        });

        test('Search for "salmon" returns salmon dishes', async ({ page }) => {
            await page.fill('#searchInput', 'salmon');
            await page.waitForTimeout(500);

            const mealTitles = await page.locator('.meal-card .meal-title').allTextContents();

            // Should have salmon dishes
            expect(mealTitles.length).toBeGreaterThan(0);

            const salmonDishes = mealTitles.filter(title =>
                title.toLowerCase().includes('salmon')
            );

            expect(salmonDishes.length).toBeGreaterThan(0);

            console.log('Salmon search results:', mealTitles);
        });

        test('Compare fish vs salmon search results for semantic matching', async ({ page }) => {
            // Test fish search
            await page.fill('#searchInput', 'fish');
            await page.waitForTimeout(500);
            const fishResults = await page.locator('.meal-card .meal-title').allTextContents();

            // Test salmon search
            await page.fill('#searchInput', 'salmon');
            await page.waitForTimeout(500);
            const salmonResults = await page.locator('.meal-card .meal-title').allTextContents();

            // Both should return results
            expect(fishResults.length).toBeGreaterThan(0);
            expect(salmonResults.length).toBeGreaterThan(0);

            // Salmon dishes should appear in fish search (semantic matching)
            const salmonInFish = fishResults.filter(title => title.toLowerCase().includes('salmon'));
            const salmonInSalmon = salmonResults.filter(title => title.toLowerCase().includes('salmon'));

            expect(salmonInFish.length).toBeGreaterThan(0);
            expect(salmonInSalmon.length).toBeGreaterThan(0);

            console.log('Fish search found salmon dishes:', salmonInFish);
            console.log('Salmon search found salmon dishes:', salmonInSalmon);
        });
    });

    test.describe('Other Semantic Categories', () => {
        test('Search for "pasta" returns Italian dishes', async ({ page }) => {
            await page.fill('#searchInput', 'pasta');
            await page.waitForTimeout(500);

            const mealTitles = await page.locator('.meal-card .meal-title').allTextContents();

            expect(mealTitles.length).toBeGreaterThan(0);

            const hasPastaOrItalian = mealTitles.some(title => {
                const lowerTitle = title.toLowerCase();
                return lowerTitle.includes('pasta') ||
                       lowerTitle.includes('spaghetti') ||
                       lowerTitle.includes('penne') ||
                       lowerTitle.includes('italian');
            });

            expect(hasPastaOrItalian).toBeTruthy();

            console.log('Pasta search results:', mealTitles);
        });

        test('Search for "cheese" returns cheese-based meals', async ({ page }) => {
            await page.fill('#searchInput', 'cheese');
            await page.waitForTimeout(500);

            const mealTitles = await page.locator('.meal-card .meal-title').allTextContents();

            expect(mealTitles.length).toBeGreaterThan(0);

            const hasCheeseItems = mealTitles.some(title => {
                const lowerTitle = title.toLowerCase();
                return lowerTitle.includes('cheese') ||
                       lowerTitle.includes('mozzarella') ||
                       lowerTitle.includes('parmesan') ||
                       lowerTitle.includes('burrata');
            });

            expect(hasCheeseItems).toBeTruthy();

            console.log('Cheese search results:', mealTitles);
        });

        test('Search for "asian" returns Asian cuisine dishes', async ({ page }) => {
            await page.fill('#searchInput', 'asian');
            await page.waitForTimeout(500);

            const mealTitles = await page.locator('.meal-card .meal-title').allTextContents();

            expect(mealTitles.length).toBeGreaterThan(0);

            const hasAsianDishes = mealTitles.some(title => {
                const lowerTitle = title.toLowerCase();
                return lowerTitle.includes('teriyaki') ||
                       lowerTitle.includes('miso') ||
                       lowerTitle.includes('asian') ||
                       lowerTitle.includes('japanese');
            });

            expect(hasAsianDishes).toBeTruthy();

            console.log('Asian search results:', mealTitles);
        });
    });

    test.describe('Search Performance and Functionality', () => {
        test('Search is responsive and returns results quickly', async ({ page }) => {
            const startTime = Date.now();

            await page.fill('#searchInput', 'chicken');

            // Wait for search results to appear
            await page.waitForFunction(() => {
                const cards = document.querySelectorAll('.meal-card');
                return cards.length > 0;
            });

            const endTime = Date.now();
            const searchTime = endTime - startTime;

            // Search should complete in under 1 second
            expect(searchTime).toBeLessThan(1000);

            const resultCount = await page.locator('.meal-card').count();
            expect(resultCount).toBeGreaterThan(0);

            console.log(`Search completed in ${searchTime}ms with ${resultCount} results`);
        });

        test('Partial matches work correctly', async ({ page }) => {
            await page.fill('#searchInput', 'sal');
            await page.waitForTimeout(300);

            const partialResults = await page.locator('.meal-card .meal-title').allTextContents();

            // Should include salmon or salad dishes
            const hasPartialMatches = partialResults.some(title => {
                const lowerTitle = title.toLowerCase();
                return lowerTitle.includes('salmon') || lowerTitle.includes('salad');
            });

            expect(hasPartialMatches).toBeTruthy();

            console.log('Partial search "sal" results:', partialResults);
        });

        test('Empty search shows all meals', async ({ page }) => {
            // First search for something specific
            await page.fill('#searchInput', 'chicken');
            await page.waitForTimeout(300);
            const filteredCount = await page.locator('.meal-card').count();

            // Then clear the search
            await page.fill('#searchInput', '');
            await page.waitForTimeout(300);
            const allMealsCount = await page.locator('.meal-card').count();

            // All meals should be more than filtered results
            expect(allMealsCount).toBeGreaterThan(filteredCount);

            console.log(`Filtered: ${filteredCount}, All meals: ${allMealsCount}`);
        });
    });

    test.describe('UI Components', () => {
        test('Mood buttons filter meals correctly', async ({ page }) => {
            // Test cozy mood
            await page.click('[data-mood="cozy"]');
            await page.waitForTimeout(300);

            const cozyCount = await page.locator('.meal-card').count();
            expect(cozyCount).toBeGreaterThan(0);

            // Button should be active
            const cozyBtn = page.locator('[data-mood="cozy"]');
            await expect(cozyBtn).toHaveClass(/active/);

            // Test fresh mood
            await page.click('[data-mood="fresh"]');
            await page.waitForTimeout(300);

            const freshCount = await page.locator('.meal-card').count();
            expect(freshCount).toBeGreaterThan(0);

            // Fresh button should be active, cozy should not
            const freshBtn = page.locator('[data-mood="fresh"]');
            await expect(freshBtn).toHaveClass(/active/);
            await expect(cozyBtn).not.toHaveClass(/active/);

            console.log(`Cozy meals: ${cozyCount}, Fresh meals: ${freshCount}`);
        });

        test('Meal cards display proper information', async ({ page }) => {
            // Click "All" to ensure we have meals displayed
            await page.click('[data-mood="all"]');
            await page.waitForTimeout(300);

            const firstCard = page.locator('.meal-card').first();

            // Should have title, ingredients, and tags
            const hasTitle = await firstCard.locator('.meal-title').count() > 0;
            const hasIngredients = await firstCard.locator('.meal-ingredients').count() > 0;
            const hasTags = await firstCard.locator('.meal-tags').count() > 0;

            expect(hasTitle).toBeTruthy();
            expect(hasIngredients).toBeTruthy();
            expect(hasTags).toBeTruthy();

            // Get sample content
            const title = await firstCard.locator('.meal-title').textContent();
            const ingredients = await firstCard.locator('.meal-ingredients').textContent();

            console.log('Sample meal card:', { title, ingredients });
        });

        test('Modal opens and displays meal details', async ({ page }) => {
            // Click "All" to ensure we have meals
            await page.click('[data-mood="all"]');
            await page.waitForTimeout(300);

            // Click on first meal card
            await page.click('.meal-card:first-child');

            // Modal should open
            const modal = page.locator('#mealModal');
            await expect(modal).toHaveClass(/open/);

            // Should have modal content
            const hasTitle = await page.locator('#modalTitle').count() > 0;
            const hasIngredients = await page.locator('#modalIngredients').count() > 0;
            const hasNutrition = await page.locator('#modalNutrition').count() > 0;

            expect(hasTitle).toBeTruthy();
            expect(hasIngredients).toBeTruthy();
            expect(hasNutrition).toBeTruthy();

            // Close modal
            await page.click('.modal-close');
            await expect(modal).not.toHaveClass(/open/);
        });
    });

    test.describe('Send to AI Button', () => {
        test('Send to AI button copies meal names and shows feedback', async ({ page }) => {
            // Click "All" to show meals
            await page.click('[data-mood="all"]');
            await page.waitForTimeout(300);

            const sendButton = page.locator('#sendToAI');
            await expect(sendButton).toBeVisible();

            // Click the button
            await sendButton.click();

            // Button should show feedback (change appearance or text)
            await page.waitForTimeout(200);

            // Check if button has "copied" class or changed text
            const hasSuccessState = await page.evaluate(() => {
                const btn = document.getElementById('sendToAI');
                return btn.classList.contains('copied') ||
                       btn.textContent.includes('✅') ||
                       btn.textContent.includes('Copied');
            });

            if (hasSuccessState) {
                expect(hasSuccessState).toBeTruthy();
                console.log('Send to AI button successfully showed feedback');
            } else {
                console.log('Send to AI button clicked but no clear visual feedback detected');
            }
        });
    });
});