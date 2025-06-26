document.addEventListener('DOMContentLoaded', () => {
    const exerciseSelect = document.getElementById('exerciseSelect');
    const metricSelect = document.getElementById('metricSelect');
    const ctx = document.getElementById('progressChart').getContext('2d');
    let progressChart;

    const allSessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]');

    function populateExerciseSelect() {
        const uniqueExercises = new Set();
        allSessions.forEach(session => {
            session.exercises.forEach(ex => uniqueExercises.add(ex.name));
        });

        if (uniqueExercises.size === 0) {
            exerciseSelect.innerHTML = '<option>No exercises logged yet</option>';
            return;
        }

        exerciseSelect.innerHTML = '<option value="">-- Select an Exercise --</option>';
        uniqueExercises.forEach(exName => {
            const option = document.createElement('option');
            option.value = exName;
            option.textContent = exName;
            exerciseSelect.appendChild(option);
        });
    }

    function calculateChartData(exerciseName, metric) {
        const labels = [];
        const data = [];

        // Filter for sessions that include the selected exercise
        const relevantSessions = allSessions.filter(session => 
            session.exercises.some(ex => ex.name === exerciseName)
        ).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending

        relevantSessions.forEach(session => {
            labels.push(new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            
            let metricValue = 0;
            const exercisesInSession = session.exercises.filter(ex => ex.name === exerciseName);

            switch (metric) {
                case 'maxWeight':
                    metricValue = Math.max(...exercisesInSession.map(ex => ex.weight));
                    break;
                case 'totalVolume':
                    metricValue = exercisesInSession.reduce((total, ex) => total + (ex.sets * ex.reps * ex.weight), 0);
                    break;
                case 'bestSet':
                    const bestSetValue = Math.max(...exercisesInSession.map(ex => ex.reps * ex.weight));
                    metricValue = bestSetValue > 0 ? bestSetValue : 0;
                    break;
            }
            data.push(metricValue);
        });

        return { labels, data };
    }

    function createOrUpdateChart() {
        const selectedExercise = exerciseSelect.value;
        const selectedMetric = metricSelect.value;
        
        if (!selectedExercise) {
            if (progressChart) progressChart.destroy();
            return;
        }

        const { labels, data } = calculateChartData(selectedExercise, selectedMetric);

        if (progressChart) {
            progressChart.destroy();
        }

        progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${selectedExercise} - ${metricSelect.options[metricSelect.selectedIndex].text}`,
                    data: data,
                    borderColor: 'rgba(99, 102, 241, 1)',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'var(--text-secondary)' },
                        grid: { color: 'var(--border-color)' }
                    },
                    x: {
                        ticks: { color: 'var(--text-secondary)' },
                        grid: { color: 'var(--border-color)' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: 'var(--text-primary)', font: { size: 14 } }
                    }
                }
            }
        });
    }

    // Attach event listeners
    exerciseSelect.addEventListener('change', createOrUpdateChart);
    metricSelect.addEventListener('change', createOrUpdateChart);

    // Initial setup
    populateExerciseSelect();
});