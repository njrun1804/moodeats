// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Simple Smoke Tests - Browse Only', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await expect(page).toHaveTitle(/MoodEats/);
  });

  test('meals eventually load', async ({ page }) => {
    await page.goto('http://localhost:8000');

    // First wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();

    // Wait a bit for JavaScript initialization
    await page.waitForTimeout(1000);

    // Test that meals can be loaded by clicking a mood button
    await page.click('[data-mood="fresh"]', { force: true });
    await page.waitForTimeout(1000);

    // Check if meal cards are displayed
    const mealCards = page.locator('#mealSuggestions .meal-card');
    const cardCount = await mealCards.count();

    console.log(`Meals loaded: ${cardCount} meal cards visible`);
    expect(cardCount).toBeGreaterThan(0);
  });

  test('search input exists and is accessible', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('domcontentloaded');

    // Check if search input exists and is visible in browse-only version
    const searchInput = page.locator('#searchInput');
    await expect(searchInput).toBeAttached();
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder');

    // Test that it's functional
    await searchInput.fill('test');
    const value = await searchInput.inputValue();
    expect(value).toBe('test');
  });

  test('mood buttons exist and are functional', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('domcontentloaded');

    // Check if mood buttons exist and are visible in browse-only version
    const moodButtons = page.locator('.mood-btn');
    const buttonCount = await moodButtons.count();
    expect(buttonCount).toBeGreaterThanOrEqual(8);

    // Verify first button is visible and functional
    const firstButton = moodButtons.first();
    await expect(firstButton).toBeVisible();

    // Try clicking a button to test functionality
    await firstButton.click({ force: true });
    await page.waitForTimeout(500);

    // Verify buttons have expected attributes
    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = moodButtons.nth(i);
      await expect(button).toHaveAttribute('data-mood');
    }
  });
});