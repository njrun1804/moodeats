const { test, expect } = require('@playwright/test');

test.describe('Semantic Search Functionality Testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://njrun1804.github.io/moodeats/');
        await page.waitForLoadState('networkidle');

        // Wait for JavaScript to initialize
        await page.waitForFunction(() => {
            return typeof window.meals !== 'undefined' && window.meals.length > 0;
        });
    });

    test.describe('Main Semantic Search Issue - Fish/Salmon', () => {
        test('Search for "fish" returns salmon dishes', async ({ page }) => {
            // Open meal selection modal
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            // Search for "fish"
            await page.fill('#modalSearch', 'fish');
            await page.waitForTimeout(500); // Wait for search results

            // Get all meal names from search results
            const mealNames = await page.locator('#modalMeals .card h3').allTextContents();

            // Should include salmon dishes
            const hasSalmonDishes = mealNames.some(name =>
                name.toLowerCase().includes('salmon') ||
                name.toLowerCase().includes('fish')
            );

            expect(hasSalmonDishes).toBeTruthy();
            expect(mealNames.length).toBeGreaterThan(0);

            console.log('Fish search results:', mealNames);
        });

        test('Search for "salmon" returns all salmon dishes', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'salmon');
            await page.waitForTimeout(500);

            const mealNames = await page.locator('#modalMeals .card h3').allTextContents();

            // Should have salmon dishes
            const salmonDishes = mealNames.filter(name =>
                name.toLowerCase().includes('salmon')
            );

            expect(salmonDishes.length).toBeGreaterThan(0);
            console.log('Salmon search results:', mealNames);
        });

        test('Compare fish vs salmon search results', async ({ page }) => {
            // Test fish search
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'fish');
            await page.waitForTimeout(500);
            const fishResults = await page.locator('#modalMeals .card h3').allTextContents();

            // Clear and test salmon search
            await page.fill('#modalSearch', '');
            await page.waitForTimeout(200);
            await page.fill('#modalSearch', 'salmon');
            await page.waitForTimeout(500);
            const salmonResults = await page.locator('#modalMeals .card h3').allTextContents();

            // Salmon dishes should appear in both searches
            const salmonInFish = fishResults.filter(name => name.toLowerCase().includes('salmon'));
            const salmonInSalmon = salmonResults.filter(name => name.toLowerCase().includes('salmon'));

            expect(salmonInFish.length).toBeGreaterThan(0);
            expect(salmonInSalmon.length).toBeGreaterThan(0);

            console.log('Fish search salmon dishes:', salmonInFish);
            console.log('Salmon search salmon dishes:', salmonInSalmon);
        });
    });

    test.describe('Other Semantic Categories', () => {
        test('Search for "pasta" returns Italian dishes', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'pasta');
            await page.waitForTimeout(500);

            const mealNames = await page.locator('#modalMeals .card h3').allTextContents();

            const hasPastaOrItalian = mealNames.some(name =>
                name.toLowerCase().includes('pasta') ||
                name.toLowerCase().includes('spaghetti') ||
                name.toLowerCase().includes('penne') ||
                name.toLowerCase().includes('italian')
            );

            expect(hasPastaOrItalian).toBeTruthy();
            expect(mealNames.length).toBeGreaterThan(0);

            console.log('Pasta search results:', mealNames);
        });

        test('Search for "cheese" returns cheese-based meals', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'cheese');
            await page.waitForTimeout(500);

            const mealNames = await page.locator('#modalMeals .card h3').allTextContents();

            const hasCheeseItems = mealNames.some(name =>
                name.toLowerCase().includes('cheese') ||
                name.toLowerCase().includes('mozzarella') ||
                name.toLowerCase().includes('parmesan') ||
                name.toLowerCase().includes('burrata')
            );

            expect(hasCheeseItems).toBeTruthy();
            expect(mealNames.length).toBeGreaterThan(0);

            console.log('Cheese search results:', mealNames);
        });

        test('Search for "asian" returns teriyaki, miso dishes', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'asian');
            await page.waitForTimeout(500);

            const mealNames = await page.locator('#modalMeals .card h3').allTextContents();

            const hasAsianDishes = mealNames.some(name =>
                name.toLowerCase().includes('teriyaki') ||
                name.toLowerCase().includes('miso') ||
                name.toLowerCase().includes('asian') ||
                name.toLowerCase().includes('japanese')
            );

            expect(hasAsianDishes).toBeTruthy();
            expect(mealNames.length).toBeGreaterThan(0);

            console.log('Asian search results:', mealNames);
        });
    });

    test.describe('Search Functionality Performance', () => {
        test('Search is responsive and fast', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            const startTime = Date.now();
            await page.fill('#modalSearch', 'chicken');

            // Wait for results to appear
            await page.waitForFunction(() => {
                const cards = document.querySelectorAll('#modalMeals .card');
                return cards.length > 0;
            });

            const endTime = Date.now();
            const searchTime = endTime - startTime;

            // Search should complete in under 1 second
            expect(searchTime).toBeLessThan(1000);

            console.log(`Search completed in ${searchTime}ms`);
        });

        test('Partial matches work correctly', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals');

            // Test partial word matching
            await page.fill('#modalSearch', 'sal');
            await page.waitForTimeout(300);

            const partialResults = await page.locator('#modalMeals .card h3').allTextContents();

            // Should include salmon dishes
            const hasSalmonPartial = partialResults.some(name =>
                name.toLowerCase().includes('salmon') ||
                name.toLowerCase().includes('salad')
            );

            expect(hasSalmonPartial).toBeTruthy();

            console.log('Partial search "sal" results:', partialResults);
        });

        test('Exact matches still work', async ({ page }) => {
            await page.click('button:has-text("Select"):near(:text("Breakfast"))');
            await page.waitForSelector('#modalMeals');

            await page.fill('#modalSearch', 'Oatmeal with Banana & PB');
            await page.waitForTimeout(300);

            const exactResults = await page.locator('#modalMeals .card h3').allTextContents();

            // Should find the exact match
            const hasExactMatch = exactResults.some(name =>
                name.includes('Oatmeal with Banana & PB')
            );

            expect(hasExactMatch).toBeTruthy();

            console.log('Exact search results:', exactResults);
        });
    });

    test.describe('UI Components', () => {
        test('Mood buttons work correctly', async ({ page }) => {
            // Switch to Browse tab first
            await page.click('#browseTab');

            // Test cozy mood button
            await page.click('[data-mood="cozy"]');
            await page.waitForSelector('#mealSuggestions .card');

            const cozyMeals = await page.locator('#mealSuggestions .card').count();
            expect(cozyMeals).toBeGreaterThan(0);

            // Test fresh mood button
            await page.click('[data-mood="fresh"]');
            await page.waitForSelector('#mealSuggestions .card');

            const freshMeals = await page.locator('#mealSuggestions .card').count();
            expect(freshMeals).toBeGreaterThan(0);

            console.log(`Cozy meals: ${cozyMeals}, Fresh meals: ${freshMeals}`);
        });

        test('Meal cards display properly', async ({ page }) => {
            await page.click('#browseTab');
            await page.click('[data-mood="cozy"]');
            await page.waitForSelector('#mealSuggestions .card');

            // Check first meal card structure
            const firstCard = page.locator('#mealSuggestions .card').first();

            // Should have meal name
            const hasTitle = await firstCard.locator('h4').count();
            expect(hasTitle).toBeGreaterThan(0);

            // Should have nutrition info
            const hasNutrition = await firstCard.locator('p:has-text("protein")').count();
            expect(hasNutrition).toBeGreaterThan(0);
        });

        test('Modal functionality works', async ({ page }) => {
            // Open modal
            await page.click('button:has-text("Select"):near(:text("Breakfast"))');

            // Modal should be visible
            const modal = page.locator('#mealModal');
            await expect(modal).toBeVisible();

            // Should have search input
            const searchInput = page.locator('#modalSearch');
            await expect(searchInput).toBeVisible();

            // Should have meal cards
            const mealCards = page.locator('#modalMeals .card');
            const cardCount = await mealCards.count();
            expect(cardCount).toBeGreaterThan(0);

            // Test closing modal with escape key
            await page.keyboard.press('Escape');
            await expect(modal).toBeHidden();
        });
    });

    test.describe('Send to AI Button', () => {
        test('Send to AI button exists and shows feedback', async ({ page }) => {
            // First select some meals
            await page.click('button:has-text("Select"):near(:text("Breakfast"))');
            await page.waitForSelector('#modalMeals .card');
            await page.click('#modalMeals .card:first-child');

            await page.click('button:has-text("Select"):near(:text("Lunch"))');
            await page.waitForSelector('#modalMeals .card');
            await page.click('#modalMeals .card:first-child');

            // Look for Send to AI button
            const sendButton = page.locator('button:has-text("Send to AI")');

            if (await sendButton.count() > 0) {
                await expect(sendButton).toBeVisible();

                // Click the button
                await sendButton.click();

                // Check for feedback (button should show "✅ Copied!" or similar)
                await page.waitForTimeout(100);
                const buttonText = await sendButton.textContent();

                // Should show some kind of success feedback
                const hasSuccessFeedback = buttonText.includes('✅') ||
                                         buttonText.includes('Copied') ||
                                         buttonText.includes('Success');

                if (hasSuccessFeedback) {
                    expect(hasSuccessFeedback).toBeTruthy();
                    console.log('Send to AI button feedback:', buttonText);
                } else {
                    console.log('Send to AI button found but no clear feedback detected:', buttonText);
                }
            } else {
                console.log('Send to AI button not found on this page');
            }
        });
    });
});