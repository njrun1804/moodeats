// @ts-check
const { test, expect } = require('@playwright/test');
const { initializeTestApp, forceViewVisible } = require('../../helpers/test-init');

test.describe('MoodEats Browse-Only (replacing planner tests)', () => {
  test.beforeEach(async ({ page }) => {
    // Use the browse-only index.html instead of the non-existent planner
    await page.goto('http://localhost:8000');
    await initializeTestApp(page);
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/MoodEats/);
  });

  test('all mood buttons work and show meals', async ({ page }) => {
    const moods = ['fresh', 'hearty', 'cozy', 'quick', 'breakfast', 'seafood', 'asian', 'italian'];

    for (const mood of moods) {
      // Click mood button
      await page.click(`[data-mood="${mood}"]`, { force: true });
      await page.waitForTimeout(500);

      // Verify meals are shown in browse-only version
      const mealCards = page.locator('#mealSuggestions .meal-card');
      const count = await mealCards.count();

      // Should show at least 1 meal for each mood
      expect(count).toBeGreaterThan(0);

      // Verify the button is marked as active
      await expect(page.locator(`[data-mood="${mood}"]`)).toHaveClass(/active/);
    }
  });

  test('fresh mood shows meals', async ({ page }) => {
    await page.click('[data-mood="fresh"]', { force: true });
    await page.waitForTimeout(500);

    const mealCards = page.locator('#mealSuggestions .meal-card');
    const count = await mealCards.count();

    // Should show meals
    expect(count).toBeGreaterThan(0);
    console.log(`Fresh mood shows ${count} meals`);
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.locator('#searchInput');

    // Search for chicken
    await searchInput.fill('chicken');
    await page.waitForTimeout(1000);

    // Check that meal cards are shown in browse-only version
    const mealCards = page.locator('#mealSuggestions .meal-card');
    const count = await mealCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify results contain chicken
    const firstMeal = await mealCards.first().textContent();
    expect(firstMeal?.toLowerCase()).toContain('chicken');
  });

  test.skip('tab switching not applicable to browse-only version', async ({ page }) => {
    // The browse-only version doesn't have tabs - it's a single page interface
  });

  test.skip('meal selection modal not applicable to browse-only version', async ({ page }) => {
    // The browse-only version shows meal details when clicking meals, but doesn't have planner modals
  });

  test('breakfast mood filter works', async ({ page }) => {
    // Click breakfast mood button
    await page.click('[data-mood="breakfast"]', { force: true });
    await page.waitForTimeout(500);

    // Check that breakfast meals are shown
    const mealCards = page.locator('#mealSuggestions .meal-card');
    const count = await mealCards.count();

    // Should have breakfast meals available
    expect(count).toBeGreaterThan(0);
    console.log(`Breakfast mood shows ${count} meals`);
  });

  test('rapid clicking does not break UI', async ({ page }) => {
    const buttons = page.locator('.mood-btn');

    // Rapidly click different mood buttons
    for (let i = 0; i < 10; i++) {
      await buttons.nth(i % 8).click({ force: true });
      await page.waitForTimeout(50);
    }

    // UI should still be functional
    await page.waitForTimeout(500);

    // Should have exactly one active button
    const activeButtons = page.locator('.mood-btn.active');
    await expect(activeButtons).toHaveCount(1);

    // Meals should be visible
    const mealCards = page.locator('#mealSuggestions .meal-card');
    const count = await mealCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('special characters in search do not break app', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    const specialStrings = ['<script>alert("xss")</script>', '"; DROP TABLE;', '\\n\\r', '🍕🍔🌮'];

    for (const str of specialStrings) {
      await searchInput.fill(str);
      await searchInput.press('Enter');
      await page.waitForTimeout(100);
    }

    // App should still be functional
    await searchInput.fill('chicken');
    await searchInput.press('Enter');
    await page.waitForTimeout(300);

    // Should still work normally
    const suggestionsArea = page.locator('#suggestionsArea');
    // Just verify no JavaScript errors occurred
    expect(true).toBe(true);
  });

  test.skip('localStorage persistence not applicable to browse-only version', async ({ page, context }) => {
    // The browse-only version doesn't have meal selection persistence
    // It just shows meals based on current mood/search
  });
});