document.addEventListener("DOMContentLoaded", () => {
    const addFoodForm = document.getElementById("addFoodForm");
    const foodLogList = document.getElementById("foodLogList");

    const totalCaloriesEl = document.getElementById("totalCalories");
    const totalProteinEl = document.getElementById("totalProtein");
    const totalCarbsEl = document.getElementById("totalCarbs");
    const totalFatEl = document.getElementById("totalFat");

    // Function to get today's date in YYYY-MM-DD format
    const getTodaysDateString = () => new Date().toISOString().split('T')[0];

    // Load diet log from local storage for the current day
    const loadDietLog = () => {
        const fullLog = JSON.parse(localStorage.getItem("dietLog") || "{}");
        const today = getTodaysDateString();
        return fullLog[today] || [];
    };

    // Save diet log to local storage for the current day
    const saveDietLog = (dailyLog) => {
        const fullLog = JSON.parse(localStorage.getItem("dietLog") || "{}");
        const today = getTodaysDateString();
        fullLog[today] = dailyLog;
        localStorage.setItem("dietLog", JSON.stringify(fullLog));
    };

    // Render the list of food items
    const renderDietLog = () => {
        const dailyLog = loadDietLog();
        foodLogList.innerHTML = ""; // Clear existing list

        if (dailyLog.length === 0) {
            foodLogList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🥗</div>
                    <p>No food logged for today.</p>
                    <span>Use the form above to add your first meal!</span>
                </div>`;
            return;
        }

        dailyLog.forEach((food, index) => {
            const foodItem = document.createElement("div");
            foodItem.className = "food-item";
            foodItem.innerHTML = `
                <div class="food-item-details">
                    <strong>${food.name}</strong>
                    <div class="food-item-macros">
                        <span>🔥 ${food.calories} kcal</span>
                        <span>🍗 ${food.protein}g P</span>
                        <span>🍞 ${food.carbs}g C</span>
                        <span>🥑 ${food.fat}g F</span>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">🗑️ Remove</button>
            `;
            foodLogList.appendChild(foodItem);
        });
    };

    // Calculate and display the summary of macros
    const updateSummary = () => {
        const dailyLog = loadDietLog();
        const totals = dailyLog.reduce((acc, food) => {
            acc.calories += food.calories;
            acc.protein += food.protein;
            acc.carbs += food.carbs;
            acc.fat += food.fat;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

        totalCaloriesEl.textContent = totals.calories;
        totalProteinEl.textContent = `${totals.protein}g`;
        totalCarbsEl.textContent = `${totals.carbs}g`;
        totalFatEl.textContent = `${totals.fat}g`;
    };

    // Handle adding a new food item
    const handleAddFood = (e) => {
        e.preventDefault();
        const newFood = {
            name: document.getElementById("foodName").value.trim(),
            calories: parseInt(document.getElementById("calories").value, 10) || 0,
            protein: parseInt(document.getElementById("protein").value, 10) || 0,
            carbs: parseInt(document.getElementById("carbs").value, 10) || 0,
            fat: parseInt(document.getElementById("fat").value, 10) || 0,
        };

        if (!newFood.name) {
            alert("Please enter a food name.");
            return;
        }

        const dailyLog = loadDietLog();
        dailyLog.push(newFood);
        saveDietLog(dailyLog);

        renderDietLog();
        updateSummary();
        addFoodForm.reset();
        document.getElementById("foodName").focus();
    };

    // Handle deleting a food item
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

    // Attach event listeners
    addFoodForm.addEventListener("submit", handleAddFood);
    foodLogList.addEventListener("click", handleDeleteFood);

    // Initial render on page load
    renderDietLog();
    updateSummary();
});