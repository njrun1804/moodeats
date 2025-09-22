let meals = [];
let fuse;
let currentMood = 'all';
let selectedMeal = null;
let searchTagify = null;

// Comprehensive food semantic mapping for domain-specific search
const foodSemantics = {
    // Proteins
    fish: ['salmon', 'tuna', 'cod', 'halibut', 'whitefish', 'trout', 'mahi', 'sea bass', 'bass', 'tilapia', 'sole', 'flounder', 'snapper', 'mackerel'],
    seafood: ['shrimp', 'crab', 'lobster', 'scallops', 'mussels', 'clams', 'oysters', 'calamari', 'squid', 'octopus'],
    meat: ['beef', 'chicken', 'pork', 'turkey', 'lamb', 'duck', 'venison', 'bison', 'sausage', 'bacon', 'ham'],
    poultry: ['chicken', 'turkey', 'duck', 'goose', 'quail'],

    // Carbs & Grains
    pasta: ['spaghetti', 'penne', 'rigatoni', 'fettuccine', 'linguine', 'angel hair', 'fusilli', 'bow tie', 'farfalle', 'macaroni', 'shells', 'rotini', 'ravioli', 'lasagna', 'gnocchi'],
    noodles: ['ramen', 'udon', 'soba', 'rice noodles', 'egg noodles', 'lo mein', 'pad thai noodles'],
    grain: ['rice', 'quinoa', 'barley', 'bulgur', 'farro', 'wheat', 'oats', 'buckwheat', 'millet', 'couscous'],
    bread: ['baguette', 'sourdough', 'rye', 'pumpernickel', 'focaccia', 'ciabatta', 'pita', 'naan', 'tortilla', 'bagel'],
    rice: ['brown rice', 'white rice', 'jasmine', 'basmati', 'arborio', 'wild rice', 'sticky rice'],

    // Vegetables
    vegetable: ['broccoli', 'cauliflower', 'carrots', 'zucchini', 'squash', 'bell peppers', 'peppers', 'onions', 'tomatoes', 'mushrooms', 'eggplant', 'asparagus', 'brussels sprouts', 'cabbage'],
    greens: ['spinach', 'arugula', 'kale', 'lettuce', 'chard', 'collard greens', 'mustard greens', 'watercress', 'endive', 'romaine', 'baby greens'],
    pepper: ['bell pepper', 'jalapeño', 'serrano', 'poblano', 'habanero', 'chipotle', 'cayenne', 'paprika'],
    mushroom: ['button', 'cremini', 'portobello', 'shiitake', 'oyster', 'chanterelle', 'morel', 'porcini'],
    tomato: ['cherry tomatoes', 'roma', 'beefsteak', 'heirloom', 'grape tomatoes', 'plum tomatoes'],
    onion: ['yellow onion', 'white onion', 'red onion', 'shallot', 'scallion', 'green onion', 'leek'],

    // Legumes
    bean: ['black beans', 'kidney beans', 'chickpeas', 'garbanzo', 'lentils', 'white beans', 'navy beans', 'pinto beans', 'lima beans', 'cannellini', 'fava beans'],
    lentil: ['red lentils', 'green lentils', 'brown lentils', 'yellow lentils', 'black lentils'],

    // Dairy & Cheese
    cheese: ['mozzarella', 'cheddar', 'parmesan', 'parmigiano', 'goat cheese', 'feta', 'swiss', 'gruyere', 'brie', 'camembert', 'blue cheese', 'ricotta', 'provolone', 'manchego'],
    dairy: ['milk', 'cream', 'butter', 'yogurt', 'sour cream', 'crème fraîche'],

    // Fruits
    fruit: ['apple', 'banana', 'orange', 'lemon', 'lime', 'berries', 'grapes', 'pear', 'peach', 'plum', 'mango', 'pineapple', 'strawberry', 'blueberry'],
    berry: ['strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry', 'gooseberry'],
    citrus: ['lemon', 'lime', 'orange', 'grapefruit', 'tangerine', 'mandarin'],

    // Herbs & Spices
    herb: ['basil', 'oregano', 'thyme', 'rosemary', 'sage', 'cilantro', 'parsley', 'dill', 'chives', 'mint', 'tarragon', 'bay leaves'],
    spice: ['cumin', 'paprika', 'turmeric', 'coriander', 'cardamom', 'cinnamon', 'ginger', 'garlic', 'black pepper', 'cayenne', 'chili powder'],

    // Cooking Methods & Styles
    cooking: ['grilled', 'baked', 'roasted', 'sautéed', 'braised', 'steamed', 'fried', 'poached', 'pan-seared', 'broiled'],
    texture: ['crispy', 'creamy', 'crunchy', 'tender', 'flaky', 'smooth', 'chunky'],

    // Cuisine Types
    asian: ['chinese', 'japanese', 'thai', 'korean', 'vietnamese', 'indian', 'teriyaki', 'stir fry', 'curry'],
    italian: ['pasta', 'pizza', 'risotto', 'carbonara', 'marinara', 'pesto', 'alfredo', 'bolognese'],
    mexican: ['tacos', 'burritos', 'quesadillas', 'enchiladas', 'salsa', 'guacamole', 'tortilla'],
    mediterranean: ['hummus', 'tzatziki', 'olives', 'feta', 'olive oil', 'pita'],

    // Meal Types
    breakfast: ['eggs', 'pancakes', 'waffles', 'toast', 'cereal', 'oatmeal', 'bagel', 'yogurt', 'smoothie'],
    lunch: ['sandwich', 'salad', 'soup', 'wrap', 'panini'],
    dinner: ['steak', 'roast', 'casserole', 'stew', 'entree'],

    // Health & Diet
    healthy: ['lean', 'low fat', 'high protein', 'antioxidant', 'omega-3', 'fiber'],
    comfort: ['creamy', 'rich', 'hearty', 'warming', 'indulgent']
};

function expandSearchTermsWithSemantics(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const expandedTerms = [normalizedQuery];

    // Check if the query matches any semantic category or items
    for (const [category, items] of Object.entries(foodSemantics)) {
        if (category === normalizedQuery) {
            // If searching for category (e.g., "fish"), add all specific items
            expandedTerms.push(...items);
        } else if (items.includes(normalizedQuery)) {
            // If searching for specific item (e.g., "salmon"), add the category
            expandedTerms.push(category);
            // Also add related items from same category (limited to avoid too many results)
            expandedTerms.push(...items.slice(0, 5));
        } else {
            // Check for partial matches in items (e.g., "salmon" matches "smoked salmon")
            const partialMatches = items.filter(item =>
                item.includes(normalizedQuery) || normalizedQuery.includes(item)
            );
            if (partialMatches.length > 0) {
                expandedTerms.push(category);
                expandedTerms.push(...partialMatches);
            }
        }
    }

    return [...new Set(expandedTerms)]; // Remove duplicates
}

function isValidSearchTerm(term) {
    // Filter out unwanted terms
    if (term.length < 3) return false;
    if (term.includes('(') || term.includes(')')) return false;
    if (term.includes('${') || term.includes('}')) return false; // Template literals
    if (term.includes('undefined') || term.includes('null')) return false;
    if (term.match(/^\d+$/)) return false; // Pure numbers
    if (term.includes('function') || term.includes('object')) return false;
    return true;
}

function buildSearchableTerms() {
    const terms = new Set();

    // Add common food categories with their types
    const termCategories = [
        // Ingredients
        {category: 'ingredient', items: ['eggs', 'pasta', 'rice', 'chicken', 'beef', 'salmon', 'tuna', 'shrimp', 'mushrooms', 'cheese', 'tomatoes', 'onions', 'garlic', 'spinach', 'broccoli', 'carrots', 'potatoes', 'bread', 'bacon', 'turkey', 'lemon', 'lime', 'avocado', 'lettuce', 'peppers', 'zucchini', 'asparagus', 'beans', 'lentils', 'quinoa', 'butter', 'cream', 'milk', 'yogurt', 'olive oil', 'soy sauce', 'ginger', 'cilantro', 'basil', 'dill', 'parsley', 'mozzarella', 'parmesan', 'cheddar', 'feta', 'goat cheese']},

        // Moods/Attributes
        {category: 'mood', items: ['quick', 'easy', 'healthy', 'light', 'hearty', 'cozy', 'fresh', 'creamy', 'crispy', 'spicy', 'mild', 'savory', 'sweet', 'tangy', 'rich', 'lean', 'filling', 'comfort', 'warming']},

        // Cuisines
        {category: 'cuisine', items: ['italian', 'asian', 'chinese', 'japanese', 'thai', 'korean', 'indian', 'mexican', 'mediterranean', 'greek', 'french', 'american', 'southern', 'middle eastern']},

        // Meal Types
        {category: 'meal-type', items: ['breakfast', 'lunch', 'dinner', 'snack', 'appetizer', 'side', 'main', 'entree', 'salad', 'soup', 'sandwich', 'bowl', 'wrap', 'smoothie']},

        // Cooking Methods
        {category: 'cooking', items: ['baked', 'grilled', 'fried', 'sautéed', 'roasted', 'steamed', 'boiled', 'broiled', 'pan-seared', 'stir-fried', 'braised', 'poached']}
    ];

    const searchableTerms = [];
    const usedTerms = new Set();

    // Add predefined categories
    termCategories.forEach(({category, items}) => {
        items.forEach(item => {
            const cleanItem = item.toLowerCase().trim();
            if (!usedTerms.has(cleanItem)) {
                searchableTerms.push({
                    value: item,
                    category: category,
                    searchBy: cleanItem
                });
                usedTerms.add(cleanItem);
            }
        });
    });

    // Add specific terms from actual meal data (filtered and cleaned)

    meals.forEach(meal => {
        // Add search terms (these are usually clean)
        meal.searchTerms.forEach(term => {
            const cleanTerm = term.toLowerCase().trim();
            if (isValidSearchTerm(cleanTerm) && !usedTerms.has(cleanTerm)) {
                searchableTerms.push({
                    value: cleanTerm,
                    category: 'search-term',
                    searchBy: cleanTerm
                });
                usedTerms.add(cleanTerm);
            }
        });

        // Add core ingredients (cleaned)
        meal.ingredients.core.forEach(ingredient => {
            const cleanIngredient = ingredient.toLowerCase()
                .replace(/[()]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            if (isValidSearchTerm(cleanIngredient) && !usedTerms.has(cleanIngredient)) {
                searchableTerms.push({
                    value: cleanIngredient,
                    category: 'ingredient',
                    searchBy: cleanIngredient
                });
                usedTerms.add(cleanIngredient);
            }
        });
    });

    return searchableTerms.sort((a, b) => a.value.localeCompare(b.value));
}

function initializeFallbackSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Restore original placeholder
    searchInput.placeholder = 'Search meals...';

    // Add regular search event listener
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        searchMeals(query);
    });

    // Handle enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            searchMeals(query);
        }
    });
}

function initializeTagifySearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    if (typeof Tagify === 'undefined') {
        console.warn('Tagify not available, falling back to regular search');
        initializeFallbackSearch();
        return;
    }

    // Build searchable terms from meal data
    const searchableTerms = buildSearchableTerms();

    // Initialize Tagify
    searchTagify = new Tagify(searchInput, {
        whitelist: searchableTerms,
        maxTags: 10,
        dropdown: {
            maxItems: 20,
            classname: 'tags-look',
            enabled: 2,
            closeOnSelect: false,
            fuzzySearch: true,
            searchKeys: ['value']
        },
        enforceWhitelist: false,
        skipInvalid: false,
        duplicates: false,
        autoComplete: {
            enabled: true,
            rightKey: true
        },
        placeholder: 'Type to search ingredients, moods, cuisines...',
        tabIndex: 0,
        templates: {
            tag: function(tagData) {
                return `<tag title="${tagData.value}"
                        contenteditable='false'
                        spellcheck='false'
                        tabIndex="-1"
                        class="tagify__tag tagify__tag--${tagData.category || 'default'}"
                        ${this.getAttributes(tagData)}>
                    <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                    <div>
                        <span class='tagify__tag-text'>${tagData.value}</span>
                    </div>
                </tag>`;
            },
            dropdownItem: function(tagData) {
                const categoryLabel = {
                    'ingredient': 'ingredient',
                    'mood': 'mood',
                    'cuisine': 'cuisine',
                    'meal-type': 'meal',
                    'cooking': 'method',
                    'search-term': ''
                };
                const category = categoryLabel[tagData.category] || '';
                return `<div ${this.getAttributes(tagData)}
                        class='tagify__dropdown__item ${tagData.category ? 'tagify__dropdown__item--' + tagData.category : ''}'
                        tabindex="0"
                        role="option">
                    <span class='tagify__dropdown__item__text'>${tagData.value}</span>
                    ${category ? `<span class='tagify__dropdown__item__category'>${category}</span>` : ''}
                </div>`;
            }
        }
    });

    // Handle tag changes
    searchTagify.on('add remove', function(e) {
        performTagSearch();
    });

    // Handle input changes for autocomplete
    searchTagify.on('input', function(e) {
        if (e.detail.value === '') {
            performTagSearch(); // Empty search shows all
        }
    });
}

function performTagSearch() {
    if (!searchTagify) return;

    const tags = searchTagify.value.map(tag => tag.value.toLowerCase());

    if (tags.length === 0) {
        // No tags selected, show current mood or all
        if (currentMood === 'all') {
            displayAllMeals();
        } else {
            showMealSuggestions(currentMood);
        }
        return;
    }

    // Filter meals that match ALL selected tags
    const filteredMeals = meals.filter(meal => {
        return tags.every(tag => {
            // Check if meal matches this tag
            const mealText = [
                meal.name,
                ...meal.searchTerms,
                ...meal.ingredients.core,
                ...meal.moods,
                meal.category
            ].join(' ').toLowerCase();

            return mealText.includes(tag);
        });
    });

    displayMeals(filteredMeals);
}

function performSemanticSearch(query, availableMeals) {
    const normalizedQuery = query.toLowerCase().trim();

    // Handle single word vs multi-word queries differently
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);

    if (queryWords.length === 1) {
        // Single word - use original semantic expansion
        return performSingleTermSemanticSearch(normalizedQuery, availableMeals);
    } else {
        // Multi-word - require ALL words to match (AND logic)
        return performMultiTermSemanticSearch(queryWords, availableMeals);
    }
}

function performSingleTermSemanticSearch(query, availableMeals) {
    const expandedTerms = expandSearchTermsWithSemantics(query);
    const semanticMatches = new Set();

    // For single terms, match any of the expanded terms
    for (const term of expandedTerms) {
        const termMatches = availableMeals.filter(meal =>
            mealMatchesTerm(meal, term)
        );
        termMatches.forEach(meal => semanticMatches.add(meal));
    }

    return Array.from(semanticMatches);
}

function performMultiTermSemanticSearch(queryWords, availableMeals) {
    // For multi-term queries, each meal must match ALL words
    return availableMeals.filter(meal => {
        return queryWords.every(word => {
            // Expand each word semantically
            const expandedTerms = expandSearchTermsWithSemantics(word);

            // Check if meal matches this word (or any of its semantic expansions)
            return expandedTerms.some(term => mealMatchesTerm(meal, term));
        });
    });
}

function mealMatchesTerm(meal, term) {
    // Check name
    if (meal.name.toLowerCase().includes(term)) return true;

    // Check searchTerms
    if (meal.searchTerms.some(searchTerm =>
        searchTerm.toLowerCase().includes(term) || term.includes(searchTerm.toLowerCase())
    )) return true;

    // Check core ingredients
    if (meal.ingredients.core.some(ingredient =>
        ingredient.toLowerCase().includes(term) || term.includes(ingredient.toLowerCase())
    )) return true;

    return false;
}


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

    // Send to AI button
    const sendToAIBtn = document.getElementById('sendToAI');
    if (sendToAIBtn) {
        sendToAIBtn.addEventListener('click', copyAllMealsToClipboard);
    }

    // Initialize Tagify search
    initializeTagifySearch();

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

    // Step 1: Get semantic matches (NEW - highest priority)
    const semanticMatches = performSemanticSearch(normalizedQuery, availableMeals);

    // Step 2: Find exact matches with word boundaries
    const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');
    const exactMatches = availableMeals.filter(meal => {
        // Check for word boundary matches in name
        if (wordBoundaryRegex.test(meal.name)) return true;

        // Check for exact matches in searchTerms
        if (meal.searchTerms.some(term => term.toLowerCase() === normalizedQuery)) return true;

        // Check for word boundary matches in searchTerms
        return meal.searchTerms.some(term => wordBoundaryRegex.test(term));
    });

    // Step 3: Get fuzzy matches with dynamic threshold
    const threshold = getDynamicThreshold(normalizedQuery.length);
    const originalThreshold = fuse.options.threshold;
    fuse.options.threshold = threshold;

    const fuzzyResults = fuse.search(normalizedQuery);

    // Restore original threshold
    fuse.options.threshold = originalThreshold;

    // Step 4: Combine and rank results with semantic priority
    const combinedResults = combineSearchResultsWithSemantics(
        semanticMatches, exactMatches, fuzzyResults, normalizedQuery, availableMeals
    );

    // Step 5: Limit results
    return combinedResults.slice(0, 12);
}

function getDynamicThreshold(queryLength) {
    if (queryLength <= 3) return 0.1;
    if (queryLength <= 5) return 0.2;
    if (queryLength <= 8) return 0.25;
    return 0.3;
}

function combineSearchResultsWithSemantics(semanticMatches, exactMatches, fuzzyResults, query, availableMeals) {
    const results = new Map();

    // Add semantic matches with highest priority (NEW)
    semanticMatches.forEach(meal => {
        const priority = getSemanticMatchPriority(meal, query);
        results.set(meal.name, { meal, score: priority, type: 'semantic' });
    });

    // Add exact matches with high priority (but lower than semantic)
    exactMatches.forEach(meal => {
        if (!results.has(meal.name)) {
            const priority = getExactMatchPriority(meal, query) + 0.2; // Add offset for semantic priority
            results.set(meal.name, { meal, score: priority, type: 'exact' });
        }
    });

    // Add fuzzy matches that aren't already in results and are in available meals
    fuzzyResults.forEach(result => {
        const isAvailable = availableMeals.some(m => m.name === result.item.name);
        if (!results.has(result.item.name) && result.score <= 0.4 && isAvailable) {
            const adjustedScore = 0.7 + result.score; // Lower priority than exact and semantic matches
            results.set(result.item.name, { meal: result.item, score: adjustedScore, type: 'fuzzy' });
        }
    });

    // Sort by score (lower is better) and return meals
    return Array.from(results.values())
        .sort((a, b) => a.score - b.score)
        .map(result => result.meal);
}

function getSemanticMatchPriority(meal, query) {
    const mealName = meal.name.toLowerCase();
    const queryLower = query.toLowerCase();

    // Direct ingredient match in name gets highest semantic priority
    if (mealName.includes(queryLower)) return 0.01;

    // Search terms semantic match
    if (meal.searchTerms.some(term => term.toLowerCase().includes(queryLower))) return 0.02;

    // Core ingredients semantic match
    if (meal.ingredients.core.some(ingredient => ingredient.toLowerCase().includes(queryLower))) return 0.03;

    // Expanded semantic terms match (e.g., "fish" matches "salmon")
    const expandedTerms = expandSearchTermsWithSemantics(queryLower);
    for (const term of expandedTerms) {
        if (term !== queryLower) { // Skip the original query
            if (mealName.includes(term)) return 0.04;
            if (meal.searchTerms.some(searchTerm => searchTerm.toLowerCase().includes(term))) return 0.05;
            if (meal.ingredients.core.some(ingredient => ingredient.toLowerCase().includes(term))) return 0.06;
        }
    }

    return 0.1; // Default semantic match score
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


function copyAllMealsToClipboard() {
    const mealNames = meals.map(meal => meal.name).join('\n');

    navigator.clipboard.writeText(mealNames).then(() => {
        const btn = document.getElementById('sendToAI');
        btn.classList.add('copied');
        btn.textContent = '✅ Copied!';

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = '🤖 Send to AI';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy meal names to clipboard');
    });
}


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
    closeModal,
    copyAllMealsToClipboard,
    expandSearchTermsWithSemantics,
    performSemanticSearch,
    performSingleTermSemanticSearch,
    performMultiTermSemanticSearch,
    mealMatchesTerm,
    combineSearchResultsWithSemantics,
    getSemanticMatchPriority,
    buildSearchableTerms,
    initializeTagifySearch,
    initializeFallbackSearch,
    performTagSearch
};