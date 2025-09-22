// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Real User Behavior Test - Browse Only', () => {
  test('actually click buttons like a real user would', async ({ page }) => {
    console.log('🌐 Opening the local browse-only site...');
    await page.goto('http://localhost:8000');

    // Wait for page to fully load like a user would
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // VERIFY: Browse-only app is ready - check that mood buttons are visible
    console.log('\n👀 USER SEES: Mood buttons in header');
    const moodButtons = page.locator('.mood-btn');
    const buttonCount = await moodButtons.count();
    console.log(`✓ Mood buttons visible: ${buttonCount} buttons found`);
    expect(buttonCount).toBeGreaterThanOrEqual(8);

    // REAL USER ACTION 1: Click a mood button (Fresh)
    console.log('\n👆 USER CLICKS: Fresh mood button');
    const freshButton = page.locator('[data-mood="fresh"]');

    // Check if button is visible
    const isFreshVisible = await freshButton.isVisible();
    console.log(`✓ Fresh button visible: ${isFreshVisible}`);

    if (!isFreshVisible) {
      console.log('❌ FAIL: Fresh button not visible');
      throw new Error('Mood buttons are not visible');
    }

    await freshButton.click({ force: true });
    await page.waitForTimeout(1000);

    // VERIFY: Are there actual meal cards?
    const mealCards = page.locator('#mealSuggestions .meal-card');
    const cardCount = await mealCards.count();
    console.log(`✓ Number of meal cards shown: ${cardCount}`);

    if (cardCount === 0) {
      console.log('❌ FAIL: No meal cards shown after clicking mood button');
      throw new Error('No meals displayed after clicking mood button');
    }

    // REAL USER ACTION 2: Use search functionality
    console.log('\n⌨️ USER TYPES: "chicken" in search box');
    const searchInput = page.locator('#searchInput');

    const isSearchVisible = await searchInput.isVisible();
    console.log(`✓ Search input visible: ${isSearchVisible}`);

    if (!isSearchVisible) {
      console.log('❌ FAIL: Search input not visible');
      throw new Error('Search input is not visible');
    }

    await searchInput.fill('chicken');
    await page.waitForTimeout(1000);

    // VERIFY: Are search results shown?
    const searchResultCards = page.locator('#mealSuggestions .meal-card');
    const searchResultCount = await searchResultCards.count();
    console.log(`✓ Search results shown: ${searchResultCount} meals`);

    if (searchResultCount === 0) {
      console.log('❌ FAIL: No search results shown');
      throw new Error('Search functionality does not work');
    }

    // REAL USER ACTION 3: Try clicking a meal card (if modal exists)
    console.log('\n👆 USER CLICKS: First meal card');
    const firstMealCard = searchResultCards.first();
    await firstMealCard.click();
    await page.waitForTimeout(500);

    // Check if meal detail modal opened (optional feature)
    const modal = page.locator('#mealModal');
    const isModalVisible = await modal.isVisible();
    console.log(`✓ Meal detail modal: ${isModalVisible ? 'opened' : 'not implemented'}`);

    if (isModalVisible) {
      // Close modal if it opened
      const closeBtn = page.locator('.modal-close');
      await closeBtn.click();
      await page.waitForTimeout(300);
    }

    console.log('\n✅ ALL USER ACTIONS WORK!');
  });
});