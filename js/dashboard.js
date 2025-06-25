// ===== FUNCTION DEFINITIONS =====

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
        window.location.href = 'preset.html';
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

function displayPresets() {
    const presetList = document.getElementById('presetList');
    const presets = JSON.parse(localStorage.getItem('workoutPresets') || '[]');
    
    if (presets.length === 0) {
        presetList.innerHTML = '<li class="empty-state">Create your first workout plan!</li>';
    } else {
        presetList.innerHTML = '';
        presets.forEach(preset => {
            const li = document.createElement('li');
            li.className = 'preset-item';
            li.innerHTML = `
                <strong>${preset.name}</strong>
                <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.2rem;">
                    ${preset.exercises.length} exercises
                </div>`;
            presetList.appendChild(li);
        });
    }
}

function saveName() {
    const userNameInput = document.getElementById('userName');
    const userName = userNameInput.value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        document.getElementById('greeting').textContent = `Welcome back, ${userName}!`;
        document.getElementById('nameModal').style.display = 'none';
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        displayLastWorkoutSummary();
        displayPresets();
        populatePresetSelect();
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
        displayLastWorkoutSummary();
        displayPresets();
        populatePresetSelect();
    } else {
        document.getElementById('landingPage').style.display = 'flex';
    }
}


// ===== ATTACH EVENT LISTENERS & INITIALIZE =====
// The script is at the end of the <body>, so the DOM is guaranteed to be ready.

document.getElementById('getStartedBtn').addEventListener('click', openNameModal);
document.getElementById('saveNameBtn').addEventListener('click', saveName);
document.getElementById('continuePresetBtn').addEventListener('click', continuePreset);
document.getElementById('addWorkoutBtn').addEventListener('click', () => {
    window.location.href = 'preset.html';
});

document.getElementById('userName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveName();
    }
});

// Initialize the page on load
checkName();