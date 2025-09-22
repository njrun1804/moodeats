// Import data
import { embeddedMeals } from './meals-data.js';
import { nutritionEstimates } from './nutrition-data.js';

// Global variables
let meals = [];
let fuse;
let currentMood = null;

// Load meals data
function loadMeals() {
    console.log('Loading meals...');

    if (typeof embeddedMeals !== 'undefined' && embeddedMeals) {
        meals = embeddedMeals;
    }

    window.meals = meals;
    console.log('Loaded', meals.length, 'meals');

    initFuzzySearch();
    setupEventListeners();
}

// Initialize fuzzy search
function initFuzzySearch() {
    if (typeof Fuse !== 'undefined' && meals.length > 0) {
        fuse = new Fuse(meals, {
            keys: [
                { name: 'name', weight: 1.0 },
                { name: 'searchTerms', weight: 0.7 },
                { name: 'ingredients.core', weight: 0.5 },
                { name: 'moods', weight: 0.4 },
                { name: 'ingredients.pantry', weight: 0.3 }
            ],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            ignoreLocation: true
        });
    }
}

// Improved search with exact match prioritization
function performAdvancedSearch(query, availableMeals = meals) {
    if (!query || query.length < 2) {
        return availableMeals;
    }

    const normalizedQuery = query.toLowerCase().trim();

    // Step 1: Find exact matches first
    const exactMatches = availableMeals.filter(meal => {
        return meal.name.toLowerCase().includes(normalizedQuery) ||
               meal.searchTerms.some(term => term.toLowerCase().includes(normalizedQuery));
    });

    // Step 2: Get fuzzy matches with dynamic threshold
    const threshold = getDynamicThreshold(normalizedQuery.length);
    fuse.setThreshold(threshold);

    const fuzzyResults = fuse.search(normalizedQuery);

    // Step 3: Combine and rank results
    const combinedResults = combineSearchResults(exactMatches, fuzzyResults, normalizedQuery, availableMeals);

    // Step 4: Limit results
    return combinedResults.slice(0, 12);
}

function getDynamicThreshold(queryLength) {
    if (queryLength <= 4) return 0.1;
    if (queryLength <= 8) return 0.2;
    return 0.3;
}

function combineSearchResults(exactMatches, fuzzyResults, query, availableMeals) {
    const results = new Map();

    // Add exact matches with highest priority
    exactMatches.forEach(meal => {
        const priority = getExactMatchPriority(meal, query);
        results.set(meal.name, { meal, score: priority, type: 'exact' });
    });

    // Add fuzzy matches that aren't already in exact matches and are in available meals
    fuzzyResults.forEach(result => {
        const isAvailable = availableMeals.some(m => m.name === result.item.name);
        if (!results.has(result.item.name) && result.score <= 0.4 && isAvailable) {
            const adjustedScore = 0.5 + result.score; // Lower priority than exact matches
            results.set(result.item.name, { meal: result.item, score: adjustedScore, type: 'fuzzy' });
        }
    });

    // Sort by score (lower is better) and return meals
    return Array.from(results.values())
        .sort((a, b) => a.score - b.score)
        .map(result => result.meal);
}

function getExactMatchPriority(meal, query) {
    const mealName = meal.name.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact name match gets highest priority
    if (mealName === queryLower) return 0.01;

    // Name starts with query gets very high priority
    if (mealName.startsWith(queryLower)) return 0.02;

    // Name contains query gets high priority
    if (mealName.includes(queryLower)) return 0.03;

    // Search terms exact match
    if (meal.searchTerms.some(term => term.toLowerCase() === queryLower)) return 0.04;

    // Search terms partial match
    if (meal.searchTerms.some(term => term.toLowerCase().includes(queryLower))) return 0.05;

    return 0.1; // Default for other exact matches
}

// Setup all event listeners
function setupEventListeners() {
    // Mood buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Clear search when clicking mood
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';

            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('btn-primary'));
            btn.classList.add('btn-primary');

            currentMood = btn.dataset.mood;
            showMealSuggestions(currentMood);
        });
    });

    // Search input - always visible at top
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                // Clear mood selection when typing
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('btn-primary'));
                currentMood = null;
                searchMeals(query);
            } else {
                // Hide suggestions if no query and no mood selected
                if (!currentMood) {
                    document.getElementById('suggestionsArea').classList.add('hidden');
                }
            }
        });
    }
}

// Show meal suggestions for a mood
function showMealSuggestions(mood) {
    const moodMeals = meals.filter(m => m.moods.includes(mood));
    displayMeals(moodMeals, `${mood.charAt(0).toUpperCase() + mood.slice(1)} meals`);
    document.getElementById('suggestionsArea').classList.remove('hidden');
}

// Search meals
function searchMeals(query) {
    if (!query || query.length < 2) {
        document.getElementById('suggestionsArea').classList.add('hidden');
        return;
    }

    const results = performAdvancedSearch(query);
    displayMeals(results, `Results for "${query}"`);
    document.getElementById('suggestionsArea').classList.remove('hidden');
}

// Display meals in the suggestions area
function displayMeals(mealList, title = 'Suggestions') {
    const container = document.getElementById('mealSuggestions');
    const titleElement = document.getElementById('suggestionsTitle');

    if (titleElement) {
        titleElement.textContent = title;
    }

    container.innerHTML = '';

    if (mealList.length === 0) {
        container.innerHTML = '<p class="text-base-content/60">No meals found. Try a different search term or browse by mood.</p>';
        return;
    }

    mealList.forEach(meal => {
        const nutrition = nutritionEstimates[meal.name] || { protein: 25, carbs: 50, fat: 15, calories: 435 };
        const mealCard = document.createElement('div');
        mealCard.className = 'card bg-base-100 p-4 hover:bg-base-200 transition-colors';

        // Build ingredients list
        const coreIngredients = meal.ingredients.core.join(', ');

        mealCard.innerHTML = `
            <h4 class="font-semibold text-lg">${meal.name}</h4>
            <p class="text-xs text-base-content/60 mt-1">
                ${nutrition.protein}g protein • ${nutrition.carbs}g carbs • ${nutrition.fat}g fat • ${nutrition.calories} cal
            </p>
            <p class="text-sm text-base-content/80 mt-2">
                <span class="font-medium">Main ingredients:</span> ${coreIngredients}
            </p>
            <div class="mt-2">
                ${meal.moods.map(mood => {
                    const moodEmoji = {
                        'cozy': '🔥',
                        'fresh': '🥗',
                        'hearty': '💪',
                        'quick': '⚡',
                        'asian': '🥢',
                        'italian': '🍝',
                        'seafood': '🐟',
                        'breakfast': '🌅'
                    };
                    return `<span class="badge badge-sm mr-1">${moodEmoji[mood] || ''} ${mood}</span>`;
                }).join('')}
            </div>
        `;

        container.appendChild(mealCard);
    });
}

// Initialize app when DOM is ready
function initializeApp() {
    loadMeals();
}

// Export functions for global access
window.initializeApp = initializeApp;
window.loadMeals = loadMeals;

// Auto-initialize
export { initializeApp };