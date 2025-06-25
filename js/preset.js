// ===== GLOBAL VARIABLES & CONSTANTS =====
const exercisesByCategory = {
    Chest: ['Bench Press', 'Push-Up', 'Dumbbell Fly', 'Incline Dumbbell Press', 'Cable Crossover', 'Pec Deck', 'Incline Bench Press'],
    Back: ['Pull-Up', 'Bent-Over Row', 'Lat Pulldown', 'Deadlift', 'Seated Cable Row'],
    Biceps: ['Bicep Curl', 'Hammer Curl', 'Concentration Curl', 'Cable Bicep Curl', 'Preacher Curl'],
    Triceps: ['Tricep Dip', 'Overhead Tricep Extension', 'Skull Crusher', 'Tricep Pushdown', 'Close-Grip Bench Press'],
    Legs: ['Squat', 'Lunge', 'Leg Press', 'Romanian Deadlift', 'Leg Extension', 'Hamstring Curl'],
    Arms: ['Bicep Curl', 'Tricep Dip', 'Hammer Curl', 'Overhead Tricep Extension', 'Preacher Curl'],
    Core: ['Plank', 'Russian Twist', 'Hanging Leg Raise', 'Crunches', 'Leg Raises']
};
let currentWorkout = { name: '', exercises: [] };
let editingIndex = null;
let currentWeightUnit = 'kg';

// Timer and Stopwatch variables
let timeLeft = 300;
let elapsedTime = 0;
let timerInterval = null;
let stopwatchInterval = null;
let stopwatchCtx;

// ===== FUNCTION DEFINITIONS =====

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function drawCircularStopwatch(timeInSeconds) {
    const canvas = document.getElementById('stopwatchCanvas');
    if (!stopwatchCtx) stopwatchCtx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (Math.min(canvas.width, canvas.height) / 2) * 0.8;
    
    stopwatchCtx.clearRect(0, 0, canvas.width, canvas.height);
    stopwatchCtx.beginPath();
    stopwatchCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    stopwatchCtx.strokeStyle = 'var(--accent-color)';
    stopwatchCtx.lineWidth = 2;
    stopwatchCtx.stroke();
    
    const angle = (timeInSeconds % 60) * (2 * Math.PI / 60) - Math.PI / 2;
    stopwatchCtx.beginPath();
    stopwatchCtx.moveTo(centerX, centerY);
    stopwatchCtx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    stopwatchCtx.strokeStyle = '#FFFFFF';
    stopwatchCtx.lineWidth = 2;
    stopwatchCtx.stroke();
    
    stopwatchCtx.beginPath();
    stopwatchCtx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    stopwatchCtx.fillStyle = '#FFFFFF';
    stopwatchCtx.fill();
}

function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
    drawCircularStopwatch(elapsedTime);
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                stopTimer();
            }
        }, 1000);
        stopwatchInterval = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(stopwatchInterval);
    timerInterval = null;
    stopwatchInterval = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = 300;
    elapsedTime = 0;
    updateTimerDisplay();
}

function openExerciseModal() {
    document.getElementById('exerciseModal').style.display = 'flex';
}

function closeExerciseModal() {
    document.getElementById('exerciseModal').style.display = 'none';
}

function selectExercise(exercise) {
    document.getElementById('exerciseInput').value = exercise;
    closeExerciseModal();
}

function filterCategory(category) {
    document.querySelectorAll('.exercise-category').forEach(cat => {
        cat.style.display = (category === 'all' || cat.dataset.category === category) ? 'block' : 'none';
    });
}

function toggleWeightUnit() {
    currentWeightUnit = currentWeightUnit === 'kg' ? 'lbs' : 'kg';
    document.getElementById('weightUnitBtn').textContent = currentWeightUnit;
}

function addOrUpdateExercise() {
    const exerciseName = document.getElementById('exerciseInput').value.trim();
    const sets = document.getElementById('sets').value;
    const weight = document.getElementById('weight').value;
    const reps = document.getElementById('reps').value;

    if (!exerciseName || !sets || !weight || !reps) {
        alert('Please fill in all exercise fields.');
        return;
    }
    const exercise = { name: exerciseName, sets: parseInt(sets), weight: parseFloat(weight), unit: currentWeightUnit, reps: parseInt(reps) };

    if (editingIndex !== null) {
        currentWorkout.exercises[editingIndex] = exercise;
    } else {
        currentWorkout.exercises.push(exercise);
    }

    renderWorkoutPlan();
    saveCurrentWorkout();
    clearExerciseInputs();
}

function editExercise(index) {
    const exercise = currentWorkout.exercises[index];
    editingIndex = index;
    document.getElementById('exerciseInput').value = exercise.name;
    document.getElementById('sets').value = exercise.sets;
    document.getElementById('weight').value = exercise.weight;
    document.getElementById('reps').value = exercise.reps;
    currentWeightUnit = exercise.unit || 'kg';
    document.getElementById('weightUnitBtn').textContent = currentWeightUnit;
    document.getElementById('addOrUpdateExerciseBtn').textContent = 'Update Exercise';
    window.scrollTo(0, 0);
}

function removeExercise(index) {
    if (confirm(`Are you sure you want to remove ${currentWorkout.exercises[index].name}?`)) {
        currentWorkout.exercises.splice(index, 1);
        renderWorkoutPlan();
        saveCurrentWorkout();
    }
}

function renderWorkoutPlan() {
    const planDiv = document.getElementById('workoutPlan');
    planDiv.innerHTML = '';
    if (currentWorkout.exercises.length === 0) {
        planDiv.innerHTML = '<div class="empty-state">No exercises added yet.</div>';
        return;
    }
    currentWorkout.exercises.forEach((ex, index) => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-item';
        exerciseDiv.innerHTML = `
            <div>
                <strong>${ex.name}</strong><br>
                <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight} ${ex.unit}</span>
            </div>
            <div>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>`;
        planDiv.appendChild(exerciseDiv);
    });
}

function clearExerciseInputs() {
    document.getElementById('exerciseInput').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('reps').value = '';
    currentWeightUnit = 'kg';
    document.getElementById('weightUnitBtn').textContent = currentWeightUnit;
    document.getElementById('addOrUpdateExerciseBtn').textContent = 'Add Exercise';
    editingIndex = null;
}

function saveCurrentWorkout() {
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
}

// *** NEW FUNCTION TO SHOW/HIDE THE DELETE SECTION ***
function toggleDeleteSectionVisibility() {
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    const deleteSection = document.getElementById('delete-controls-section');
    if (deleteSection) {
        if (presets && presets.length > 0) {
            deleteSection.style.display = 'flex'; // Show it
        } else {
            deleteSection.style.display = 'none'; // Hide it
        }
    }
}

function saveWorkoutPreset() {
    const workoutName = document.getElementById('workoutName').value.trim();
    if (!workoutName || currentWorkout.exercises.length === 0) {
        alert('Please enter a workout name and add at least one exercise.');
        return;
    }
    currentWorkout.name = workoutName;
    let presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    const presetIndex = presets.findIndex(p => p.name === workoutName);
    if (presetIndex > -1) {
        presets[presetIndex] = currentWorkout;
    } else {
        presets.push(currentWorkout);
    }
    localStorage.setItem('workoutPresets', JSON.stringify(presets));
    
    const session = { ...currentWorkout, date: new Date().toISOString() };
    let sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('workoutSessions', JSON.stringify(sessions));

    updatePresetSelects();
    alert('Workout preset saved!');
    currentWorkout = { name: '', exercises: [] };
    document.getElementById('workoutName').value = '';
    renderWorkoutPlan();
    saveCurrentWorkout();
    
    toggleDeleteSectionVisibility(); // *** Call the function after saving
}

function confirmDeletePreset() {
    const select = document.getElementById('deletePresetSelect');
    const presetIndex = select.value;
    if (presetIndex === '') {
        alert('Please select a preset to delete.');
        return;
    }
    const presetName = select.options[select.selectedIndex].text;
    if (confirm(`Are you sure you want to delete the preset "${presetName}"?`)) {
        let presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
        presets.splice(presetIndex, 1);
        localStorage.setItem('workoutPresets', JSON.stringify(presets));
        updatePresetSelects();
        if (currentWorkout.name === presetName) {
            currentWorkout = { name: '', exercises: [] };
            document.getElementById('workoutName').value = '';
            renderWorkoutPlan();
            saveCurrentWorkout();
        }
        alert('Preset deleted!');

        toggleDeleteSectionVisibility(); // *** Call the function after deleting
    }
}

function updatePresetSelects() {
    const presetSelect = document.getElementById('presetSelect');
    const deleteSelect = document.getElementById('deletePresetSelect');
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    
    presetSelect.innerHTML = '<option value="">Select a saved preset</option>';
    deleteSelect.innerHTML = '<option value="">Select a preset to delete</option>';
    
    presets.forEach((preset, index) => {
        presetSelect.add(new Option(preset.name, index));
        deleteSelect.add(new Option(preset.name, index));
    });
}

function loadPreset() {
    const presetIndex = document.getElementById('presetSelect').value;
    if (presetIndex === '') return;
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    if (presets[presetIndex]) {
        currentWorkout = JSON.parse(JSON.stringify(presets[presetIndex]));
        document.getElementById('workoutName').value = currentWorkout.name;
        renderWorkoutPlan();
        saveCurrentWorkout();
    }
}

function populateExerciseModal() {
    const categoriesDiv = document.getElementById('exerciseCategories');
    const categoryButtonsDiv = document.getElementById('categoryButtons');
    categoriesDiv.innerHTML = '';
    categoryButtonsDiv.innerHTML = '';

    const allCategories = ['all', ...Object.keys(exercisesByCategory)];
    allCategories.forEach(catName => {
        const btn = document.createElement('button');
        btn.textContent = catName;
        btn.dataset.category = catName;
        categoryButtonsDiv.appendChild(btn);
    });

    for (const [category, exercises] of Object.entries(exercisesByCategory)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'exercise-category';
        categoryDiv.dataset.category = category;
        categoryDiv.innerHTML = `<h4>${category}</h4>`;
        const ul = document.createElement('ul');
        ul.className = 'exercise-list';
        exercises.forEach(exName => {
            const li = document.createElement('li');
            li.textContent = exName;
            li.dataset.exercise = exName;
            ul.appendChild(li);
        });
        categoryDiv.appendChild(ul);
        categoriesDiv.appendChild(categoryDiv);
    }
}

// ===== ATTACH EVENT LISTENERS & INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Populate dynamic content
    populateExerciseModal();
    updatePresetSelects();
    toggleDeleteSectionVisibility(); // *** Call the function on page load ***

    // Load current workout from storage
    const savedWorkout = localStorage.getItem('currentWorkout');
    if (savedWorkout) {
        currentWorkout = JSON.parse(savedWorkout);
        document.getElementById('workoutName').value = currentWorkout.name || '';
    }
    renderWorkoutPlan();
    
    // Initialize timer/stopwatch display
    updateTimerDisplay();

    // --- START OF NEW TIMER TOGGLE LOGIC ---
    const showTimerBtn = document.getElementById('showTimerBtn');
    const closeTimerBtn = document.getElementById('closeTimerBtn');
    const restTimerDiv = document.querySelector('.rest-timer');

    // Make sure the button is visible on page load
    showTimerBtn.style.display = 'flex';

    showTimerBtn.addEventListener('click', () => {
        restTimerDiv.style.display = 'block';
        showTimerBtn.style.display = 'none';
    });

    closeTimerBtn.addEventListener('click', () => {
        restTimerDiv.style.display = 'none';
        showTimerBtn.style.display = 'flex'; // Use flex to re-center the emoji
    });
    // --- END OF NEW TIMER TOGGLE LOGIC ---

    // Attach all event listeners
    document.getElementById('selectExerciseBtn').addEventListener('click', openExerciseModal);
    document.getElementById('closeModalTopBtn').addEventListener('click', closeExerciseModal);
    document.getElementById('closeModalBottomBtn').addEventListener('click', closeExerciseModal);
    document.getElementById('addOrUpdateExerciseBtn').addEventListener('click', addOrUpdateExercise);
    document.getElementById('saveWorkoutPresetBtn').addEventListener('click', saveWorkoutPreset);
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeletePreset);
    document.getElementById('weightUnitBtn').addEventListener('click', toggleWeightUnit);
    document.getElementById('presetSelect').addEventListener('change', loadPreset);
    document.getElementById('backToDashboardBtn').addEventListener('click', () => {
        localStorage.removeItem('currentWorkout');
        window.location.href = 'index.html';
    });

    // Timer buttons
    document.getElementById('startTimerBtn').addEventListener('click', startTimer);
    document.getElementById('stopTimerBtn').addEventListener('click', stopTimer);
    document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);

    // Event delegation for dynamically created elements
    document.getElementById('workoutPlan').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            editExercise(e.target.dataset.index);
        }
        if (e.target.classList.contains('remove-btn')) {
            removeExercise(e.target.dataset.index);
        }
    });
    
    document.getElementById('categoryButtons').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            filterCategory(e.target.dataset.category);
        }
    });

    document.getElementById('exerciseCategories').addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            selectExercise(e.target.dataset.exercise);
        }
    });
});