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
let isLiveMode = false;

// Timer and Stopwatch variables
let timeLeft = 300;
let elapsedTime = 0;
let timerInterval = null;
let stopwatchInterval = null;
let stopwatchCtx;

// ===== FUNCTION DEFINITIONS =====

// NEW: Shows/hides recent performance for a given exercise
function displayExerciseHistory(exerciseName) {
    const historyContainer = document.getElementById('exerciseHistoryContainer');
    const historyContent = document.getElementById('exerciseHistoryContent');
    const allSessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');

    const relevantPerformances = [];
    // Go through all sessions in reverse (most recent first)
    allSessions.slice().reverse().forEach(session => {
        // Find exercises in that session that match the name
        session.exercises.forEach(ex => {
            if (ex.name.toLowerCase() === exerciseName.toLowerCase()) {
                relevantPerformances.push({
                    date: session.date,
                    details: `${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}${ex.unit || 'kg'}`
                });
            }
        });
    });

    // Take the last 3 found
    const recentPerformances = relevantPerformances.slice(0, 3);

    if (recentPerformances.length > 0) {
        let html = '';
        recentPerformances.forEach(perf => {
            const date = new Date(perf.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            html += `
                <div class="history-entry">
                    <span class="date">${date}</span>
                    <span class="performance">${perf.details}</span>
                </div>
            `;
        });
        historyContent.innerHTML = html;
        historyContainer.style.display = 'block';
    } else {
        // No history for this exercise, so hide the container
        historyContent.innerHTML = '<div class="empty-state" style="font-size: 0.9rem;">No history for this exercise yet. Go for it!</div>';
        historyContainer.style.display = 'block';
    }
}

function hideExerciseHistory() {
    document.getElementById('exerciseHistoryContainer').style.display = 'none';
}

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
    displayExerciseHistory(exercise); // UPDATED: Show history on select
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
    const exercise = { name: exerciseName, sets: parseInt(sets), weight: parseFloat(weight), unit: currentWeightUnit, reps: parseInt(reps), completed: [] };

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
    displayExerciseHistory(exercise.name); // Show history for the exercise being edited
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

        if (isLiveMode) {
            exerciseDiv.classList.add('exercise-item-live');
            let setCheckboxesHTML = '<div class="set-tracker">';
            for (let i = 0; i < ex.sets; i++) {
                const isChecked = ex.completed[i];
                setCheckboxesHTML += `
                    <label class="set-checkbox-label ${isChecked ? 'checked' : ''}" for="set-${index}-${i}">
                        ${i + 1}
                        <input type="checkbox" class="set-checkbox" id="set-${index}-${i}" data-ex-index="${index}" data-set-index="${i}" ${isChecked ? 'checked' : ''}>
                    </label>
                `;
            }
            setCheckboxesHTML += '</div>';
            exerciseDiv.innerHTML = `
                <div>
                    <strong>${ex.name}</strong><br>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight} ${ex.unit}</span>
                </div>
                ${setCheckboxesHTML}`;
        } else {
            exerciseDiv.innerHTML = `
                <div>
                    <strong>${ex.name}</strong><br>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight} ${ex.unit}</span>
                </div>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>`;
        }
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
    hideExerciseHistory(); // UPDATED: Hide history when clearing inputs
}

function saveCurrentWorkout() {
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
}

function toggleDeleteSectionVisibility() {
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    const deleteSection = document.getElementById('delete-controls-section');
    if (deleteSection) {
        if (presets && presets.length > 0) {
            deleteSection.style.display = 'flex';
        } else {
            deleteSection.style.display = 'none';
        }
    }
}

function saveWorkoutPlan() {
    const workoutName = document.getElementById('workoutName').value.trim();
    if (!workoutName) {
        alert('Please enter a workout name to save the plan.');
        return;
    }
    if(currentWorkout.exercises.length === 0){
        alert('Please add at least one exercise to save the plan.');
        return;
    }
    
    currentWorkout.name = workoutName;
    let presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    const presetIndex = presets.findIndex(p => p.name === workoutName);
    
    if (presetIndex > -1) {
        if (confirm(`A preset named "${workoutName}" already exists. Do you want to overwrite it?`)) {
            presets[presetIndex] = currentWorkout;
        } else {
            return; 
        }
    } else {
        presets.push(currentWorkout);
    }
    
    localStorage.setItem('workoutPresets', JSON.stringify(presets));
    updatePresetSelects();
    alert(`Workout plan "${workoutName}" saved!`);
    toggleDeleteSectionVisibility();
}

function toggleLiveMode(live) {
    isLiveMode = live;
    const planningControls = document.getElementById('planningControls');
    const pageTitle = document.getElementById('pageTitle');
    
    const startBtn = document.getElementById('startWorkoutBtn');
    const savePlanBtn = document.getElementById('savePlanBtn');
    const finishBtn = document.getElementById('finishWorkoutBtn');
    const cancelBtn = document.getElementById('cancelWorkoutBtn');

    if (live) {
        planningControls.style.display = 'none';
        pageTitle.textContent = '🔥 Workout in Progress';
        pageTitle.classList.add('live-mode-title');
        
        startBtn.style.display = 'none';
        savePlanBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    } else {
        planningControls.style.display = 'block';
        pageTitle.textContent = '💪 Plan Your Workout';
        pageTitle.classList.remove('live-mode-title');

        startBtn.style.display = 'inline-block';
        savePlanBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }
    renderWorkoutPlan();
}

function startWorkout() {
    if (currentWorkout.exercises.length === 0) {
        alert('Please add at least one exercise to start a workout.');
        return;
    }
    if (!document.getElementById('workoutName').value.trim()) {
        alert('Please give your workout a name before starting.');
        return;
    }
    currentWorkout.name = document.getElementById('workoutName').value.trim();
    toggleLiveMode(true);
}

function finishWorkout() {
    const completedExercises = currentWorkout.exercises.filter(ex => ex.completed && ex.completed.some(c => c === true));
    
    if (completedExercises.length === 0) {
        alert("You haven't completed any sets. Finish at least one set to save the workout.");
        return;
    }
    
    const session = { 
        name: currentWorkout.name,
        date: new Date().toISOString(),
        exercises: completedExercises.map(ex => ({...ex, sets: ex.completed.filter(c => c === true).length }))
    };
    
    let sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('workoutSessions', JSON.stringify(sessions));

    alert('Great job! Workout saved.');
    localStorage.removeItem('currentWorkout');
    window.location.href = '../index.html';
}

function cancelWorkout() {
    if (confirm('Are you sure you want to cancel this workout? Your progress will not be saved.')) {
        currentWorkout.exercises.forEach(ex => ex.completed = []);
        toggleLiveMode(false);
    }
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
        toggleDeleteSectionVisibility();
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
        currentWorkout.exercises.forEach(ex => {
            if (!ex.completed) {
                ex.completed = [];
            }
        });
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
    populateExerciseModal();
    updatePresetSelects();
    toggleDeleteSectionVisibility();

    const savedWorkout = localStorage.getItem('currentWorkout');
    if (savedWorkout) {
        currentWorkout = JSON.parse(savedWorkout);
        document.getElementById('workoutName').value = currentWorkout.name || '';
    }
    renderWorkoutPlan();
    
    updateTimerDisplay();

    const showTimerBtn = document.getElementById('showTimerBtn');
    const closeTimerBtn = document.getElementById('closeTimerBtn');
    const restTimerDiv = document.querySelector('.rest-timer');
    showTimerBtn.style.display = 'flex';
    showTimerBtn.addEventListener('click', () => {
        restTimerDiv.style.display = 'block';
        showTimerBtn.style.display = 'none';
    });
    closeTimerBtn.addEventListener('click', () => {
        restTimerDiv.style.display = 'none';
        showTimerBtn.style.display = 'flex';
    });
    
    document.getElementById('selectExerciseBtn').addEventListener('click', openExerciseModal);
    document.getElementById('closeModalTopBtn').addEventListener('click', closeExerciseModal);
    document.getElementById('closeModalBottomBtn').addEventListener('click', closeExerciseModal);
    document.getElementById('addOrUpdateExerciseBtn').addEventListener('click', addOrUpdateExercise);
    
    document.getElementById('savePlanBtn').addEventListener('click', saveWorkoutPlan);
    document.getElementById('startWorkoutBtn').addEventListener('click', startWorkout);
    document.getElementById('finishWorkoutBtn').addEventListener('click', finishWorkout);
    document.getElementById('cancelWorkoutBtn').addEventListener('click', cancelWorkout);
    
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeletePreset);
    document.getElementById('weightUnitBtn').addEventListener('click', toggleWeightUnit);
    document.getElementById('presetSelect').addEventListener('change', loadPreset);
    document.getElementById('backToDashboardBtn').addEventListener('click', () => {
        if (isLiveMode) {
            if (confirm('You have a workout in progress. Are you sure you want to leave without saving?')) {
                localStorage.removeItem('currentWorkout');
                window.location.href = '../index.html';
            }
        } else {
            localStorage.removeItem('currentWorkout');
            window.location.href = '../index.html';
        }
    });

    // UPDATED: Event listeners for exercise history
    const exerciseInput = document.getElementById('exerciseInput');
    exerciseInput.addEventListener('blur', () => {
        const exerciseName = exerciseInput.value.trim();
        if (exerciseName) {
            displayExerciseHistory(exerciseName);
        }
    });
    exerciseInput.addEventListener('input', () => {
        if (!exerciseInput.value.trim()) {
            hideExerciseHistory();
        }
    });

    document.getElementById('startTimerBtn').addEventListener('click', startTimer);
    document.getElementById('stopTimerBtn').addEventListener('click', stopTimer);
    document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);

    document.getElementById('workoutPlan').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            editExercise(e.target.dataset.index);
        }
        if (e.target.classList.contains('remove-btn')) {
            removeExercise(e.target.dataset.index);
        }
        if (e.target.classList.contains('set-checkbox')) {
            const exIndex = e.target.dataset.exIndex;
            const setIndex = e.target.dataset.setIndex;
            currentWorkout.exercises[exIndex].completed[setIndex] = e.target.checked;
            e.target.parentElement.classList.toggle('checked', e.target.checked);
            saveCurrentWorkout();
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