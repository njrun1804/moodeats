// @ts-check
const { test, expect } = require('@playwright/test');

test('verify browse-only app initialization works', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // Log console messages
  page.on('console', msg => {
    console.log(`Browser console: ${msg.type()}: ${msg.text()}`);
  });

  // Wait for page to settle
  await page.waitForTimeout(1000);

  // Step 1: Verify browse-only app basic functionality works
  console.log('Testing browse-only app initialization...');

  // Check that essential elements are present
  const elementsPresent = await page.evaluate(() => {
    return {
      hasSearchInput: !!document.getElementById('searchInput'),
      hasMoodButtons: document.querySelectorAll('.mood-btn').length > 0,
      hasMealSuggestions: !!document.getElementById('mealSuggestions'),
      bodyVisible: !!document.body && document.body.style.display !== 'none'
    };
  });
  console.log('Elements present:', elementsPresent);

  // Verify all essential elements exist
  expect(elementsPresent.hasSearchInput).toBe(true);
  expect(elementsPresent.hasMoodButtons).toBe(true);
  expect(elementsPresent.hasMealSuggestions).toBe(true);
  expect(elementsPresent.bodyVisible).toBe(true);

  // Step 2: Test that mood buttons are functional
  console.log('Testing mood button functionality...');
  await page.click('[data-mood="fresh"]', { force: true });
  await page.waitForTimeout(1000);

  // Check if meals are displayed
  const mealCards = page.locator('#mealSuggestions .meal-card');
  const cardCount = await mealCards.count();
  console.log(`Meals displayed after clicking Fresh: ${cardCount}`);
  expect(cardCount).toBeGreaterThan(0);

  // Step 3: Test search functionality
  console.log('Testing search functionality...');
  const searchInput = page.locator('#searchInput');
  await searchInput.fill('chicken');
  await page.waitForTimeout(1000);

  const searchResults = page.locator('#mealSuggestions .meal-card');
  const searchCount = await searchResults.count();
  console.log(`Search results for "chicken": ${searchCount}`);
  expect(searchCount).toBeGreaterThan(0);

  console.log('✅ Browse-only app initialization test passed!');
});