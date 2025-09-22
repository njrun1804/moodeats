/**
 * Jest Unit Tests for MoodEats
 */

const fs = require('fs');
const path = require('path');

describe('Meals Data', () => {
  let meals;

  beforeAll(() => {
    const mealsPath = path.join(__dirname, '../../meals.json');
    const mealsContent = fs.readFileSync(mealsPath, 'utf8');
    meals = JSON.parse(mealsContent);
  });

  test('should have at least 70 meals', () => {
    expect(meals.length).toBeGreaterThanOrEqual(70);
  });

  test('should have exactly 76 meals', () => {
    expect(meals.length).toBe(76);
  });

  test('all meals should have required fields', () => {
    meals.forEach(meal => {
      expect(meal).toHaveProperty('name');
      expect(meal).toHaveProperty('category');
      expect(meal).toHaveProperty('moods');
      expect(meal).toHaveProperty('ingredients');
      expect(meal).toHaveProperty('searchTerms');

      expect(Array.isArray(meal.moods)).toBe(true);
      expect(Array.isArray(meal.searchTerms)).toBe(true);
      expect(meal.ingredients).toHaveProperty('core');
      expect(meal.ingredients).toHaveProperty('pantry');
    });
  });

  test('should have no duplicate meal names', () => {
    const names = meals.map(m => m.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  describe('Mood Coverage', () => {
    const moods = ['breakfast', 'fresh', 'cozy', 'hearty', 'quick', 'seafood', 'asian', 'italian'];

    moods.forEach(mood => {
      test(`should have meals for ${mood} mood`, () => {
        const moodMeals = meals.filter(m => m.moods.includes(mood));
        expect(moodMeals.length).toBeGreaterThan(0);
      });
    });

    test('breakfast mood should have at least 10 meals', () => {
      const breakfastMeals = meals.filter(m => m.moods.includes('breakfast'));
      expect(breakfastMeals.length).toBeGreaterThanOrEqual(10);
    });

    test('hearty mood should have at least 20 meals', () => {
      const heartyMeals = meals.filter(m => m.moods.includes('hearty'));
      expect(heartyMeals.length).toBeGreaterThanOrEqual(20);
    });

    test('fresh mood should have at least 10 meals', () => {
      const freshMeals = meals.filter(m => m.moods.includes('fresh'));
      expect(freshMeals.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Search Terms', () => {
    test('toast search should return at least 3 results', () => {
      const toastMeals = meals.filter(m =>
        m.searchTerms.some(term => term.includes('toast')) ||
        m.name.toLowerCase().includes('toast')
      );
      expect(toastMeals.length).toBeGreaterThanOrEqual(3);
    });

    test('chicken search should return at least 10 results', () => {
      const chickenMeals = meals.filter(m =>
        m.searchTerms.some(term => term.includes('chicken')) ||
        m.name.toLowerCase().includes('chicken')
      );
      expect(chickenMeals.length).toBeGreaterThanOrEqual(10);
    });

    test('eggs search should return at least 5 results', () => {
      const eggMeals = meals.filter(m =>
        m.searchTerms.some(term => term.includes('egg')) ||
        m.name.toLowerCase().includes('egg')
      );
      expect(eggMeals.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Category Validation', () => {
    const validCategories = ['breakfast', 'italian', 'japanese', 'chinese', 'texmex', 'seafood', 'soup', 'sandwich', 'side'];

    test('all meals should have valid categories', () => {
      meals.forEach(meal => {
        expect(validCategories).toContain(meal.category);
      });
    });

    test('breakfast meals should have breakfast category', () => {
      const breakfastMoods = meals.filter(m => m.moods.includes('breakfast'));
      breakfastMoods.forEach(meal => {
        expect(meal.category).toBe('breakfast');
      });
    });
  });

  describe('Ingredients Validation', () => {
    test('all meals should have at least one core ingredient', () => {
      meals.forEach(meal => {
        expect(meal.ingredients.core.length).toBeGreaterThan(0);
      });
    });

    test('core ingredients should be non-empty strings', () => {
      meals.forEach(meal => {
        meal.ingredients.core.forEach(ingredient => {
          expect(typeof ingredient).toBe('string');
          expect(ingredient.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Specific Meals', () => {
    const importantMeals = [
      'Chicken Teriyaki',
      'Scrambled Eggs on Buttered Rye',
      'Salmon Teriyaki',
      'Turkey Taco Rice Bowl'
    ];

    importantMeals.forEach(mealName => {
      test(`${mealName} should exist`, () => {
        const meal = meals.find(m => m.name === mealName);
        expect(meal).toBeDefined();
      });
    });
  });

  describe('Filtering Logic', () => {
    test('breakfast/non-breakfast filtering should work correctly', () => {
      const breakfast = meals.filter(m => m.moods.includes('breakfast'));
      const nonBreakfast = meals.filter(m => !m.moods.includes('breakfast'));

      expect(breakfast.length).toBeGreaterThan(0);
      expect(nonBreakfast.length).toBeGreaterThan(0);
      expect(breakfast.length + nonBreakfast.length).toBe(meals.length);
    });

    test('quick meals should exist in multiple categories', () => {
      const quickMeals = meals.filter(m => m.moods.includes('quick'));
      const categories = new Set(quickMeals.map(m => m.category));
      expect(categories.size).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Search Performance', () => {
    test('pasta search should return at least 5 results', () => {
      const pastaMeals = meals.filter(m =>
        m.searchTerms.some(term => term.includes('pasta')) ||
        m.name.toLowerCase().includes('pasta')
      );
      expect(pastaMeals.length).toBeGreaterThanOrEqual(5);
    });

    test('salmon search should return at least 3 results', () => {
      const salmonMeals = meals.filter(m =>
        m.searchTerms.some(term => term.includes('salmon')) ||
        m.name.toLowerCase().includes('salmon')
      );
      expect(salmonMeals.length).toBeGreaterThanOrEqual(3);
    });

    test('all fish meals should have "fish" in searchTerms for semantic search', () => {
      const fishMeals = meals.filter(m =>
        m.name.toLowerCase().includes('salmon') ||
        m.name.toLowerCase().includes('fish') ||
        m.ingredients.core.some(ingredient =>
          ingredient.toLowerCase().includes('salmon') ||
          ingredient.toLowerCase().includes('fish')
        )
      );

      fishMeals.forEach(meal => {
        const hasSeafoodTerm = meal.searchTerms.some(term =>
          term.toLowerCase().includes('fish') ||
          term.toLowerCase().includes('seafood')
        );
        if (!hasSeafoodTerm) {
          console.log('Fish meal missing term:', meal.name, 'searchTerms:', meal.searchTerms);
        }
        expect(hasSeafoodTerm).toBe(true);
      });
    });
  });

  describe('Data Consistency', () => {
    test('all seafood category meals should have seafood mood', () => {
      const seafoodCategory = meals.filter(m => m.category === 'seafood');
      const allHaveMood = seafoodCategory.every(m => m.moods.includes('seafood'));
      expect(allHaveMood).toBe(true);
    });

    test('meal names should be reasonable length', () => {
      meals.forEach(meal => {
        expect(meal.name.length).toBeLessThanOrEqual(50);
        expect(meal.name.length).toBeGreaterThan(0);
      });
    });

    test('all meals should have non-empty search terms', () => {
      meals.forEach(meal => {
        expect(meal.searchTerms.length).toBeGreaterThan(0);
        meal.searchTerms.forEach(term => {
          expect(term.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Semantic Search Compatibility Tests', () => {
    // Test that all fish dishes now have proper search terms for semantic matching
    test('fish search should find all salmon dishes via searchTerms', () => {
      const salmonMeals = meals.filter(meal =>
        meal.name.toLowerCase().includes('salmon')
      );

      // All salmon meals should now have "fish" in their searchTerms
      salmonMeals.forEach(meal => {
        const hasSeafoodTerm = meal.searchTerms.some(term =>
          term.toLowerCase().includes('fish') ||
          term.toLowerCase().includes('seafood')
        );
        if (!hasSeafoodTerm) {
          console.log('Missing fish/seafood term:', meal.name, 'searchTerms:', meal.searchTerms);
        }
        expect(hasSeafoodTerm).toBe(true);
      });

      expect(salmonMeals.length).toBeGreaterThanOrEqual(5);
    });

    test('seafood meals should be properly categorized', () => {
      const seafoodMeals = meals.filter(meal =>
        meal.moods.includes('seafood') ||
        meal.category === 'seafood'
      );

      expect(seafoodMeals.length).toBeGreaterThan(5);

      // Each seafood meal should have relevant search terms
      seafoodMeals.forEach(meal => {
        const hasSeafoodTerm = meal.searchTerms.some(term =>
          ['fish', 'seafood', 'salmon', 'crab', 'shrimp', 'clams'].includes(term.toLowerCase())
        );
        if (!hasSeafoodTerm) {
          console.log('Seafood meal missing term:', meal.name, 'searchTerms:', meal.searchTerms);
        }
        expect(hasSeafoodTerm).toBe(true);
      });
    });

    test('data structure supports semantic search patterns', () => {
      // Test that meals have the structure needed for semantic search
      meals.forEach(meal => {
        expect(meal).toHaveProperty('name');
        expect(meal).toHaveProperty('searchTerms');
        expect(meal).toHaveProperty('ingredients');
        expect(meal.ingredients).toHaveProperty('core');

        // Search terms should be an array of strings
        expect(Array.isArray(meal.searchTerms)).toBe(true);
        meal.searchTerms.forEach(term => {
          expect(typeof term).toBe('string');
          expect(term.length).toBeGreaterThan(0);
        });
      });
    });

    test('semantic categories have representative meals', () => {
      // Fish/seafood category
      const fishMeals = meals.filter(meal =>
        meal.searchTerms.some(term => ['fish', 'seafood'].includes(term.toLowerCase())) ||
        meal.ingredients.core.some(ingredient =>
          ['salmon', 'fish', 'crab', 'shrimp'].some(fish =>
            ingredient.toLowerCase().includes(fish)
          )
        )
      );
      expect(fishMeals.length).toBeGreaterThan(5);

      // Pasta category
      const pastaMeals = meals.filter(meal =>
        meal.searchTerms.some(term => term.toLowerCase().includes('pasta')) ||
        meal.name.toLowerCase().includes('linguine') ||
        meal.name.toLowerCase().includes('spaghetti')
      );
      expect(pastaMeals.length).toBeGreaterThan(3);

      // Asian category
      const asianMeals = meals.filter(meal =>
        meal.moods.includes('asian') ||
        meal.searchTerms.some(term => ['japanese', 'teriyaki', 'asian'].includes(term.toLowerCase()))
      );
      expect(asianMeals.length).toBeGreaterThan(5);
    });
  });
});

// NOTE: Planner HTML Structure tests removed - current app is browse-only version
// These tests were for the old planner version that had embedded meals data and planner functions
// The current simplified app doesn't have these features, so the tests are no longer relevant