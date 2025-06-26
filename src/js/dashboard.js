// ===== FUNCTION DEFINITIONS =====

// ADDED: Finds the most frequently logged exercise
function findFavoriteExercise() {
    const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    if (sessions.length === 0) return 'None';

    const exerciseCounts = {};
    sessions.forEach(session => {
        session.exercises.forEach(exercise => {
            exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
        });
    });

    if (Object.keys(exerciseCounts).length === 0) return 'None';

    // Find the exercise with the highest count
    const favorite = Object.entries(exerciseCounts).reduce((a, b) => a[1] > b[1] ? a : b);
    return favorite[0];
}

// ADDED: Populates the profile panel with user data
function populateProfilePanel() {
    const userName = localStorage.getItem('userName') || 'User';
    const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    
    document.getElementById('profileName').textContent = userName;
    
    // Create avatar from initials
    const initials = userName.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('profileAvatar').textContent = initials;
    
    document.getElementById('totalWorkouts').textContent = sessions.length;
    document.getElementById('favoriteExercise').textContent = findFavoriteExercise();
}

// NEW: Populates the workout history modal
function populateWorkoutHistory() {
    const historyList = document.getElementById('historyList');
    const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    
    if (sessions.length === 0) {
        historyList.innerHTML = `<div class="empty-state">You haven't completed any workouts yet.</div>`;
        return;
    }
    
    historyList.innerHTML = ''; // Clear previous content
    
    // Show most recent sessions first
    sessions.slice().reverse().forEach(session => {
        const date = new Date(session.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        let exercisesHTML = '<ul class="history-exercise-list">';
        session.exercises.forEach(ex => {
            exercisesHTML += `
                <li>
                    <strong>${ex.name}</strong>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}${ex.unit || 'kg'}</span>
                </li>
            `;
        });
        exercisesHTML += '</ul>';

        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'history-item';
        sessionDiv.innerHTML = `
            <div class="history-header">
                <strong>${session.name}</strong>
                <span class="date">${date}</span>
            </div>
            ${exercisesHTML}
        `;
        historyList.appendChild(sessionDiv);
    });
}

function populatePresetSelect() {
    const presetSelect = document.getElementById('presetSelect');
    presetSelect.innerHTML = '<option value="">Select a saved workout</option>';
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    presets.forEach((preset, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = preset.name;
        presetSelect.appendChild(option);
    });
}

function continuePreset() {
    const presetIndex = document.getElementById('presetSelect').value;
    if (presetIndex === '') {
        alert('Please select a workout to continue.');
        return;
    }
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    if (presets[presetIndex]) {
        localStorage.setItem('currentWorkout', JSON.stringify(presets[presetIndex]));
        window.location.href = 'src/preset.html';
    } else {
        alert('Invalid workout selected.');
    }
}

function displayLastWorkoutSummary() {
    const summaryDiv = document.getElementById('summaryContent');
    const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');
    const userName = localStorage.getItem('userName') || '';
    
    if (sessions.length === 0) {
        summaryDiv.innerHTML = `<div class="empty-state">Ready to start your first workout, ${userName}?</div>`;
        return;
    }

    const lastSession = sessions[sessions.length - 1];
    const date = new Date(lastSession.date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
    });
    
    let html = `
        <div style="margin-bottom: 1rem;">
            <strong style="color: var(--accent-color);">${lastSession.name}</strong>
            <div style="color: var(--text-muted); font-size: 0.9rem;">${date}</div>
        </div>
        <div style="font-size: 0.9rem;">`;
    
    lastSession.exercises.slice(0, 3).forEach(exercise => {
        html += `
            <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: var(--secondary-bg); border-radius: 6px;">
                <strong>${exercise.name}</strong><br>
                <span style="color: var(--text-muted);">${exercise.sets} sets × ${exercise.reps} reps @ ${exercise.weight}${exercise.unit || 'kg'}</span>
            </div>`;
    });
    
    if (lastSession.exercises.length > 3) {
        html += `<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center;">+${lastSession.exercises.length - 3} more exercises</div>`;
    }
    
    html += '</div>';
    summaryDiv.innerHTML = html;
}

// REMOVED: displayPresets() function is no longer needed

function saveName() {
    const userNameInput = document.getElementById('userName');
    const userName = userNameInput.value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        document.getElementById('greeting').textContent = `Welcome back, ${userName}!`;
        document.getElementById('nameModal').style.display = 'none';
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('profileToggleBtn').style.display = 'block'; 
        displayLastWorkoutSummary();
        populatePresetSelect();
        populateProfilePanel(); 
    } else {
        alert('Please enter your name to continue.');
    }
}

function openNameModal() {
    document.getElementById('nameModal').style.display = 'flex';
    document.getElementById('userName').focus();
}

function checkName() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('greeting').textContent = `Welcome back, ${userName}!`;
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('profileToggleBtn').style.display = 'block';
        displayLastWorkoutSummary();
        populatePresetSelect();
        populateProfilePanel();
    } else {
        document.getElementById('landingPage').style.display = 'flex';
        document.getElementById('profileToggleBtn').style.display = 'none';
    }
}


// ===== ATTACH EVENT LISTENERS & INITIALIZE =====
// The script is at the end of the <body>, so the DOM is guaranteed to be ready.

document.getElementById('getStartedBtn').addEventListener('click', openNameModal);
document.getElementById('saveNameBtn').addEventListener('click', saveName);
document.getElementById('continuePresetBtn').addEventListener('click', continuePreset);
document.getElementById('addWorkoutBtn').addEventListener('click', () => {
    window.location.href = 'src/preset.html';
});

document.getElementById('userName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveName();
    }
});

// Event listeners for the profile panel
const profilePanel = document.getElementById('profilePanel');
const profileToggleBtn = document.getElementById('profileToggleBtn');
const closeProfileBtn = document.getElementById('closeProfileBtn');

if(profileToggleBtn) {
    profileToggleBtn.addEventListener('click', () => {
        populateProfilePanel(); // Refresh data on open
        profilePanel.classList.add('is-open');
    });
}

if(closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
        profilePanel.classList.remove('is-open');
    });
}

// ADDED: Event listeners for the history modal
const historyModal = document.getElementById('historyModal');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');

if (viewHistoryBtn) {
    viewHistoryBtn.addEventListener('click', () => {
        populateWorkoutHistory();
        historyModal.style.display = 'flex';
    });
}

if (closeHistoryBtn) {
    closeHistoryBtn.addEventListener('click', () => {
        historyModal.style.display = 'none';
    });
}

// Initialize the page on load
checkName();