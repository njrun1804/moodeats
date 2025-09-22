const embeddedMeals = [
  {
    "name": "Greek Yogurt Parfait with Berries & Muesli",
    "category": "breakfast",
    "moods": ["breakfast", "fresh", "quick"],
    "ingredients": {
      "core": ["Greek yogurt", "Mixed berries", "Muesli"],
      "pantry": ["Honey or maple syrup", "Salt (pinch)"]
    },
    "searchTerms": ["yogurt", "berries", "healthy", "light", "fruit", "morning", "easy"]
  },
  {
    "name": "Oatmeal with Banana & PB",
    "category": "breakfast",
    "moods": ["breakfast", "cozy", "quick"],
    "ingredients": {
      "core": ["Oats", "Banana", "Peanut butter"],
      "pantry": ["Water or milk", "Cinnamon (optional)"]
    },
    "searchTerms": ["oats", "oatmeal", "banana", "peanut butter", "warm", "filling", "comfort"]
  },
  {
    "name": "Scrambled Eggs on Buttered Rye",
    "category": "breakfast",
    "moods": ["breakfast", "cozy", "quick"],
    "ingredients": {
      "core": ["Eggs", "Rye bread", "Cherry tomatoes"],
      "pantry": ["Butter", "Olive oil", "Garlic", "Flaky salt"]
    },
    "searchTerms": ["eggs", "scrambled", "rye", "toast", "tomatoes", "savory", "protein", "bread"]
  },
  {
    "name": "Spinach & Mozzarella Omelet",
    "category": "breakfast",
    "moods": ["breakfast", "cozy"],
    "ingredients": {
      "core": ["Eggs", "Spinach", "Mozzarella or provolone"],
      "pantry": ["Butter", "Salt", "Pepper"]
    },
    "searchTerms": ["omelet", "eggs", "spinach", "cheese", "melty", "protein", "veggie"]
  },
  {
    "name": "Bagel with Lox & Cream Cheese",
    "category": "breakfast",
    "moods": ["breakfast", "fresh"],
    "ingredients": {
      "core": ["Bagel", "Smoked salmon", "Cream cheese"],
      "pantry": ["Dill", "Capers (rinsed)", "Lemon zest (optional)"]
    },
    "searchTerms": ["bagel", "lox", "salmon", "cream cheese", "deli", "jewish", "brunch"]
  },
  {
    "name": "Breakfast Burrito",
    "category": "breakfast",
    "moods": ["breakfast", "hearty"],
    "ingredients": {
      "core": ["Eggs", "Potatoes", "Cheese", "Tortilla"],
      "pantry": ["Mild salsa (cilantro-free)", "Guacamole (optional)"]
    },
    "searchTerms": ["burrito", "eggs", "potato", "cheese", "wrap", "mexican", "filling"]
  },
  {
    "name": "Avocado Toast with Egg",
    "category": "breakfast",
    "moods": ["breakfast", "fresh", "quick"],
    "ingredients": {
      "core": ["Avocado", "Bread", "Egg"],
      "pantry": ["Salt", "Olive oil"]
    },
    "searchTerms": ["avocado", "toast", "egg", "healthy", "trendy", "millennial", "brunch", "bread"]
  },
  {
    "name": "Savory Oats with Egg",
    "category": "breakfast",
    "moods": ["breakfast", "cozy"],
    "ingredients": {
      "core": ["Oats", "Egg", "Parmesan"],
      "pantry": ["Chicken stock", "Black pepper"]
    },
    "searchTerms": ["oats", "savory", "egg", "different", "unique", "umami", "broth"]
  },
  {
    "name": "Rye Toast with Burrata & Warm Tomatoes",
    "category": "breakfast",
    "moods": ["breakfast", "fresh"],
    "ingredients": {
      "core": ["Rye bread", "Burrata", "Cherry tomatoes"],
      "pantry": ["Olive oil", "Garlic", "Salt", "Lemon zest (optional)"]
    },
    "searchTerms": ["burrata", "tomatoes", "toast", "fancy", "italian", "creamy", "warm", "bread", "rye"]
  },
  {
    "name": "Fruit & Nuts Plate",
    "category": "breakfast",
    "moods": ["breakfast", "fresh", "quick"],
    "ingredients": {
      "core": ["Assorted fruits", "Mixed nuts"],
      "pantry": ["Honey (optional)"]
    },
    "searchTerms": ["fruit", "nuts", "healthy", "light", "fresh", "simple", "raw"]
  },
  {
    "name": "Egg & Cheese Bagel",
    "category": "breakfast",
    "moods": ["breakfast", "quick", "hearty"],
    "ingredients": {
      "core": ["Bagel", "Eggs", "American cheese"],
      "pantry": ["Butter", "Salt", "Pepper"]
    },
    "searchTerms": ["bagel", "egg", "cheese", "sandwich", "deli", "classic", "bodega"]
  },
  {
    "name": "Turkey Sausage, Egg & Cheese on Rye",
    "category": "breakfast",
    "moods": ["breakfast", "hearty"],
    "ingredients": {
      "core": ["Turkey sausage", "Eggs", "Cheese", "Rye bread"],
      "pantry": ["Butter"]
    },
    "searchTerms": ["breakfast sandwich", "sausage", "egg", "cheese", "rye", "hearty", "protein"]
  },
  {
    "name": "Lox, Eggs & Onions Scramble",
    "category": "breakfast",
    "moods": ["breakfast", "cozy"],
    "ingredients": {
      "core": ["Eggs", "Lox", "Onions"],
      "pantry": ["Butter", "Black pepper", "Dill (optional)"]
    },
    "searchTerms": ["lox", "eggs", "onions", "scramble", "jewish", "classic", "savory"]
  },
  {
    "name": "Spaghetti with Turkey Bolognese",
    "category": "italian",
    "moods": ["italian", "cozy", "hearty"],
    "ingredients": {
      "core": ["Spaghetti", "Ground turkey", "Passata"],
      "pantry": ["Garlic", "Onions", "Olive oil", "Parmesan", "Salt", "Pepper"]
    },
    "searchTerms": ["spaghetti", "bolognese", "turkey", "meat sauce", "italian", "pasta", "red sauce"]
  },
  {
    "name": "Turkey Meatballs in Marinara",
    "category": "italian",
    "moods": ["italian", "cozy", "hearty"],
    "ingredients": {
      "core": ["Ground turkey", "Breadcrumbs", "Egg", "Passata"],
      "pantry": ["Garlic", "Parmesan", "Olive oil", "Salt", "Pepper"]
    },
    "searchTerms": ["meatballs", "turkey", "marinara", "italian", "comfort", "classic"]
  },
  {
    "name": "Shrimp Garlic-Butter Pasta",
    "category": "italian",
    "moods": ["italian", "seafood", "quick"],
    "ingredients": {
      "core": ["Shrimp", "Pasta", "Butter"],
      "pantry": ["Garlic", "Lemon zest", "Parmesan", "Red pepper flakes (optional)"]
    },
    "searchTerms": ["shrimp", "scampi", "garlic", "butter", "pasta", "seafood", "quick"]
  },
  {
    "name": "Tuna, Olive & Capers Rigatoni",
    "category": "italian",
    "moods": ["italian", "seafood", "quick"],
    "ingredients": {
      "core": ["Canned tuna", "Rigatoni", "Olives", "Capers"],
      "pantry": ["Garlic", "Olive oil", "Lemon zest"]
    },
    "searchTerms": ["tuna", "pasta", "olives", "capers", "mediterranean", "pantry", "quick"]
  },
  {
    "name": "Sausage & Peppers with Orzo",
    "category": "italian",
    "moods": ["italian", "hearty", "cozy"],
    "ingredients": {
      "core": ["Italian sausage", "Bell peppers", "Orzo"],
      "pantry": ["Garlic", "Olive oil", "Chicken stock", "Parmesan"]
    },
    "searchTerms": ["sausage", "peppers", "orzo", "italian american", "classic", "hearty"]
  },
  {
    "name": "Pea & Parmesan Orzotto",
    "category": "italian",
    "moods": ["italian", "fresh"],
    "ingredients": {
      "core": ["Orzo", "Peas", "Parmesan"],
      "pantry": ["Chicken stock", "Butter", "Garlic", "Salt", "Pepper"]
    },
    "searchTerms": ["orzo", "peas", "risotto", "creamy", "vegetarian", "light"]
  },
  {
    "name": "Chicken Parmesan (Baked)",
    "category": "italian",
    "moods": ["italian", "hearty"],
    "ingredients": {
      "core": ["Breaded chicken", "Mozzarella", "Passata"],
      "pantry": ["Parmesan", "Olive oil", "Garlic"]
    },
    "searchTerms": ["chicken parm", "italian american", "melty", "classic", "breaded"]
  },
  {
    "name": "Cacio e Pepe (Parmesan)",
    "category": "italian",
    "moods": ["italian", "quick"],
    "ingredients": {
      "core": ["Pasta", "Parmesan"],
      "pantry": ["Black pepper", "Butter", "Salt"]
    },
    "searchTerms": ["cacio e pepe", "cheese", "pepper", "simple", "roman", "classic"]
  },
  {
    "name": "Pasta e Piselli (Pasta with Peas)",
    "category": "italian",
    "moods": ["italian", "quick", "fresh"],
    "ingredients": {
      "core": ["Small pasta", "Peas"],
      "pantry": ["Garlic", "Olive oil", "Parmesan", "Salt", "Pepper"]
    },
    "searchTerms": ["pasta", "peas", "simple", "quick", "light", "green"]
  },
  {
    "name": "Chicken Teriyaki",
    "category": "japanese",
    "moods": ["asian", "quick"],
    "ingredients": {
      "core": ["Chicken thighs", "Rice"],
      "pantry": ["Soy sauce", "Sugar", "Mirin or honey", "Garlic", "Ginger"]
    },
    "searchTerms": ["teriyaki", "chicken", "japanese", "sweet", "savory", "rice", "glazed"]
  },
  {
    "name": "Salmon Teriyaki",
    "category": "japanese",
    "moods": ["asian", "seafood", "quick"],
    "ingredients": {
      "core": ["Salmon", "Rice"],
      "pantry": ["Soy sauce", "Sugar", "Mirin or honey", "Garlic", "Ginger"]
    },
    "searchTerms": ["teriyaki", "salmon", "japanese", "glazed", "seafood", "rice"]
  },
  {
    "name": "Chicken Katsu Curry",
    "category": "japanese",
    "moods": ["asian", "hearty", "cozy"],
    "ingredients": {
      "core": ["Breaded chicken", "Rice", "Curry roux or powder"],
      "pantry": ["Onions", "Carrots", "Potatoes", "Oil"]
    },
    "searchTerms": ["katsu", "curry", "japanese", "breaded", "comfort", "rice"]
  },
  {
    "name": "Oyakodon (Chicken & Egg Rice Bowl)",
    "category": "japanese",
    "moods": ["asian", "cozy", "quick"],
    "ingredients": {
      "core": ["Chicken", "Eggs", "Rice", "Onions"],
      "pantry": ["Soy sauce", "Sugar", "Dashi or chicken stock"]
    },
    "searchTerms": ["oyakodon", "rice bowl", "chicken", "egg", "comfort", "donburi"]
  },
  {
    "name": "Yaki Udon",
    "category": "japanese",
    "moods": ["asian", "quick"],
    "ingredients": {
      "core": ["Udon noodles", "Protein (chicken/shrimp)", "Cabbage"],
      "pantry": ["Soy sauce", "Oyster sauce", "Garlic", "Oil"]
    },
    "searchTerms": ["yaki udon", "stir fry", "noodles", "japanese", "quick", "cabbage"]
  },
  {
    "name": "Gyudon (Beef & Onion Bowl)",
    "category": "japanese",
    "moods": ["asian", "hearty", "quick"],
    "ingredients": {
      "core": ["Sliced beef", "Onions", "Rice"],
      "pantry": ["Soy sauce", "Sugar", "Dashi or beef stock", "Ginger"]
    },
    "searchTerms": ["gyudon", "beef bowl", "rice", "onions", "japanese", "comfort"]
  },
  {
    "name": "Miso-Glazed Salmon",
    "category": "japanese",
    "moods": ["asian", "seafood"],
    "ingredients": {
      "core": ["Salmon", "Miso paste", "Rice"],
      "pantry": ["Sugar", "Sake or mirin", "Sesame oil"]
    },
    "searchTerms": ["miso", "salmon", "glazed", "japanese", "umami", "seafood", "fish"]
  },
  {
    "name": "Yakitori-Style Chicken (Broiler)",
    "category": "japanese",
    "moods": ["asian", "quick"],
    "ingredients": {
      "core": ["Chicken thighs", "Rice"],
      "pantry": ["Soy sauce", "Sugar", "Sake or mirin", "Garlic", "Ginger"]
    },
    "searchTerms": ["yakitori", "grilled", "chicken", "japanese", "skewers", "broiled"]
  },
  {
    "name": "Nikujaga (Soy-Potato Beef Stew)",
    "category": "japanese",
    "moods": ["asian", "cozy", "hearty"],
    "ingredients": {
      "core": ["Beef", "Potatoes", "Onions"],
      "pantry": ["Soy sauce", "Sugar", "Dashi or beef stock", "Sake or mirin"]
    },
    "searchTerms": ["nikujaga", "stew", "beef", "potato", "japanese", "comfort", "home cooking"]
  },
  {
    "name": "Chicken & Broccoli Stir-Fry",
    "category": "chinese",
    "moods": ["asian", "quick", "fresh"],
    "ingredients": {
      "core": ["Chicken", "Broccoli", "Rice"],
      "pantry": ["Soy sauce", "Garlic", "Ginger", "Oyster sauce", "Oil"]
    },
    "searchTerms": ["stir fry", "chicken", "broccoli", "chinese", "quick", "healthy", "wok"]
  },
  {
    "name": "Shrimp Fried Rice",
    "category": "chinese",
    "moods": ["asian", "seafood", "quick"],
    "ingredients": {
      "core": ["Shrimp", "Rice (day-old)", "Eggs", "Peas"],
      "pantry": ["Soy sauce", "Garlic", "Oil", "Sesame oil"]
    },
    "searchTerms": ["fried rice", "shrimp", "chinese", "leftover rice", "quick", "wok"]
  },
  {
    "name": "Chicken Lo Mein",
    "category": "chinese",
    "moods": ["asian", "quick"],
    "ingredients": {
      "core": ["Lo mein noodles", "Chicken", "Vegetables"],
      "pantry": ["Soy sauce", "Oyster sauce", "Garlic", "Ginger", "Oil"]
    },
    "searchTerms": ["lo mein", "noodles", "chicken", "chinese", "takeout", "stir fry"]
  },
  {
    "name": "Egg Drop Soup",
    "category": "chinese",
    "moods": ["asian", "cozy", "quick"],
    "ingredients": {
      "core": ["Eggs", "Chicken stock"],
      "pantry": ["Cornstarch", "Soy sauce", "White pepper", "Sesame oil"]
    },
    "searchTerms": ["egg drop", "soup", "chinese", "comfort", "quick", "light"]
  },
  {
    "name": "Beef & Broccoli",
    "category": "chinese",
    "moods": ["asian", "hearty"],
    "ingredients": {
      "core": ["Beef", "Broccoli", "Rice"],
      "pantry": ["Soy sauce", "Oyster sauce", "Garlic", "Ginger", "Cornstarch"]
    },
    "searchTerms": ["beef", "broccoli", "chinese", "stir fry", "takeout", "classic"]
  },
  {
    "name": "Mongolian Beef",
    "category": "chinese",
    "moods": ["asian", "hearty"],
    "ingredients": {
      "core": ["Beef", "Green onions", "Rice"],
      "pantry": ["Soy sauce", "Brown sugar", "Garlic", "Ginger", "Oil"]
    },
    "searchTerms": ["mongolian", "beef", "sweet", "savory", "chinese american", "takeout"]
  },
  {
    "name": "Sesame Chicken (Mild, No Vinegar)",
    "category": "chinese",
    "moods": ["asian", "hearty"],
    "ingredients": {
      "core": ["Breaded chicken", "Rice"],
      "pantry": ["Soy sauce", "Honey", "Garlic", "Sesame seeds", "Oil"]
    },
    "searchTerms": ["sesame", "chicken", "sweet", "chinese american", "takeout", "crispy"]
  },
  {
    "name": "Chicken & Snow Peas Stir-Fry",
    "category": "chinese",
    "moods": ["asian", "fresh", "quick"],
    "ingredients": {
      "core": ["Chicken", "Snow peas", "Rice"],
      "pantry": ["Soy sauce", "Garlic", "Ginger", "Oyster sauce", "Oil"]
    },
    "searchTerms": ["stir fry", "chicken", "snow peas", "vegetables", "light", "quick"]
  },
  {
    "name": "Turkey Taco Rice Bowl",
    "category": "tex-mex",
    "moods": ["hearty", "quick"],
    "ingredients": {
      "core": ["Ground turkey", "Rice", "Black beans", "Cheese"],
      "pantry": ["Taco seasoning (no cilantro)", "Salsa (mild)", "Sour cream"]
    },
    "searchTerms": ["taco", "bowl", "turkey", "rice", "mexican", "tex mex", "beans"]
  },
  {
    "name": "Chicken Quesadillas",
    "category": "tex-mex",
    "moods": ["quick", "hearty"],
    "ingredients": {
      "core": ["Chicken", "Cheese", "Tortillas"],
      "pantry": ["Oil", "Salsa (mild)", "Sour cream"]
    },
    "searchTerms": ["quesadilla", "chicken", "cheese", "melty", "mexican", "quick"]
  },
  {
    "name": "Chicken Fajitas",
    "category": "tex-mex",
    "moods": ["fresh", "quick"],
    "ingredients": {
      "core": ["Chicken", "Bell peppers", "Onions", "Tortillas"],
      "pantry": ["Fajita seasoning (no cilantro)", "Oil", "Sour cream"]
    },
    "searchTerms": ["fajitas", "chicken", "peppers", "mexican", "sizzling", "wrap"]
  },
  {
    "name": "Turkey Chili with Beans",
    "category": "tex-mex",
    "moods": ["cozy", "hearty"],
    "ingredients": {
      "core": ["Ground turkey", "Beans", "Tomatoes"],
      "pantry": ["Chili powder", "Cumin", "Garlic", "Onions", "Stock"]
    },
    "searchTerms": ["chili", "turkey", "beans", "stew", "comfort", "hearty", "bowl"]
  },
  {
    "name": "Chicken Soft Tacos (Skillet, Mild)",
    "category": "tex-mex",
    "moods": ["quick", "fresh"],
    "ingredients": {
      "core": ["Chicken", "Soft tortillas", "Lettuce", "Cheese"],
      "pantry": ["Taco seasoning (mild)", "Salsa (mild)", "Sour cream"]
    },
    "searchTerms": ["tacos", "chicken", "soft", "mexican", "quick", "easy"]
  },
  {
    "name": "Refried Bean & Cheese Quesadillas",
    "category": "tex-mex",
    "moods": ["quick", "cozy"],
    "ingredients": {
      "core": ["Refried beans", "Cheese", "Tortillas"],
      "pantry": ["Oil", "Salsa (mild)", "Sour cream"]
    },
    "searchTerms": ["quesadilla", "beans", "vegetarian", "cheese", "quick", "simple"]
  },
  {
    "name": "Turkey Enchilada Skillet",
    "category": "tex-mex",
    "moods": ["hearty", "cozy"],
    "ingredients": {
      "core": ["Ground turkey", "Tortillas", "Cheese", "Enchilada sauce (mild)"],
      "pantry": ["Onions", "Garlic", "Oil"]
    },
    "searchTerms": ["enchilada", "turkey", "skillet", "mexican", "cheesy", "baked"]
  },
  {
    "name": "Pan-Seared Whitefish with Asparagus",
    "category": "seafood",
    "moods": ["seafood", "fresh", "quick"],
    "ingredients": {
      "core": ["White fish", "Asparagus"],
      "pantry": ["Butter", "Lemon", "Garlic", "Salt", "Pepper"]
    },
    "searchTerms": ["fish", "whitefish", "asparagus", "pan seared", "light", "healthy"]
  },
  {
    "name": "Salmon with Smashed Potatoes",
    "category": "seafood",
    "moods": ["seafood", "hearty"],
    "ingredients": {
      "core": ["Salmon", "Small potatoes"],
      "pantry": ["Olive oil", "Garlic", "Dill", "Salt", "Pepper"]
    },
    "searchTerms": ["salmon", "potatoes", "smashed", "crispy", "dill", "hearty", "fish"]
  },
  {
    "name": "Linguine with Clams",
    "category": "seafood",
    "moods": ["seafood", "italian"],
    "ingredients": {
      "core": ["Linguine", "Clams"],
      "pantry": ["Garlic", "White wine (optional)", "Olive oil", "Parsley", "Red pepper flakes"]
    },
    "searchTerms": ["linguine", "clams", "pasta", "seafood", "italian", "white sauce"]
  },
  {
    "name": "Mussels in Tomato-Garlic Broth",
    "category": "seafood",
    "moods": ["seafood", "cozy"],
    "ingredients": {
      "core": ["Mussels", "Tomatoes", "Bread for dipping"],
      "pantry": ["Garlic", "White wine (optional)", "Olive oil", "Parsley"]
    },
    "searchTerms": ["mussels", "tomato", "broth", "seafood", "garlic", "bread"]
  },
  {
    "name": "Crab Cakes",
    "category": "seafood",
    "moods": ["seafood", "fresh"],
    "ingredients": {
      "core": ["Crab meat", "Breadcrumbs", "Egg"],
      "pantry": ["Mayo", "Mustard", "Old Bay seasoning", "Lemon"]
    },
    "searchTerms": ["crab", "cakes", "seafood", "appetizer", "maryland", "crispy"]
  },
  {
    "name": "Baked Cod Oreganata",
    "category": "seafood",
    "moods": ["seafood", "quick"],
    "ingredients": {
      "core": ["Cod", "Breadcrumbs"],
      "pantry": ["Olive oil", "Oregano", "Garlic", "Lemon", "Parmesan"]
    },
    "searchTerms": ["cod", "baked", "oreganata", "italian", "breadcrumbs", "light"]
  },
  {
    "name": "Salmon with Dill Mayo",
    "category": "seafood",
    "moods": ["seafood", "quick"],
    "ingredients": {
      "core": ["Salmon", "Dill"],
      "pantry": ["Mayo", "Lemon", "Garlic", "Salt", "Pepper"]
    },
    "searchTerms": ["salmon", "dill", "mayo", "creamy", "quick", "easy", "fish"]
  },
  {
    "name": "Crab Linguine (Zest, Not Juicy)",
    "category": "seafood",
    "moods": ["seafood", "italian"],
    "ingredients": {
      "core": ["Linguine", "Crab meat"],
      "pantry": ["Butter", "Garlic", "Lemon zest", "Parsley", "Red pepper flakes"]
    },
    "searchTerms": ["crab", "linguine", "pasta", "seafood", "butter", "lemon"]
  },
  {
    "name": "Chicken Noodle Soup",
    "category": "soup",
    "moods": ["cozy", "quick"],
    "ingredients": {
      "core": ["Chicken", "Egg noodles", "Carrots", "Celery"],
      "pantry": ["Chicken stock", "Onions", "Garlic", "Parsley"]
    },
    "searchTerms": ["soup", "chicken", "noodle", "comfort", "classic", "sick", "warm"]
  },
  {
    "name": "Chicken Tortilla Soup",
    "category": "soup",
    "moods": ["cozy", "hearty"],
    "ingredients": {
      "core": ["Chicken", "Black beans", "Corn", "Tortilla strips"],
      "pantry": ["Chicken stock", "Tomatoes", "Cumin", "Chili powder"]
    },
    "searchTerms": ["tortilla soup", "chicken", "mexican", "beans", "corn", "spicy"]
  },
  {
    "name": "Split Pea Soup with Turkey",
    "category": "soup",
    "moods": ["cozy", "hearty"],
    "ingredients": {
      "core": ["Split peas", "Turkey ham or bacon", "Carrots"],
      "pantry": ["Stock", "Onions", "Garlic", "Bay leaf"]
    },
    "searchTerms": ["split pea", "soup", "ham", "turkey", "hearty", "thick"]
  },
  {
    "name": "Bean & Kale Minestrone",
    "category": "soup",
    "moods": ["cozy", "fresh"],
    "ingredients": {
      "core": ["White beans", "Kale", "Small pasta"],
      "pantry": ["Vegetable stock", "Tomatoes", "Garlic", "Olive oil"]
    },
    "searchTerms": ["minestrone", "beans", "kale", "italian", "vegetable", "healthy"]
  },
  {
    "name": "Chicken Congee",
    "category": "soup",
    "moods": ["asian", "cozy"],
    "ingredients": {
      "core": ["Rice", "Chicken", "Ginger"],
      "pantry": ["Chicken stock", "Soy sauce", "Sesame oil", "Green onions"]
    },
    "searchTerms": ["congee", "porridge", "rice", "chicken", "asian", "comfort", "sick"]
  },
  {
    "name": "Italian Wedding Soup",
    "category": "soup",
    "moods": ["cozy", "italian"],
    "ingredients": {
      "core": ["Turkey meatballs", "Orzo", "Spinach"],
      "pantry": ["Chicken stock", "Parmesan rind", "Garlic", "Olive oil", "Salt", "Pepper"]
    },
    "searchTerms": ["soup", "italian", "meatballs", "greens", "classic", "comfort"]
  },
  {
    "name": "White Bean & Turkey Sausage Soup",
    "category": "soup",
    "moods": ["cozy", "hearty", "italian"],
    "ingredients": {
      "core": ["Turkey sausage", "Cannellini beans", "Kale or spinach"],
      "pantry": ["Chicken stock", "Garlic", "Olive oil"]
    },
    "searchTerms": ["white bean soup", "sausage", "italian", "hearty", "greens"]
  },
  {
    "name": "Chicken & Rice Soup",
    "category": "soup",
    "moods": ["cozy", "quick"],
    "ingredients": {
      "core": ["Chicken", "Rice", "Carrots", "Celery", "Onions"],
      "pantry": ["Chicken stock", "Dill or parsley"]
    },
    "searchTerms": ["soup", "chicken", "rice", "comfort", "classic", "quick"]
  },
  {
    "name": "Tuna Melt on Rye",
    "category": "sandwich",
    "moods": ["quick", "hearty"],
    "ingredients": {
      "core": ["Canned tuna", "Rye bread", "Provolone or gouda"],
      "pantry": ["Mayo", "Dill", "Lemon zest"]
    },
    "searchTerms": ["tuna", "melt", "sandwich", "rye", "cheese", "deli", "lunch", "toast", "bread", "grilled"]
  },
  {
    "name": "Turkey Avocado Club",
    "category": "sandwich",
    "moods": ["fresh", "quick"],
    "ingredients": {
      "core": ["Turkey", "Avocado", "Lettuce", "Tomato", "Bread (rye or sourdough)"],
      "pantry": ["Mayo"]
    },
    "searchTerms": ["club", "sandwich", "turkey", "avocado", "fresh", "lunch", "deli"]
  },
  {
    "name": "Cheesesteak-Style Skillet",
    "category": "sandwich",
    "moods": ["hearty", "quick"],
    "ingredients": {
      "core": ["Lean ground beef", "Onions", "Bell peppers", "Provolone", "Roll or rice"],
      "pantry": ["Oil", "Salt", "Pepper"]
    },
    "searchTerms": ["cheesesteak", "philly", "beef", "peppers", "melty", "sandwich", "skillet"]
  },
  {
    "name": "Chicken Parm Sandwich (Baked)",
    "category": "sandwich",
    "moods": ["hearty", "italian"],
    "ingredients": {
      "core": ["Breaded chicken", "Mozzarella", "Sub roll"],
      "pantry": ["Passata", "Parmesan", "Olive oil", "Garlic"]
    },
    "searchTerms": ["chicken parm", "sub", "melty", "italian american", "classic"]
  },
  {
    "name": "Turkey & Provolone Panini",
    "category": "sandwich",
    "moods": ["quick", "fresh"],
    "ingredients": {
      "core": ["Turkey", "Provolone", "Sourdough or rye"],
      "pantry": ["Mayonnaise", "Mustard", "Butter"]
    },
    "searchTerms": ["turkey sandwich", "panini", "deli", "classic", "mayo", "mustard"]
  },
  {
    "name": "Salmon Salad on Rye",
    "category": "sandwich",
    "moods": ["fresh", "quick", "seafood"],
    "ingredients": {
      "core": ["Canned salmon", "Rye bread", "Dill"],
      "pantry": ["Mayonnaise", "Capers (rinsed)", "Lemon zest", "Black pepper"]
    },
    "searchTerms": ["salmon salad", "rye", "deli", "lunch", "classic", "fish"]
  },
  {
    "name": "Seared Zucchini with Butter-Soy",
    "category": "side",
    "moods": ["fresh", "quick"],
    "ingredients": {
      "core": ["Zucchini"],
      "pantry": ["Butter", "Soy sauce", "Salt"]
    },
    "searchTerms": ["zucchini", "side", "vegetable", "quick", "seared", "butter"]
  },
  {
    "name": "Garlicky Green Beans",
    "category": "side",
    "moods": ["fresh", "quick"],
    "ingredients": {
      "core": ["Green beans", "Parmesan"],
      "pantry": ["Garlic", "Butter", "Olive oil"]
    },
    "searchTerms": ["green beans", "side", "vegetable", "garlic", "quick", "parmesan"]
  },
  {
    "name": "Roasted Carrots & Onions",
    "category": "side",
    "moods": ["cozy", "hearty"],
    "ingredients": {
      "core": ["Carrots", "Onions"],
      "pantry": ["Olive oil", "Salt", "Pepper"]
    },
    "searchTerms": ["carrots", "onions", "roasted", "side", "sweet", "caramelized"]
  },
  {
    "name": "Burst Cherry Tomatoes",
    "category": "side",
    "moods": ["fresh", "quick"],
    "ingredients": {
      "core": ["Cherry tomatoes"],
      "pantry": ["Olive oil", "Garlic", "Salt"]
    },
    "searchTerms": ["tomatoes", "cherry", "burst", "side", "sauce", "quick", "garlic"]
  },
  {
    "name": "Corn on the Cob with Butter & Salt",
    "category": "side",
    "moods": ["fresh", "cozy"],
    "ingredients": {
      "core": ["Corn on the cob"],
      "pantry": ["Butter", "Salt"]
    },
    "searchTerms": ["corn", "side", "summer", "classic", "butter"]
  },
  {
    "name": "Olive Oil–Stock Mashed Potatoes",
    "category": "side",
    "moods": ["cozy", "hearty"],
    "ingredients": {
      "core": ["Potatoes"],
      "pantry": ["Olive oil", "Chicken stock", "Salt", "Pepper"]
    },
    "searchTerms": ["mashed potatoes", "no cream", "olive oil", "comfort", "classic"]
  }
];

export { embeddedMeals };
