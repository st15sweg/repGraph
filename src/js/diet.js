document.addEventListener("DOMContentLoaded", () => {
    // ===== ELEMENTS =====
    const addFoodForm = document.getElementById("addFoodForm");
    const foodLogList = document.getElementById("foodLogList");
    const foodNameInput = document.getElementById("foodName");
    const foodQuantityInput = document.getElementById("foodQuantity");
    const quantityUnitLabel = document.getElementById("quantityUnit");
    const autocompleteResults = document.getElementById("autocompleteResults");

    const totalCaloriesEl = document.getElementById("totalCalories");
    const totalProteinEl = document.getElementById("totalProtein");
    const totalQualityProteinEl = document.getElementById("totalQualityProtein");
    const totalCarbsEl = document.getElementById("totalCarbs");
    const totalFatEl = document.getElementById("totalFat");

    // ===== STATE =====
    let selectedFood = null; // To store the currently selected food object from the database

    // ===== LOCAL FOOD DATABASE (Restructured) =====
    // Nutrition facts are now based on a `baseQuantity` (e.g., per 100g or per 1 unit)
    const foodDatabase = [
        { name: "Chicken Breast", servingUnit: "g", baseQuantity: 100, calories: 165, protein: 31, carbs: 0, fat: 3.6, pdcaas: 1.0 },
        { name: "Whey Protein", servingUnit: "scoop", baseQuantity: 1, calories: 120, protein: 24, carbs: 3, fat: 1, pdcaas: 1.0 },
        { name: "Egg", servingUnit: "unit", baseQuantity: 1, calories: 78, protein: 6, carbs: 0.6, fat: 5, pdcaas: 1.0 },
        { name: "Beef Sirloin", servingUnit: "g", baseQuantity: 100, calories: 200, protein: 29, carbs: 0, fat: 9, pdcaas: 0.92 },
        { name: "Salmon", servingUnit: "g", baseQuantity: 100, calories: 208, protein: 20, carbs: 0, fat: 13, pdcaas: 0.99 },
        { name: "White Rice (cooked)", servingUnit: "g", baseQuantity: 100, calories: 130, protein: 2.7, carbs: 28, fat: 0.3, pdcaas: 0.59 },
        { name: "Brown Rice (cooked)", servingUnit: "g", baseQuantity: 100, calories: 112, protein: 2.3, carbs: 23.5, fat: 0.8, pdcaas: 0.59 },
        { name: "Oats (dry)", servingUnit: "g", baseQuantity: 100, calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, pdcaas: 0.57 },
        { name: "Banana", servingUnit: "unit", baseQuantity: 1, calories: 105, protein: 1.3, carbs: 27, fat: 0.4, pdcaas: 0.76 },
        { name: "Peanut Butter", servingUnit: "g", baseQuantity: 100, calories: 588, protein: 25, carbs: 20, fat: 50, pdcaas: 0.47 },
        { name: "Lentils (cooked)", servingUnit: "g", baseQuantity: 100, calories: 116, protein: 9, carbs: 20, fat: 0.4, pdcaas: 0.70 },
        { name: "Tofu", servingUnit: "g", baseQuantity: 100, calories: 76, protein: 8, carbs: 1.9, fat: 4.8, pdcaas: 0.91 },
    ];

    // ===== FUNCTIONS =====
    const getTodaysDateString = () => new Date().toISOString().split('T')[0];
    const loadDietLog = () => JSON.parse(localStorage.getItem("dietLog") || "{}")[getTodaysDateString()] || [];
    const saveDietLog = (dailyLog) => {
        const fullLog = JSON.parse(localStorage.getItem("dietLog") || "{}");
        fullLog[getTodaysDateString()] = dailyLog;
        localStorage.setItem("dietLog", JSON.stringify(fullLog));
    };

    // NEW: Calculate nutrition based on user quantity
    const calculateAndUpdateNutrition = () => {
        if (!selectedFood) return;

        const userQuantity = parseFloat(foodQuantityInput.value) || 0;
        const multiplier = userQuantity / selectedFood.baseQuantity;

        document.getElementById("calories").value = (selectedFood.calories * multiplier).toFixed(1);
        document.getElementById("protein").value = (selectedFood.protein * multiplier).toFixed(1);
        document.getElementById("carbs").value = (selectedFood.carbs * multiplier).toFixed(1);
        document.getElementById("fat").value = (selectedFood.fat * multiplier).toFixed(1);
        document.getElementById("pdcaas").value = selectedFood.pdcaas.toFixed(2);
    };

    const handleFoodSearch = (e) => {
        const query = e.target.value.toLowerCase();
        autocompleteResults.innerHTML = "";
        if (query.length < 2) {
            selectedFood = null; // Reset if user clears input
            return;
        }
        const matches = foodDatabase.filter(food => food.name.toLowerCase().includes(query));
        matches.forEach(food => {
            const div = document.createElement("div");
            div.textContent = `${food.name} (per ${food.baseQuantity}${food.servingUnit})`;
            div.className = "autocomplete-item";
            div.addEventListener("click", () => selectFood(food));
            autocompleteResults.appendChild(div);
        });
    };

    const selectFood = (food) => {
        selectedFood = food; // Store the selected food object
        foodNameInput.value = food.name;
        quantityUnitLabel.textContent = food.servingUnit;
        foodQuantityInput.value = food.baseQuantity; // Default to the base quantity
        autocompleteResults.innerHTML = "";
        calculateAndUpdateNutrition(); // Perform initial calculation
    };

    const handleAddFood = (e) => {
        e.preventDefault();
        const newFood = {
            name: foodNameInput.value.trim(),
            calories: parseFloat(document.getElementById("calories").value) || 0,
            protein: parseFloat(document.getElementById("protein").value) || 0,
            carbs: parseFloat(document.getElementById("carbs").value) || 0,
            fat: parseFloat(document.getElementById("fat").value) || 0,
            pdcaas: parseFloat(document.getElementById("pdcaas").value) || 1.0,
        };

        if (!newFood.name || newFood.calories <= 0) {
            alert("Please select a food and enter a valid quantity.");
            return;
        }

        const dailyLog = loadDietLog();
        dailyLog.push(newFood);
        saveDietLog(dailyLog);

        renderDietLog();
        updateSummary();
        addFoodForm.reset(); // Resets all form fields
        quantityUnitLabel.textContent = 'g'; // Reset label
        selectedFood = null; // Clear selected food state
        foodNameInput.focus();
    };

    const renderDietLog = () => {
        const dailyLog = loadDietLog();
        foodLogList.innerHTML = "";
        if (dailyLog.length === 0) {
            foodLogList.innerHTML = `<div class="empty-state">...</div>`;
            return;
        }
        dailyLog.forEach((food, index) => {
            const foodItem = document.createElement("div");
            foodItem.className = "food-item";
            foodItem.innerHTML = `
                <div class="food-item-details">
                    <strong>${food.name}</strong>
                    <div class="food-item-macros">
                        <span>🔥 ${food.calories.toFixed(1)} kcal</span>
                        <span>🍗 ${food.protein.toFixed(1)}g P</span>
                        <span>🍞 ${food.carbs.toFixed(1)}g C</span>
                        <span>🥑 ${food.fat.toFixed(1)}g F</span>
                        <span>✅ ${food.pdcaas.toFixed(2)} PDCAAS</span>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">🗑️ Remove</button>
            `;
            foodLogList.appendChild(foodItem);
        });
    };

    const updateSummary = () => {
        const dailyLog = loadDietLog();
        const totals = dailyLog.reduce((acc, food) => {
            acc.calories += food.calories;
            acc.protein += food.protein;
            acc.qualityProtein += food.protein * (food.pdcaas || 1);
            acc.carbs += food.carbs;
            acc.fat += food.fat;
            return acc;
        }, { calories: 0, protein: 0, qualityProtein: 0, carbs: 0, fat: 0 });
        totalCaloriesEl.textContent = totals.calories.toFixed(0);
        totalProteinEl.textContent = `${totals.protein.toFixed(1)}g`;
        totalQualityProteinEl.textContent = `${totals.qualityProtein.toFixed(1)}g`;
        totalCarbsEl.textContent = `${totals.carbs.toFixed(1)}g`;
        totalFatEl.textContent = `${totals.fat.toFixed(1)}g`;
    };

    const handleDeleteFood = (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = parseInt(e.target.dataset.index, 10);
            const dailyLog = loadDietLog();
            dailyLog.splice(index, 1);
            saveDietLog(dailyLog);
            renderDietLog();
            updateSummary();
        }
    };

    // ===== EVENT LISTENERS =====
    addFoodForm.addEventListener("submit", handleAddFood);
    foodLogList.addEventListener("click", handleDeleteFood);
    foodNameInput.addEventListener("input", handleFoodSearch);
    foodQuantityInput.addEventListener("input", calculateAndUpdateNutrition); // Recalculate on quantity change
    
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.autocomplete-container')) {
            autocompleteResults.innerHTML = "";
        }
    });

    // Initial render
    renderDietLog();
    updateSummary();
});