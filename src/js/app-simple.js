let meals = [];
let fuse;
let currentMood = 'all';
let selectedMeal = null;


function loadMeals() {
    console.log('Loading meals...');

    if (typeof embeddedMeals !== 'undefined' && embeddedMeals) {
        meals = embeddedMeals;
    }

    window.meals = meals;
    console.log('Loaded', meals.length, 'meals');

    initFuzzySearch();
    setupEventListeners();
    displayAllMeals();
}


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


function setupEventListeners() {
    // Mood buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.dataset.mood;

            // Update active state
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            currentMood = mood;

            if (mood === 'all') {
                displayAllMeals();
            } else {
                showMealSuggestions(mood);
            }
        });
    });

    // Search input with debounce
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length === 0) {
            // If search is cleared, show current mood or all
            if (currentMood === 'all') {
                displayAllMeals();
            } else {
                showMealSuggestions(currentMood);
            }
            return;
        }

        searchTimeout = setTimeout(() => {
            searchMeals(query);
        }, 300);
    });

    // Modal close on backdrop click
    document.getElementById('mealModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}


function displayAllMeals() {
    displayMeals(meals);
}


function showMealSuggestions(mood) {
    const moodMeals = meals.filter(m => m.moods.includes(mood));
    displayMeals(moodMeals);
}


function searchMeals(query) {
    if (!query || query.length < 2) {
        if (currentMood === 'all') {
            displayAllMeals();
        } else if (currentMood) {
            showMealSuggestions(currentMood);
        }
        return;
    }

    const results = performAdvancedSearch(query);
    displayMeals(results);
}

function performAdvancedSearch(query, availableMeals = meals) {
    if (!query || query.length < 2) {
        return availableMeals;
    }

    const normalizedQuery = query.toLowerCase().trim();

    // Step 1: Find exact matches with word boundaries
    const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');
    const exactMatches = availableMeals.filter(meal => {
        // Check for word boundary matches in name
        if (wordBoundaryRegex.test(meal.name)) return true;

        // Check for exact matches in searchTerms
        if (meal.searchTerms.some(term => term.toLowerCase() === normalizedQuery)) return true;

        // Check for word boundary matches in searchTerms
        return meal.searchTerms.some(term => wordBoundaryRegex.test(term));
    });

    // Step 2: Get fuzzy matches with dynamic threshold
    const threshold = getDynamicThreshold(normalizedQuery.length);
    const originalThreshold = fuse.options.threshold;
    fuse.options.threshold = threshold;

    const fuzzyResults = fuse.search(normalizedQuery);

    // Restore original threshold
    fuse.options.threshold = originalThreshold;

    // Step 3: Combine and rank results
    const combinedResults = combineSearchResults(exactMatches, fuzzyResults, normalizedQuery, availableMeals);

    // Step 4: Limit results
    return combinedResults.slice(0, 12);
}

function getDynamicThreshold(queryLength) {
    if (queryLength <= 3) return 0.1;
    if (queryLength <= 5) return 0.2;
    if (queryLength <= 8) return 0.25;
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

    // Word boundary match in name gets high priority
    const wordBoundaryRegex = new RegExp(`\\b${queryLower}\\b`, 'i');
    if (wordBoundaryRegex.test(meal.name)) return 0.03;

    // Search terms exact match
    if (meal.searchTerms.some(term => term.toLowerCase() === queryLower)) return 0.04;

    // Word boundary match in search terms
    if (meal.searchTerms.some(term => wordBoundaryRegex.test(term))) return 0.05;

    return 0.1; // Default for other exact matches
}


function displayMeals(mealList) {
    const container = document.getElementById('mealSuggestions');
    container.innerHTML = '';

    if (mealList.length === 0) {
        container.innerHTML = '<div class="no-results">No meals found. Try a different search or mood.</div>';
        return;
    }

    mealList.forEach(meal => {
        const mealCard = createCompactMealCard(meal);
        container.appendChild(mealCard);
    });
}


function createCompactMealCard(meal) {
    const card = document.createElement('div');
    card.className = 'meal-card';

    // Build ingredients list (max 3 items)
    const coreIngredients = meal.ingredients.core.slice(0, 3).join(', ');
    const hasMore = meal.ingredients.core.length > 3 ? '...' : '';

    // Build mood tags (compact)
    const moodTags = meal.moods.slice(0, 3).map(mood => {
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
        return `<span class="meal-tag">${moodEmoji[mood] || ''} ${mood}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="meal-title">${meal.name}</div>
        <div class="meal-ingredients">${coreIngredients}${hasMore}</div>
        <div class="meal-tags">${moodTags}</div>
    `;

    card.addEventListener('click', () => showMealDetails(meal));

    return card;
}


function showMealDetails(meal) {
    selectedMeal = meal;

    // Update modal content
    document.getElementById('modalTitle').textContent = meal.name;

    // Ingredients
    document.getElementById('modalIngredients').textContent = meal.ingredients.core.join(', ');

    // Pantry items
    document.getElementById('modalPantry').textContent = meal.ingredients.pantry.join(', ');

    // Nutrition
    const nutrition = nutritionEstimates[meal.name] || { protein: 25, carbs: 50, fat: 15, calories: 435 };
    const nutritionHTML = `
        <div class="nutrition-item">
            <span class="nutrition-label">Protein</span>
            <span class="nutrition-value">${nutrition.protein}g</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">Carbs</span>
            <span class="nutrition-value">${nutrition.carbs}g</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">Fat</span>
            <span class="nutrition-value">${nutrition.fat}g</span>
        </div>
        <div class="nutrition-item">
            <span class="nutrition-label">Calories</span>
            <span class="nutrition-value">${nutrition.calories}</span>
        </div>
    `;
    document.getElementById('modalNutrition').innerHTML = nutritionHTML;

    // Tags
    const allTags = meal.moods.map(mood => {
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
        return `<span class="meal-tag" style="margin-right: 8px;">${moodEmoji[mood] || ''} ${mood}</span>`;
    }).join('');
    document.getElementById('modalTags').innerHTML = allTags;

    // Show modal
    document.getElementById('mealModal').classList.add('open');
}


function closeModal() {
    document.getElementById('mealModal').classList.remove('open');
}

// Make closeModal available globally for onclick handler
window.closeModal = closeModal;


function initializeApp() {
    loadMeals();
}


window.initializeApp = initializeApp;
window.loadMeals = loadMeals;


// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing MoodEats Compact Grid...');
        if (typeof initializeApp === 'function') {
            initializeApp();
        }
    });
} else {
    console.log('Initializing MoodEats Compact Grid (DOM ready)...');
    if (typeof initializeApp === 'function') {
        initializeApp();
    }
}

export {
    initializeApp,
    loadMeals,
    setupEventListeners,
    displayAllMeals,
    showMealSuggestions,
    searchMeals,
    performAdvancedSearch,
    displayMeals,
    createCompactMealCard,
    showMealDetails,
    closeModal
};