<codebase>
<project_structure>
.
├── components
│   └── chart.js
├── index.html
├── progress.html
└── src
    ├── css
    │   └── app.css
    ├── js
    │   ├── dashboard.js
    │   ├── preset.js
    │   └── progress.js
    └── preset.html

4 directories, 8 files
</project_structure>

<file src="components\chart.js">
export class Chart {
  constructor(ctx, config) {
    this.ctx = ctx
    this.config = config
    this.chart = new ChartJs(ctx, config)
  }

  destroy() {
    this.chart.destroy()
  }
}

// A minimal Chart.js wrapper
class ChartJs {
  constructor(ctx, config) {
    this.ctx = ctx
    this.config = config
    this.data = config.data
    this.type = config.type
    this.options = config.options
  }

  destroy() {
    this.ctx = null
    this.config = null
    this.data = null
    this.type = null
    this.options = null
  }
}

export const ChartContainer = () => null
export const ChartTooltip = () => null
export const ChartTooltipContent = () => null
export const ChartLegend = () => null
export const ChartLegendContent = () => null
export const ChartStyle = () => null

</file>

<file src="index.html">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>repGraph - Your Personal Workout Companion</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/app.css">
</head>
<body class="dashboard-page"> 
    <div class="container">
        <div class="landing" id="landingPage">
            <div class="brand-logo">
                <span class="logo-icon">💪</span>
                repGraph
            </div>
            <div class="brand-subtitle">Your Personal Workout Companion</div>
            <div class="feature-highlights">
                <div class="feature-item">
                    <span class="feature-icon">📊</span>
                    <span>Track Progress</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎯</span>
                    <span>Set Goals</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🏆</span>
                    <span>Achieve More</span>
                </div>
            </div>
            <button class="cta-button" id="getStartedBtn">
                <span>Get Started</span>
                <span class="button-arrow">→</span>
            </button>
        </div>

        <!-- Name Input Modal -->
        <div class="modal" id="nameModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Welcome to repGraph!</h3>
                    <p class="modal-subtitle">Let's get you started on your fitness journey</p>
                </div>
                <div class="input-container">
                    <input type="text" class="input-field" id="userName" placeholder="Enter your name">
                    <div class="input-underline"></div>
                </div>
                <button class="cta-button" id="saveNameBtn">
                    <span>Continue</span>
                    <span class="button-arrow">→</span>
                </button>
            </div>
        </div>

        <!-- Main Dashboard -->
        <div class="main-content" id="mainContent">
            <div class="header">
                <div class="header-text">
                    <div class="welcome-text" id="greeting">Welcome back!</div>
                    <div class="subtitle">Ready to crush your fitness goals?</div>
                </div>
                <button class="profile-toggle-btn" id="profileToggleBtn">
                    <span class="profile-icon">👤</span>
                    My Profile
                </button>
            </div>

            <div class="action-section">
                <button class="primary-button pulse-on-hover" id="addWorkoutBtn">
                    <span class="button-icon">🏋️</span>
                    <span>Add Workout</span>
                    <span class="button-glow"></span>
                </button>
            </div>

            <div class="preset-section">
                <div class="preset-header">
                    <div class="preset-title">
                        <span class="section-icon">⚡</span>
                        Quick Start
                    </div>
                </div>
                <select class="preset-select" id="presetSelect">
                    <option value="">Select a saved workout</option>
                </select>
                <button class="secondary-button" id="continuePresetBtn">
                    <span>Continue Workout</span>
                    <span class="button-arrow">→</span>
                </button>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card card-hover-effect">
                    <div class="card-header">
                        <div class="card-title">
                            <span class="card-icon">📊</span>
                            Last Workout
                        </div>
                        <div class="card-badge">Recent</div>
                    </div>
                    <div class="card-content" id="summaryContent">
                        <div class="empty-state">No workouts completed yet</div>
                    </div>
                </div>

                <div class="dashboard-card card-hover-effect">
                    <div class="card-header">
                        <div class="card-title">
                            <span class="card-icon">💪</span>
                            Workout History
                        </div>
                        <div class="card-badge">Archive</div>
                    </div>
                    <div class="card-content">
                        <p class="card-description">Review all your completed sessions to see your progress over time.</p>
                        <button class="secondary-button full-width" id="viewHistoryBtn">
                            <span>View Workout History</span>
                            <span class="button-arrow">→</span>
                        </button>
                    </div>
                </div>

                <div class="dashboard-card card-hover-effect">
                    <div class="card-header">
                        <div class="card-title">
                            <span class="card-icon">🎯</span>
                            Motivation
                        </div>
                        <div class="card-badge">Daily</div>
                    </div>
                    <div class="card-content">
                        <div class="viz-container">
                            <div class="fitness-icon">🏆</div>
                            <div class="motivation-rings">
                                <div class="ring ring-1"></div>
                                <div class="ring ring-2"></div>
                                <div class="ring ring-3"></div>
                            </div>
                        </div>
                        <div class="motivation-text">
                            <strong>Keep pushing your limits!</strong>
                            <p>Every rep counts towards your goals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Workout History Modal -->
    <div class="modal" id="historyModal">
        <div class="modal-content large-modal">
            <button class="close-modal-top" id="closeHistoryBtn">×</button>
            <div class="modal-header">
                <h3 class="modal-title">Workout Session History</h3>
                <p class="modal-subtitle">Track your fitness journey</p>
            </div>
            <div id="historyList" class="history-container">
                <!-- Session history will be populated here by JS -->
            </div>
        </div>
    </div>

    <!-- Profile Panel -->
    <div class="profile-panel" id="profilePanel">
        <div class="profile-header">
            <h3>My Profile</h3>
            <button class="close-profile-btn" id="closeProfileBtn">×</button>
        </div>
        <div class="profile-content" id="profileContent">
            <div class="profile-avatar-container">
                <div class="profile-avatar" id="profileAvatar">RG</div>
                <div class="avatar-ring"></div>
            </div>
            <h2 class="profile-name" id="profileName">User</h2>
            <div class="profile-stats">
                <div class="stat-item">
                    <div class="stat-value" id="totalWorkouts">0</div>
                    <div class="stat-label">Total Workouts</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="favoriteExercise">None</div>
                    <div class="stat-label">Favorite Exercise</div>
                </div>
            </div>
            <a href="progress.html" class="primary-button full-width progress-link">
                <span class="button-icon">📈</span>
                <span>View Progress Graphs</span>
                <span class="button-arrow">→</span>
            </a>
        </div>
    </div>

    <script src="src/js/dashboard.js"></script>
</body>
</html>

</file>

<file src="progress.html">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>repGraph - Progress</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/app.css">
</head>
<body class="progress-page">
    <button class="secondary-button back-to-top-left-btn" onclick="window.location.href='index.html'">
        <span class="button-arrow rotate-180">→</span>
        <span>Back to Dashboard</span>
    </button>
    <div class="container">
        <div class="page-header">
            <h1>
                <span class="page-icon">📈</span>
                Track Your Progress
            </h1>
            <p class="page-subtitle">Visualize your fitness journey and celebrate your achievements</p>
        </div>
        
        <div class="progress-controls">
            <div class="form-group">
                <label for="exerciseSelect">
                    <span class="label-icon">🏋️</span>
                    Select Exercise
                </label>
                <select id="exerciseSelect" class="preset-select"></select>
            </div>
            <div class="form-group">
                <label for="metricSelect">
                    <span class="label-icon">📊</span>
                    Select Metric
                </label>
                <select id="metricSelect" class="preset-select">
                    <option value="maxWeight">Max Weight Lifted</option>
                    <option value="totalVolume">Total Volume (Sets×Reps×Weight)</option>
                    <option value="bestSet">Best Set (Reps×Weight)</option>
                </select>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-header">
                <h3>Progress Chart</h3>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color"></div>
                        <span>Your Progress</span>
                    </div>
                </div>
            </div>
            
            <!-- Add this helpful message section -->
            <div id="noDataMessage" class="empty-state" style="display: none;">
                <div class="empty-icon">📊</div>
                <p>No workout data available yet</p>
                <span>Complete some workouts first, then return here to track your progress!</span>
                <a href="index.html" class="secondary-button" style="margin-top: 1rem; text-decoration: none; display: inline-flex;">
                    <span class="button-arrow rotate-180">→</span>
                    <span>Start Your First Workout</span>
                </a>
            </div>
            
            <canvas id="progressChart" width="800" height="400"></canvas>
        </div>
        
    </div>

    <!-- Chart.js library from CDN - Updated to latest version -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
    <!-- Custom script for this page -->
    <script src="src/js/progress.js"></script>
</body>
</html>

</file>

<file src="src\css\app.css">
/* ==========================================================================
   1. Global & Root Variables
   ========================================================================== */
:root {
  --primary-bg: #0a0a0a;
  --secondary-bg: #1a1a1a;
  --card-bg: #1e1e1e;
  --accent-color: #6366f1;
  --accent-hover: #5856eb;
  --accent-light: #818cf8;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --border-color: #2d2d2d;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-secondary: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  --gradient-accent: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
  --border-radius: 16px;
  --border-radius-sm: 8px;
  --border-radius-lg: 24px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--primary-bg);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 60% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  z-index: -1;
  animation: backgroundShift 30s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
}

/* ==========================================================================
   2. Page-Specific Layouts
   ========================================================================== */
.container {
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-page .container {
  max-width: 1400px;
}
.preset-page .container {
  max-width: 900px;
  align-items: center;
}
.progress-page .container {
  max-width: 1200px;
  align-items: center;
}

/* ==========================================================================
   3. Typography & Headers
   ========================================================================== */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.section-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
}

/* ==========================================================================
   4. Enhanced Button Styles
   ========================================================================== */
.primary-button,
.secondary-button,
.cta-button,
.success-button,
.danger-button {
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: var(--transition);
  border: none;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-decoration: none;
  min-height: 48px;
}

.cta-button {
  background: var(--gradient-primary);
  font-size: 1.1rem;
  padding: 1.25rem 2.5rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.primary-button {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-md);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.secondary-button {
  background: var(--gradient-secondary);
  border: 2px solid var(--border-color);
  font-weight: 500;
}

.secondary-button:hover {
  border-color: var(--accent-color);
  background: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.success-button {
  background: linear-gradient(135deg, var(--success-color) 0%, #059669 100%);
  box-shadow: var(--shadow-md);
}

.success-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.danger-button {
  background: linear-gradient(135deg, var(--error-color) 0%, #dc2626 100%);
  box-shadow: var(--shadow-md);
}

.danger-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.button-arrow {
  font-size: 1.2rem;
  transition: var(--transition);
}

.button-arrow.rotate-180 {
  transform: rotate(180deg);
}

.primary-button:hover .button-arrow,
.secondary-button:hover .button-arrow,
.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

.button-icon {
  font-size: 1.2rem;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: var(--transition);
  border-radius: var(--border-radius);
}

.pulse-on-hover:hover .button-glow {
  opacity: 0.3;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
}

.full-width {
  width: 100%;
}

/* ==========================================================================
   5. Enhanced Form Elements
   ========================================================================== */
.form-section {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
}

.input-container {
  position: relative;
}

.input-field,
.preset-select {
  width: 100%;
  padding: 1rem 1.25rem;
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  font-family: inherit;
}

.input-field:focus,
.preset-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  background: var(--card-bg);
}

.input-field::placeholder {
  color: var(--text-muted);
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: var(--transition);
}

.input-field:focus + .input-underline {
  width: 100%;
}

.preset-select {
  cursor: pointer;
  margin-bottom: 0;
}

.exercise-input-group {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.exercise-input-group .input-field {
  flex: 1;
}

.weight-input-group {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.weight-input-group .input-field {
  flex: 1;
}

.weight-unit-btn {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  transition: var(--transition);
  box-shadow: var(--shadow-md);
  font-weight: 600;
}

.weight-unit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ==========================================================================
   6. Dashboard Page Specific Styles
   ========================================================================== */
.landing {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
  max-width: 800px;
  margin: 0 auto;
}

.brand-logo {
  font-size: 4.5rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: logoFloat 3s ease-in-out infinite;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.6));
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.brand-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-weight: 300;
}

.feature-highlights {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
  min-width: 120px;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-color);
}

.feature-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4));
}

.main-content {
  display: none;
  animation: fadeInUp 0.8s ease-out;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-text {
  text-align: left;
}

.welcome-text {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 400;
}

.profile-toggle-btn {
  background: var(--gradient-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: var(--shadow-sm);
  display: none;
  align-items: center;
  gap: 0.75rem;
}

.profile-toggle-btn:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.profile-icon {
  font-size: 1.2rem;
}

.action-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.preset-section {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.preset-header {
  margin-bottom: 1.5rem;
}

.preset-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.dashboard-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  border: 1px solid var(--border-color);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.dashboard-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
}

.card-hover-effect:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
}

.card-badge {
  background: var(--gradient-primary);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-description {
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.viz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  position: relative;
  margin-bottom: 1.5rem;
}

.fitness-icon {
  font-size: 4rem;
  color: var(--accent-color);
  animation: bounce 2s ease-in-out infinite;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
}

.motivation-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring {
  position: absolute;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: ringPulse 3s ease-in-out infinite;
}

.ring-1 {
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  animation-delay: 0s;
}

.ring-2 {
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  animation-delay: 1s;
}

.ring-3 {
  width: 160px;
  height: 160px;
  margin: -80px 0 0 -80px;
  animation-delay: 2s;
}

@keyframes ringPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.motivation-text {
  text-align: center;
}

.motivation-text strong {
  display: block;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.motivation-text p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* ==========================================================================
   7. Profile Panel Styles
   ========================================================================== */
.profile-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background: var(--secondary-bg);
  z-index: 999;
  box-shadow: var(--shadow-xl);
  border-left: 1px solid var(--border-color);
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.profile-panel.is-open {
  right: 0;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--card-bg);
}

.profile-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
}

.close-profile-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  transition: var(--transition);
  font-weight: bold;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
}

.close-profile-btn:hover {
  color: var(--accent-color);
  background: var(--border-color);
}

.profile-content {
  padding: 2rem;
  text-align: center;
  overflow-y: auto;
  flex-grow: 1;
}

.profile-avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  border: 4px solid var(--card-bg);
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 2;
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  opacity: 0.5;
  animation: avatarPulse 2s ease-in-out infinite;
}

@keyframes avatarPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 0.25rem;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.progress-link {
  margin-top: 2rem;
  text-decoration: none;
  display: inline-flex;
}

/* ==========================================================================
   8. Modal Styles
   ========================================================================== */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  animation: slideIn 0.3s ease-out;
}

.large-modal {
  max-width: 700px;
}

.dashboard-page .modal-content {
  max-width: 450px;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 400;
}

.close-modal-top {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: var(--transition);
  border-radius: var(--border-radius-sm);
}

.close-modal-top:hover {
  color: var(--error-color);
  background: var(--border-color);
}

/* ==========================================================================
   9. Workout History Styles
   ========================================================================== */
.history-container {
  max-height: 60vh;
  overflow-y: auto;
}

.history-item {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: var(--transition);
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-color);
}

.history-item:last-child {
  margin-bottom: 0;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.history-header strong {
  font-size: 1.2rem;
  color: var(--accent-color);
  font-weight: 600;
}

.history-header .date {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
  background: var(--border-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.history-exercise-list {
  list-style: none;
  padding-left: 0;
}

.history-exercise-list li {
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-bottom: 0.75rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.history-exercise-list li:hover {
  border-color: var(--accent-color);
  transform: translateX(4px);
}

.history-exercise-list li strong {
  color: var(--text-primary);
  font-weight: 600;
}

.history-exercise-list li span {
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: block;
  margin-top: 0.25rem;
}

/* ==========================================================================
   10. Preset Page Specific Styles
   ========================================================================== */
.exercise-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.exercise-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.delete-section {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.delete-controls {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.delete-controls .preset-select {
  flex: 1;
}

.preset-group {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.workout-section {
  width: 100%;
  margin-bottom: 2rem;
}

.workout-plan {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  min-height: 200px;
}

.exercise-item {
  margin-bottom: 1rem;
  padding: 1.5rem;
  background: var(--secondary-bg);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--accent-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.exercise-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-color);
}

.exercise-item button {
  margin-left: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: none;
  border: none;
  color: var(--text-primary);
  font-weight: 500;
}

.exercise-item button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.exercise-item .edit-btn {
  background: var(--accent-color);
}

.exercise-item .edit-btn:hover {
  background: var(--accent-hover);
}

.exercise-item .remove-btn {
  background: var(--error-color);
}

.exercise-item .remove-btn:hover {
  background: #d43737;
}

.action-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
}

/* ==========================================================================
   11. Exercise History Container
   ========================================================================== */
.exercise-history-container {
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.exercise-history-container h4 {
  text-align: left;
  font-size: 1.1rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.history-icon {
  font-size: 1.2rem;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
}

.history-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.history-entry:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.history-entry .date {
  color: var(--text-muted);
  font-weight: 500;
  background: var(--border-color);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.history-entry .performance {
  color: var(--text-primary);
  font-weight: 500;
}

/* ==========================================================================
   12. Timer Styles
   ========================================================================== */
.timer-toggle-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
  background: var(--gradient-primary);
  border: none;
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: var(--transition);
  display: none;
}

.timer-toggle-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.timer-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.timer-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.rest-timer {
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--card-bg);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-xl);
  z-index: 100;
  min-width: 250px;
}

.timer-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.timer-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
}

.timer-display {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.timer-controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.timer-controls button {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timer-controls button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.start-button {
  background: var(--success-color);
}

.start-button:hover {
  background: #059669;
}

.stop-button {
  background: var(--error-color);
}

.stop-button:hover {
  background: #dc2626;
}

.reset-button {
  background: var(--warning-color);
}

.reset-button:hover {
  background: #d97706;
}

.close-timer-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: var(--transition);
  border-radius: var(--border-radius-sm);
}

.close-timer-btn:hover {
  color: var(--error-color);
  background: var(--border-color);
}

#stopwatchCanvas {
  border: 2px solid var(--border-color);
  border-radius: 50%;
  background-color: var(--secondary-bg);
}

/* ==========================================================================
   13. Exercise Modal & Categories
   ========================================================================== */
.category-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-buttons button {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
}

.category-buttons button:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.exercise-categories {
  max-height: 400px;
  overflow-y: auto;
}

.exercise-category {
  margin-bottom: 1.5rem;
  display: none;
  padding: 0 0.5rem;
}

.exercise-category h4 {
  color: var(--accent-color);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: left;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exercise-list {
  list-style: none;
  padding: 0;
}

.exercise-list li {
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  margin-bottom: 0.75rem;
  background: var(--secondary-bg);
  transition: var(--transition);
  border: 1px solid var(--border-color);
  font-weight: 500;
}

.exercise-list li:hover {
  background: var(--border-color);
  transform: translateX(4px);
  border-color: var(--accent-color);
  box-shadow: var(--shadow-sm);
}

/* ==========================================================================
   14. Live Workout Mode Styles
   ========================================================================== */
.live-mode-title {
  color: var(--success-color) !important;
  animation: livePulse 2s ease-in-out infinite;
}

@keyframes livePulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.exercise-item-live {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, var(--secondary-bg) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-left-color: var(--success-color);
}

.set-tracker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;
}

.set-checkbox-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 700;
  color: var(--text-secondary);
  user-select: none;
  position: relative;
  overflow: hidden;
}

.set-checkbox-label::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: var(--transition);
}

.set-checkbox-label.checked {
  background: var(--success-color);
  border-color: var(--success-color);
  color: var(--text-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.set-checkbox-label.checked::before {
  opacity: 0.2;
}

.set-checkbox {
  display: none;
}

/* ==========================================================================
   15. Progress Page Styles
   ========================================================================== */
.progress-controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background: var(--card-bg);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  width: 100%;
  box-shadow: var(--shadow-sm);
}

.progress-controls .form-group {
  flex: 1;
  margin-bottom: 0;
}

.progress-controls .preset-select {
  margin-bottom: 0;
}

.chart-container {
  width: 100%;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.legend-color {
  width: 16px;
  height: 16px;
  background: var(--gradient-primary);
  border-radius: 4px;
}

/* ==========================================================================
   16. Back Button Styles
   ========================================================================== */
.back-to-top-left-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  line-height: 1.2;
  box-shadow: var(--shadow-md);
}

.back-to-top-left-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ==========================================================================
   17. Empty State Styles
   ========================================================================== */
.empty-state {
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.5;
  filter: grayscale(100%);
}

.empty-state p {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.empty-state span {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* ==========================================================================
   18. Animation Keyframes
   ========================================================================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==========================================================================
   19. Responsive Design
   ========================================================================== */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .brand-logo {
    font-size: 3.5rem;
  }

  .brand-subtitle {
    font-size: 1.2rem;
  }

  .feature-highlights {
    gap: 1rem;
  }

  .feature-item {
    min-width: 100px;
    padding: 1rem;
  }

  .primary-button,
  .secondary-button,
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  .action-section {
    flex-direction: column;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-content {
    padding: 2rem;
    margin: 1rem;
    border-radius: var(--border-radius);
  }

  .header {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  .header-text {
    text-align: center;
  }

  .welcome-text {
    font-size: 2rem;
  }

  .profile-panel {
    width: 350px;
    right: -350px;
  }

  .progress-controls {
    flex-direction: column;
    gap: 1.5rem;
  }

  .exercise-details {
    grid-template-columns: 1fr;
  }

  .delete-controls {
    flex-direction: column;
  }

  .action-buttons-container {
    flex-direction: column;
  }

  .timer-toggle-btn {
    bottom: 1rem;
    right: 1rem;
    padding: 0.875rem 1.25rem;
  }

  .rest-timer {
    bottom: 1rem;
    right: 1rem;
    min-width: 200px;
  }

  .back-to-top-left-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .brand-logo {
    font-size: 3rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .logo-icon {
    font-size: 3rem;
  }

  .page-header h1 {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-icon {
    font-size: 2.5rem;
  }

  .welcome-text {
    font-size: 1.75rem;
  }

  .profile-panel {
    width: 100%;
    right: -100%;
  }

  .feature-highlights {
    flex-direction: column;
    align-items: center;
  }

  .category-buttons {
    gap: 0.5rem;
  }

  .category-buttons button {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }

  .timer-controls {
    flex-direction: column;
  }

  .exercise-input-group,
  .weight-input-group {
    flex-direction: column;
  }
}

/* ==========================================================================
   20. Utility Classes
   ========================================================================== */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

.mb-0 {
  margin-bottom: 0 !important;
}
.mb-1 {
  margin-bottom: 0.5rem !important;
}
.mb-2 {
  margin-bottom: 1rem !important;
}
.mb-3 {
  margin-bottom: 1.5rem !important;
}

.mt-0 {
  margin-top: 0 !important;
}
.mt-1 {
  margin-top: 0.5rem !important;
}
.mt-2 {
  margin-top: 1rem !important;
}
.mt-3 {
  margin-top: 1.5rem !important;
}

.hidden {
  display: none !important;
}
.visible {
  display: block !important;
}

.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-1 {
  gap: 0.5rem;
}
.gap-2 {
  gap: 1rem;
}
.gap-3 {
  gap: 1.5rem;
}

/* ==========================================================================
   21. Print Styles
   ========================================================================== */
@media print {
  body::before {
    display: none;
  }
  .timer-toggle-btn,
  .rest-timer,
  .back-to-top-left-btn {
    display: none;
  }
  .modal {
    display: none !important;
  }
  .profile-panel {
    display: none;
  }
  .container {
    padding: 1rem;
  }
  .dashboard-card,
  .form-section,
  .preset-group {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
}

</file>

<file src="src\js\dashboard.js">
// ===== FUNCTION DEFINITIONS =====

// ADDED: Finds the most frequently logged exercise
function findFavoriteExercise() {
  const sessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")
  if (sessions.length === 0) return "None"

  const exerciseCounts = {}
  sessions.forEach((session) => {
    session.exercises.forEach((exercise) => {
      exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1
    })
  })

  if (Object.keys(exerciseCounts).length === 0) return "None"

  // Find the exercise with the highest count
  const favorite = Object.entries(exerciseCounts).reduce((a, b) => (a[1] > b[1] ? a : b))
  return favorite[0]
}

// ADDED: Populates the profile panel with user data
function populateProfilePanel() {
  const userName = localStorage.getItem("userName") || "User"
  const sessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")

  document.getElementById("profileName").textContent = userName

  // Create avatar from initials
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
  document.getElementById("profileAvatar").textContent = initials

  document.getElementById("totalWorkouts").textContent = sessions.length
  document.getElementById("favoriteExercise").textContent = findFavoriteExercise()
}

// NEW: Populates the workout history modal
function populateWorkoutHistory() {
  const historyList = document.getElementById("historyList")
  const sessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")

  if (sessions.length === 0) {
    historyList.innerHTML = `<div class="empty-state">You haven't completed any workouts yet.</div>`
    return
  }

  historyList.innerHTML = "" // Clear previous content

  // Show most recent sessions first
  sessions
    .slice()
    .reverse()
    .forEach((session) => {
      const date = new Date(session.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      let exercisesHTML = '<ul class="history-exercise-list">'
      session.exercises.forEach((ex) => {
        exercisesHTML += `
                <li>
                    <strong>${ex.name}</strong>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}${ex.unit || "kg"}</span>
                </li>
            `
      })
      exercisesHTML += "</ul>"

      const sessionDiv = document.createElement("div")
      sessionDiv.className = "history-item"
      sessionDiv.innerHTML = `
            <div class="history-header">
                <strong>${session.name}</strong>
                <span class="date">${date}</span>
            </div>
            ${exercisesHTML}
        `
      historyList.appendChild(sessionDiv)
    })
}

function populatePresetSelect() {
  const presetSelect = document.getElementById("presetSelect")
  presetSelect.innerHTML = '<option value="">Select a saved workout</option>'
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
  presets.forEach((preset, index) => {
    const option = document.createElement("option")
    option.value = index
    option.textContent = preset.name
    presetSelect.appendChild(option)
  })
}

function continuePreset() {
  const presetIndex = document.getElementById("presetSelect").value
  if (presetIndex === "") {
    alert("Please select a workout to continue.")
    return
  }
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
  if (presets[presetIndex]) {
    localStorage.setItem("currentWorkout", JSON.stringify(presets[presetIndex]))
    window.location.href = "src/preset.html"
  } else {
    alert("Invalid workout selected.")
  }
}

function displayLastWorkoutSummary() {
  const summaryDiv = document.getElementById("summaryContent")
  const sessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")
  const userName = localStorage.getItem("userName") || ""

  if (sessions.length === 0) {
    summaryDiv.innerHTML = `<div class="empty-state">Ready to start your first workout, ${userName}?</div>`
    return
  }

  const lastSession = sessions[sessions.length - 1]
  const date = new Date(lastSession.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  let html = `
        <div style="margin-bottom: 1rem;">
            <strong style="color: var(--accent-color);">${lastSession.name}</strong>
            <div style="color: var(--text-muted); font-size: 0.9rem;">${date}</div>
        </div>
        <div style="font-size: 0.9rem;">`

  lastSession.exercises.slice(0, 3).forEach((exercise) => {
    html += `
            <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: var(--secondary-bg); border-radius: 6px;">
                <strong>${exercise.name}</strong><br>
                <span style="color: var(--text-muted);">${exercise.sets} sets × ${exercise.reps} reps @ ${exercise.weight}${exercise.unit || "kg"}</span>
            </div>`
  })

  if (lastSession.exercises.length > 3) {
    html += `<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center;">+${lastSession.exercises.length - 3} more exercises</div>`
  }

  html += "</div>"
  summaryDiv.innerHTML = html
}

function saveName() {
  const userNameInput = document.getElementById("userName")
  const userName = userNameInput.value.trim()
  if (userName) {
    localStorage.setItem("userName", userName)
    document.getElementById("greeting").textContent = `Welcome back, ${userName}!`
    document.getElementById("nameModal").style.display = "none"
    document.getElementById("landingPage").style.display = "none"
    document.getElementById("mainContent").style.display = "block"
    document.getElementById("profileToggleBtn").style.display = "flex"
    displayLastWorkoutSummary()
    populatePresetSelect()
    populateProfilePanel()
  } else {
    alert("Please enter your name to continue.")
  }
}

function openNameModal() {
  document.getElementById("nameModal").style.display = "flex"
  document.getElementById("userName").focus()
}

function checkName() {
  const userName = localStorage.getItem("userName")
  if (userName) {
    document.getElementById("greeting").textContent = `Welcome back, ${userName}!`
    document.getElementById("landingPage").style.display = "none"
    document.getElementById("mainContent").style.display = "block"
    document.getElementById("profileToggleBtn").style.display = "flex"
    displayLastWorkoutSummary()
    populatePresetSelect()
    populateProfilePanel()
  } else {
    document.getElementById("landingPage").style.display = "flex"
    document.getElementById("profileToggleBtn").style.display = "none"
  }
}

// ===== ATTACH EVENT LISTENERS & INITIALIZE =====
document.getElementById("getStartedBtn").addEventListener("click", openNameModal)
document.getElementById("saveNameBtn").addEventListener("click", saveName)
document.getElementById("continuePresetBtn").addEventListener("click", continuePreset)
document.getElementById("addWorkoutBtn").addEventListener("click", () => {
  window.location.href = "src/preset.html"
})

document.getElementById("userName").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    saveName()
  }
})

// Event listeners for the profile panel
const profilePanel = document.getElementById("profilePanel")
const profileToggleBtn = document.getElementById("profileToggleBtn")
const closeProfileBtn = document.getElementById("closeProfileBtn")

if (profileToggleBtn) {
  profileToggleBtn.addEventListener("click", () => {
    populateProfilePanel()
    profilePanel.classList.add("is-open")
  })
}

if (closeProfileBtn) {
  closeProfileBtn.addEventListener("click", () => {
    profilePanel.classList.remove("is-open")
  })
}

// Event listeners for the history modal
const historyModal = document.getElementById("historyModal")
const viewHistoryBtn = document.getElementById("viewHistoryBtn")
const closeHistoryBtn = document.getElementById("closeHistoryBtn")

if (viewHistoryBtn) {
  viewHistoryBtn.addEventListener("click", () => {
    populateWorkoutHistory()
    historyModal.style.display = "flex"
  })
}

if (closeHistoryBtn) {
  closeHistoryBtn.addEventListener("click", () => {
    historyModal.style.display = "none"
  })
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === historyModal) {
    historyModal.style.display = "none"
  }
  if (e.target === document.getElementById("nameModal")) {
    document.getElementById("nameModal").style.display = "none"
  }
})

// Initialize the page on load
checkName()

</file>

<file src="src\js\preset.js">
// ===== GLOBAL VARIABLES & CONSTANTS =====
const exercisesByCategory = {
  Chest: [
    "Bench Press",
    "Push-Up",
    "Dumbbell Fly",
    "Incline Dumbbell Press",
    "Cable Crossover",
    "Pec Deck",
    "Incline Bench Press",
  ],
  Back: ["Pull-Up", "Bent-Over Row", "Lat Pulldown", "Deadlift", "Seated Cable Row"],
  Biceps: ["Bicep Curl", "Hammer Curl", "Concentration Curl", "Cable Bicep Curl", "Preacher Curl"],
  Triceps: ["Tricep Dip", "Overhead Tricep Extension", "Skull Crusher", "Tricep Pushdown", "Close-Grip Bench Press"],
  Legs: ["Squat", "Lunge", "Leg Press", "Romanian Deadlift", "Leg Extension", "Hamstring Curl"],
  Arms: ["Bicep Curl", "Tricep Dip", "Hammer Curl", "Overhead Tricep Extension", "Preacher Curl"],
  Core: ["Plank", "Russian Twist", "Hanging Leg Raise", "Crunches", "Leg Raises"],
}
let currentWorkout = { name: "", exercises: [] }
let editingIndex = null
let currentWeightUnit = "kg"
let isLiveMode = false

// Timer and Stopwatch variables
let timeLeft = 300
let elapsedTime = 0
let timerInterval = null
let stopwatchInterval = null
let stopwatchCtx

// ===== FUNCTION DEFINITIONS =====

// NEW: Shows/hides recent performance for a given exercise
function displayExerciseHistory(exerciseName) {
  const historyContainer = document.getElementById("exerciseHistoryContainer")
  const historyContent = document.getElementById("exerciseHistoryContent")
  const allSessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")

  const relevantPerformances = []
  // Go through all sessions in reverse (most recent first)
  allSessions
    .slice()
    .reverse()
    .forEach((session) => {
      // Find exercises in that session that match the name
      session.exercises.forEach((ex) => {
        if (ex.name.toLowerCase() === exerciseName.toLowerCase()) {
          relevantPerformances.push({
            date: session.date,
            details: `${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}${ex.unit || "kg"}`,
          })
        }
      })
    })

  // Take the last 3 found
  const recentPerformances = relevantPerformances.slice(0, 3)

  if (recentPerformances.length > 0) {
    let html = ""
    recentPerformances.forEach((perf) => {
      const date = new Date(perf.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      html += `
                <div class="history-entry">
                    <span class="date">${date}</span>
                    <span class="performance">${perf.details}</span>
                </div>
            `
    })
    historyContent.innerHTML = html
    historyContainer.style.display = "block"
  } else {
    // No history for this exercise, so hide the container
    historyContent.innerHTML =
      '<div class="empty-state" style="font-size: 0.9rem;">No history for this exercise yet. Go for it!</div>'
    historyContainer.style.display = "block"
  }
}

function hideExerciseHistory() {
  document.getElementById("exerciseHistoryContainer").style.display = "none"
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

function drawCircularStopwatch(timeInSeconds) {
  const canvas = document.getElementById("stopwatchCanvas")
  if (!stopwatchCtx) stopwatchCtx = canvas.getContext("2d")
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = (Math.min(canvas.width, canvas.height) / 2) * 0.8

  stopwatchCtx.clearRect(0, 0, canvas.width, canvas.height)
  stopwatchCtx.beginPath()
  stopwatchCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  stopwatchCtx.strokeStyle = "var(--accent-color)"
  stopwatchCtx.lineWidth = 2
  stopwatchCtx.stroke()

  const angle = (timeInSeconds % 60) * ((2 * Math.PI) / 60) - Math.PI / 2
  stopwatchCtx.beginPath()
  stopwatchCtx.moveTo(centerX, centerY)
  stopwatchCtx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
  stopwatchCtx.strokeStyle = "#FFFFFF"
  stopwatchCtx.lineWidth = 2
  stopwatchCtx.stroke()

  stopwatchCtx.beginPath()
  stopwatchCtx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
  stopwatchCtx.fillStyle = "#FFFFFF"
  stopwatchCtx.fill()
}

function updateTimerDisplay() {
  document.getElementById("timerDisplay").textContent = formatTime(timeLeft)
  drawCircularStopwatch(elapsedTime)
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--
        updateTimerDisplay()
      } else {
        stopTimer()
      }
    }, 1000)
    stopwatchInterval = setInterval(() => {
      elapsedTime++
      updateTimerDisplay()
    }, 1000)
  }
}

function stopTimer() {
  clearInterval(timerInterval)
  clearInterval(stopwatchInterval)
  timerInterval = null
  stopwatchInterval = null
}

function resetTimer() {
  stopTimer()
  timeLeft = 300
  elapsedTime = 0
  updateTimerDisplay()
}

function openExerciseModal() {
  document.getElementById("exerciseModal").style.display = "flex"
}

function closeExerciseModal() {
  document.getElementById("exerciseModal").style.display = "none"
}

function selectExercise(exercise) {
  document.getElementById("exerciseInput").value = exercise
  displayExerciseHistory(exercise)
  closeExerciseModal()
}

function filterCategory(category) {
  document.querySelectorAll(".exercise-category").forEach((cat) => {
    cat.style.display = category === "all" || cat.dataset.category === category ? "block" : "none"
  })
}

function toggleWeightUnit() {
  currentWeightUnit = currentWeightUnit === "kg" ? "lbs" : "kg"
  document.getElementById("weightUnitBtn").textContent = currentWeightUnit
}

function addOrUpdateExercise() {
  const exerciseName = document.getElementById("exerciseInput").value.trim()
  const sets = document.getElementById("sets").value
  const weight = document.getElementById("weight").value
  const reps = document.getElementById("reps").value

  if (!exerciseName || !sets || !weight || !reps) {
    alert("Please fill in all exercise fields.")
    return
  }
  const exercise = {
    name: exerciseName,
    sets: Number.parseInt(sets),
    weight: Number.parseFloat(weight),
    unit: currentWeightUnit,
    reps: Number.parseInt(reps),
    completed: [],
  }

  if (editingIndex !== null) {
    currentWorkout.exercises[editingIndex] = exercise
  } else {
    currentWorkout.exercises.push(exercise)
  }

  renderWorkoutPlan()
  saveCurrentWorkout()
  clearExerciseInputs()
}

function editExercise(index) {
  const exercise = currentWorkout.exercises[index]
  editingIndex = index
  document.getElementById("exerciseInput").value = exercise.name
  document.getElementById("sets").value = exercise.sets
  document.getElementById("weight").value = exercise.weight
  document.getElementById("reps").value = exercise.reps
  currentWeightUnit = exercise.unit || "kg"
  document.getElementById("weightUnitBtn").textContent = currentWeightUnit
  document.getElementById("addOrUpdateExerciseBtn").innerHTML =
    '<span class="button-icon">✏️</span><span>Update Exercise</span>'
  displayExerciseHistory(exercise.name)
  window.scrollTo(0, 0)
}

function removeExercise(index) {
  if (confirm(`Are you sure you want to remove ${currentWorkout.exercises[index].name}?`)) {
    currentWorkout.exercises.splice(index, 1)
    renderWorkoutPlan()
    saveCurrentWorkout()
  }
}

function renderWorkoutPlan() {
  const planDiv = document.getElementById("workoutPlan")
  planDiv.innerHTML = ""
  if (currentWorkout.exercises.length === 0) {
    planDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏋️</div>
                <p>No exercises added yet</p>
                <span>Start building your workout above</span>
            </div>
        `
    return
  }

  currentWorkout.exercises.forEach((ex, index) => {
    const exerciseDiv = document.createElement("div")
    exerciseDiv.className = "exercise-item"

    if (isLiveMode) {
      exerciseDiv.classList.add("exercise-item-live")
      let setCheckboxesHTML = '<div class="set-tracker">'
      for (let i = 0; i < ex.sets; i++) {
        const isChecked = ex.completed[i]
        setCheckboxesHTML += `
                    <label class="set-checkbox-label ${isChecked ? "checked" : ""}" for="set-${index}-${i}">
                        ${i + 1}
                        <input type="checkbox" class="set-checkbox" id="set-${index}-${i}" data-ex-index="${index}" data-set-index="${i}" ${isChecked ? "checked" : ""}>
                    </label>
                `
      }
      setCheckboxesHTML += "</div>"
      exerciseDiv.innerHTML = `
                <div>
                    <strong>${ex.name}</strong><br>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight} ${ex.unit}</span>
                </div>
                ${setCheckboxesHTML}`
    } else {
      exerciseDiv.innerHTML = `
                <div>
                    <strong>${ex.name}</strong><br>
                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight} ${ex.unit}</span>
                </div>
                <div>
                    <button class="edit-btn" data-index="${index}">✏️ Edit</button>
                    <button class="remove-btn" data-index="${index}">🗑️ Remove</button>
                </div>`
    }
    planDiv.appendChild(exerciseDiv)
  })
}

function clearExerciseInputs() {
  document.getElementById("exerciseInput").value = ""
  document.getElementById("sets").value = ""
  document.getElementById("weight").value = ""
  document.getElementById("reps").value = ""
  currentWeightUnit = "kg"
  document.getElementById("weightUnitBtn").textContent = currentWeightUnit
  document.getElementById("addOrUpdateExerciseBtn").innerHTML =
    '<span class="button-icon">➕</span><span>Add Exercise</span>'
  editingIndex = null
  hideExerciseHistory()
}

function saveCurrentWorkout() {
  localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout))
}

function toggleDeleteSectionVisibility() {
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
  const deleteSection = document.getElementById("delete-controls-section")
  if (deleteSection) {
    if (presets && presets.length > 0) {
      deleteSection.style.display = "flex"
    } else {
      deleteSection.style.display = "none"
    }
  }
}

function saveWorkoutPlan() {
  const workoutName = document.getElementById("workoutName").value.trim()
  if (!workoutName) {
    alert("Please enter a workout name to save the plan.")
    return
  }
  if (currentWorkout.exercises.length === 0) {
    alert("Please add at least one exercise to save the plan.")
    return
  }

  currentWorkout.name = workoutName
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
  const presetIndex = presets.findIndex((p) => p.name === workoutName)

  if (presetIndex > -1) {
    if (confirm(`A preset named "${workoutName}" already exists. Do you want to overwrite it?`)) {
      presets[presetIndex] = currentWorkout
    } else {
      return
    }
  } else {
    presets.push(currentWorkout)
  }

  localStorage.setItem("workoutPresets", JSON.stringify(presets))
  updatePresetSelects()
  alert(`Workout plan "${workoutName}" saved!`)
  toggleDeleteSectionVisibility()
}

function toggleLiveMode(live) {
  isLiveMode = live
  const planningControls = document.getElementById("planningControls")
  const pageTitle = document.getElementById("pageTitle")

  const startBtn = document.getElementById("startWorkoutBtn")
  const savePlanBtn = document.getElementById("savePlanBtn")
  const finishBtn = document.getElementById("finishWorkoutBtn")
  const cancelBtn = document.getElementById("cancelWorkoutBtn")

  if (live) {
    planningControls.style.display = "none"
    pageTitle.innerHTML = '<span class="page-icon">🔥</span>Workout in Progress'
    pageTitle.classList.add("live-mode-title")

    startBtn.style.display = "none"
    savePlanBtn.style.display = "none"
    finishBtn.style.display = "inline-flex"
    cancelBtn.style.display = "inline-flex"

    document.getElementById("showTimerBtn").style.display = "flex"
  } else {
    planningControls.style.display = "block"
    pageTitle.innerHTML = '<span class="page-icon">💪</span>Plan Your Workout'
    pageTitle.classList.remove("live-mode-title")

    startBtn.style.display = "inline-flex"
    savePlanBtn.style.display = "inline-flex"
    finishBtn.style.display = "none"
    cancelBtn.style.display = "none"

    document.getElementById("showTimerBtn").style.display = "none"
    document.querySelector(".rest-timer").style.display = "none"
  }
  renderWorkoutPlan()
}

function startWorkout() {
  if (currentWorkout.exercises.length === 0) {
    alert("Please add at least one exercise to start a workout.")
    return
  }
  if (!document.getElementById("workoutName").value.trim()) {
    alert("Please give your workout a name before starting.")
    return
  }
  currentWorkout.name = document.getElementById("workoutName").value.trim()
  toggleLiveMode(true)
}

function finishWorkout() {
  const completedExercises = currentWorkout.exercises.filter(
    (ex) => ex.completed && ex.completed.some((c) => c === true),
  )

  if (completedExercises.length === 0) {
    alert("You haven't completed any sets. Finish at least one set to save the workout.")
    return
  }

  const session = {
    name: currentWorkout.name,
    date: new Date().toISOString(),
    exercises: completedExercises.map((ex) => ({ ...ex, sets: ex.completed.filter((c) => c === true).length })),
  }

  const sessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")
  sessions.push(session)
  localStorage.setItem("workoutSessions", JSON.stringify(sessions))

  alert("Great job! Workout saved.")
  localStorage.removeItem("currentWorkout")
  window.location.href = "../index.html"
}

function cancelWorkout() {
  if (confirm("Are you sure you want to cancel this workout? Your progress will not be saved.")) {
    currentWorkout.exercises.forEach((ex) => (ex.completed = []))
    toggleLiveMode(false)
  }
}

function confirmDeletePreset() {
  const select = document.getElementById("deletePresetSelect")
  const presetIndex = select.value
  if (presetIndex === "") {
    alert("Please select a preset to delete.")
    return
  }
  const presetName = select.options[select.selectedIndex].text
  if (confirm(`Are you sure you want to delete the preset "${presetName}"?`)) {
    const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
    presets.splice(presetIndex, 1)
    localStorage.setItem("workoutPresets", JSON.stringify(presets))
    updatePresetSelects()
    if (currentWorkout.name === presetName) {
      currentWorkout = { name: "", exercises: [] }
      document.getElementById("workoutName").value = ""
      renderWorkoutPlan()
      saveCurrentWorkout()
    }
    alert("Preset deleted!")
    toggleDeleteSectionVisibility()
  }
}

function updatePresetSelects() {
  const presetSelect = document.getElementById("presetSelect")
  const deleteSelect = document.getElementById("deletePresetSelect")
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")

  presetSelect.innerHTML = '<option value="">Select a saved preset</option>'
  deleteSelect.innerHTML = '<option value="">Select a preset to delete</option>'

  presets.forEach((preset, index) => {
    presetSelect.add(new Option(preset.name, index))
    deleteSelect.add(new Option(preset.name, index))
  })
}

function loadPreset() {
  const presetIndex = document.getElementById("presetSelect").value
  if (presetIndex === "") return
  const presets = JSON.parse(localStorage.getItem("workoutPresets") || "[]")
  if (presets[presetIndex]) {
    currentWorkout = JSON.parse(JSON.stringify(presets[presetIndex]))
    currentWorkout.exercises.forEach((ex) => {
      if (!ex.completed) {
        ex.completed = []
      }
    })
    document.getElementById("workoutName").value = currentWorkout.name
    renderWorkoutPlan()
    saveCurrentWorkout()
  }
}

function populateExerciseModal() {
  const categoriesDiv = document.getElementById("exerciseCategories")
  const categoryButtonsDiv = document.getElementById("categoryButtons")
  categoriesDiv.innerHTML = ""
  categoryButtonsDiv.innerHTML = ""

  const allCategories = ["all", ...Object.keys(exercisesByCategory)]
  allCategories.forEach((catName) => {
    const btn = document.createElement("button")
    btn.textContent = catName
    btn.dataset.category = catName
    categoryButtonsDiv.appendChild(btn)
  })

  for (const [category, exercises] of Object.entries(exercisesByCategory)) {
    const categoryDiv = document.createElement("div")
    categoryDiv.className = "exercise-category"
    categoryDiv.dataset.category = category
    categoryDiv.innerHTML = `<h4>${category}</h4>`
    const ul = document.createElement("ul")
    ul.className = "exercise-list"
    exercises.forEach((exName) => {
      const li = document.createElement("li")
      li.textContent = exName
      li.dataset.exercise = exName
      ul.appendChild(li)
    })
    categoryDiv.appendChild(ul)
    categoriesDiv.appendChild(categoryDiv)
  }
}

// ===== ATTACH EVENT LISTENERS & INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  populateExerciseModal()
  updatePresetSelects()
  toggleDeleteSectionVisibility()

  const savedWorkout = localStorage.getItem("currentWorkout")
  if (savedWorkout) {
    currentWorkout = JSON.parse(savedWorkout)
    document.getElementById("workoutName").value = currentWorkout.name || ""
  }
  renderWorkoutPlan()

  updateTimerDisplay()

  const showTimerBtn = document.getElementById("showTimerBtn")
  const closeTimerBtn = document.getElementById("closeTimerBtn")
  const restTimerDiv = document.querySelector(".rest-timer")

  showTimerBtn.addEventListener("click", () => {
    restTimerDiv.style.display = "block"
    showTimerBtn.style.display = "none"
  })
  closeTimerBtn.addEventListener("click", () => {
    restTimerDiv.style.display = "none"
    showTimerBtn.style.display = "flex"
  })

  document.getElementById("selectExerciseBtn").addEventListener("click", openExerciseModal)
  document.getElementById("closeModalTopBtn").addEventListener("click", closeExerciseModal)
  document.getElementById("closeModalBottomBtn").addEventListener("click", closeExerciseModal)
  document.getElementById("addOrUpdateExerciseBtn").addEventListener("click", addOrUpdateExercise)

  document.getElementById("savePlanBtn").addEventListener("click", saveWorkoutPlan)
  document.getElementById("startWorkoutBtn").addEventListener("click", startWorkout)
  document.getElementById("finishWorkoutBtn").addEventListener("click", finishWorkout)
  document.getElementById("cancelWorkoutBtn").addEventListener("click", cancelWorkout)

  document.getElementById("confirmDeleteBtn").addEventListener("click", confirmDeletePreset)
  document.getElementById("weightUnitBtn").addEventListener("click", toggleWeightUnit)
  document.getElementById("presetSelect").addEventListener("change", loadPreset)
  document.getElementById("backToDashboardBtn").addEventListener("click", () => {
    if (isLiveMode) {
      if (confirm("You have a workout in progress. Are you sure you want to leave without saving?")) {
        localStorage.removeItem("currentWorkout")
        window.location.href = "../index.html"
      }
    } else {
      localStorage.removeItem("currentWorkout")
      window.location.href = "../index.html"
    }
  })

  // Event listeners for exercise history
  const exerciseInput = document.getElementById("exerciseInput")
  exerciseInput.addEventListener("blur", () => {
    const exerciseName = exerciseInput.value.trim()
    if (exerciseName) {
      displayExerciseHistory(exerciseName)
    }
  })
  exerciseInput.addEventListener("input", () => {
    if (!exerciseInput.value.trim()) {
      hideExerciseHistory()
    }
  })

  document.getElementById("startTimerBtn").addEventListener("click", startTimer)
  document.getElementById("stopTimerBtn").addEventListener("click", stopTimer)
  document.getElementById("resetTimerBtn").addEventListener("click", resetTimer)

  document.getElementById("workoutPlan").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      editExercise(e.target.dataset.index)
    }
    if (e.target.classList.contains("remove-btn")) {
      removeExercise(e.target.dataset.index)
    }
    if (e.target.classList.contains("set-checkbox")) {
      const exIndex = e.target.dataset.exIndex
      const setIndex = e.target.dataset.setIndex
      currentWorkout.exercises[exIndex].completed[setIndex] = e.target.checked
      e.target.parentElement.classList.toggle("checked", e.target.checked)
      saveCurrentWorkout()
    }
  })

  document.getElementById("categoryButtons").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      filterCategory(e.target.dataset.category)
    }
  })

  document.getElementById("exerciseCategories").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      selectExercise(e.target.dataset.exercise)
    }
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("exerciseModal")) {
      closeExerciseModal()
    }
  })
})

</file>

<file src="src\js\progress.js">
document.addEventListener("DOMContentLoaded", () => {
  const exerciseSelect = document.getElementById("exerciseSelect")
  const metricSelect = document.getElementById("metricSelect")
  const ctx = document.getElementById("progressChart").getContext("2d")
  let progressChart

  const allSessions = JSON.parse(localStorage.getItem("workoutSessions") || "[]")

  console.log("All sessions:", allSessions) // Debug log

  function toggleNoDataMessage(show) {
    const noDataMessage = document.getElementById("noDataMessage")
    const chartCanvas = document.getElementById("progressChart")

    if (show) {
      if (noDataMessage) noDataMessage.style.display = "flex"
      chartCanvas.style.display = "none"
    } else {
      if (noDataMessage) noDataMessage.style.display = "none"
      chartCanvas.style.display = "block"
    }
  }

  // Show no data message if no sessions exist
  if (allSessions.length === 0) {
    toggleNoDataMessage(true)
  }

  function populateExerciseSelect() {
    const uniqueExercises = new Set()
    allSessions.forEach((session) => {
      session.exercises.forEach((ex) => uniqueExercises.add(ex.name))
    })

    console.log("Unique exercises found:", Array.from(uniqueExercises)) // Debug log

    exerciseSelect.innerHTML = '<option value="">-- Select an Exercise --</option>'

    if (uniqueExercises.size === 0) {
      // If no workout history, show a helpful message
      const option = document.createElement("option")
      option.value = ""
      option.textContent = "Complete some workouts first to see progress"
      option.disabled = true
      exerciseSelect.appendChild(option)
      return
    }

    // If there are exercises from workout history, populate normally
    const sortedExercises = Array.from(uniqueExercises).sort()
    sortedExercises.forEach((exName) => {
      const option = document.createElement("option")
      option.value = exName
      option.textContent = exName
      exerciseSelect.appendChild(option)
    })
  }

  function calculateChartData(exerciseName, metric) {
    const labels = []
    const data = []

    console.log("Calculating chart data for:", exerciseName, "metric:", metric) // Debug log

    // Filter for sessions that include the selected exercise
    const relevantSessions = allSessions
      .filter((session) => session.exercises.some((ex) => ex.name === exerciseName))
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending

    console.log("Relevant sessions:", relevantSessions) // Debug log

    relevantSessions.forEach((session) => {
      labels.push(new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }))

      let metricValue = 0
      const exercisesInSession = session.exercises.filter((ex) => ex.name === exerciseName)

      console.log("Exercises in session:", exercisesInSession) // Debug log

      switch (metric) {
        case "maxWeight":
          metricValue = Math.max(...exercisesInSession.map((ex) => ex.weight))
          break
        case "totalVolume":
          metricValue = exercisesInSession.reduce((total, ex) => total + ex.sets * ex.reps * ex.weight, 0)
          break
        case "bestSet":
          const bestSetValue = Math.max(...exercisesInSession.map((ex) => ex.reps * ex.weight))
          metricValue = bestSetValue > 0 ? bestSetValue : 0
          break
      }
      data.push(metricValue)
    })

    console.log("Chart data calculated:", { labels, data }) // Debug log
    return { labels, data }
  }

  function createOrUpdateChart() {
    const selectedExercise = exerciseSelect.value
    const selectedMetric = metricSelect.value

    console.log("Creating chart for:", selectedExercise, selectedMetric) // Debug log

    if (!selectedExercise) {
      if (progressChart) {
        progressChart.destroy()
        progressChart = null
      }
      return
    }

    const { labels, data } = calculateChartData(selectedExercise, selectedMetric)

    if (progressChart) {
      progressChart.destroy()
      progressChart = null
    }

    // If no data available, show a message on canvas
    if (labels.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = "#a1a1aa" // var(--text-muted)
      ctx.font = "16px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`No workout data found for ${selectedExercise}`, ctx.canvas.width / 2, ctx.canvas.height / 2 - 10)
      ctx.fillText("Complete some workouts to see your progress!", ctx.canvas.width / 2, ctx.canvas.height / 2 + 20)
      return
    }

    // Check if Chart.js is loaded
    if (typeof Chart === "undefined") {
      console.error("Chart.js is not loaded!")
      ctx.fillStyle = "#ef4444"
      ctx.font = "16px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Chart.js failed to load", ctx.canvas.width / 2, ctx.canvas.height / 2)
      return
    }

    try {
      progressChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${selectedExercise} - ${metricSelect.options[metricSelect.selectedIndex].text}`,
              data: data,
              borderColor: "#6366f1", // var(--accent-color)
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              borderWidth: 3,
              tension: 0.3,
              fill: true,
              pointBackgroundColor: "#6366f1",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                color: "#ffffff", // var(--text-primary)
                font: { size: 14, weight: "600" },
                usePointStyle: true,
                padding: 20,
              },
            },
            tooltip: {
              backgroundColor: "rgba(30, 30, 30, 0.9)",
              titleColor: "#ffffff",
              bodyColor: "#a1a1aa",
              borderColor: "#6366f1",
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#a1a1aa", // var(--text-secondary)
                font: { size: 12 },
              },
              grid: {
                color: "#2d2d2d", // var(--border-color)
                drawBorder: false,
              },
            },
            x: {
              ticks: {
                color: "#a1a1aa", // var(--text-secondary)
                font: { size: 12 },
              },
              grid: {
                color: "#2d2d2d", // var(--border-color)
                drawBorder: false,
              },
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      })

      console.log("Chart created successfully:", progressChart) // Debug log
    } catch (error) {
      console.error("Error creating chart:", error)
      ctx.fillStyle = "#ef4444"
      ctx.font = "16px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Error creating chart", ctx.canvas.width / 2, ctx.canvas.height / 2)
    }
  }

  // Attach event listeners
  exerciseSelect.addEventListener("change", () => {
    console.log("Exercise selection changed to:", exerciseSelect.value) // Debug log
    if (allSessions.length > 0) {
      toggleNoDataMessage(false)
      createOrUpdateChart()
    }
  })

  metricSelect.addEventListener("change", () => {
    console.log("Metric selection changed to:", metricSelect.value) // Debug log
    if (allSessions.length > 0 && exerciseSelect.value) {
      toggleNoDataMessage(false)
      createOrUpdateChart()
    }
  })

  // Initial setup
  populateExerciseSelect()

  // If there are sessions and exercises, hide the no data message
  if (allSessions.length > 0) {
    toggleNoDataMessage(false)
  }
})
</file>

<file src="src\preset.html">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>repGraph - Workout Preset</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/app.css">
</head>
<body class="preset-page">
    <button id="backToDashboardBtn" class="secondary-button back-to-top-left-btn">
        <span class="button-arrow rotate-180">→</span>
        <span>Back to Dashboard</span>
    </button>
    <div class="container">
        <div class="page-header">
            <h1 id="pageTitle">
                <span class="page-icon">💪</span>
                Plan Your Workout
            </h1>
            <p class="page-subtitle">Create and customize your perfect workout routine</p>
        </div>
        
        <!-- This entire block will be hidden during a live workout -->
        <div id="planningControls">
            <div class="form-section">
                <div class="form-group">
                    <label>
                        <span class="label-icon">📝</span>
                        Workout Name
                    </label>
                    <div class="input-container">
                        <input type="text" id="workoutName" placeholder="Enter workout name" class="input-field">
                        <div class="input-underline"></div>
                    </div>
                </div>
            </div>
            
            <div class="preset-group">
                <div class="section-header">
                    <h3>
                        <span class="section-icon">⚙️</span>
                        Manage Presets
                    </h3>
                </div>
                <div class="form-group">
                    <label>Load Preset:</label>
                    <select id="presetSelect" class="preset-select">
                        <option value="">Select a saved preset</option>
                    </select>
                </div>
                <div id="delete-controls-section" class="form-group delete-section" style="display: none;">
                    <label>Delete Preset:</label>
                    <div class="delete-controls">
                        <select id="deletePresetSelect" class="preset-select">
                            <option value="">Select a preset to delete</option>
                        </select>
                        <button id="confirmDeleteBtn" class="danger-button">
                            <span>🗑️</span>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <div class="section-header">
                    <h3>
                        <span class="section-icon">➕</span>
                        Add Exercise
                    </h3>
                </div>
                <div class="exercise-form">
                    <div class="exercise-group">
                        <div class="form-group">
                            <label>Exercise:</label>
                            <div class="exercise-input-group">
                                <input type="text" id="exerciseInput" placeholder="Type or select an exercise" class="input-field">
                                <button id="selectExerciseBtn" class="secondary-button">
                                    <span>📋</span>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="exercise-details">
                        <div class="form-group">
                            <label>Sets:</label>
                            <input type="number" id="sets" placeholder="Sets" class="input-field">
                        </div>
                        <div class="form-group weight-group">
                            <label>Weight:</label>
                            <div class="weight-input-group">
                                <input type="number" id="weight" placeholder="Weight" class="input-field">
                                <button id="weightUnitBtn" class="weight-unit-btn">kg</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Reps:</label>
                            <input type="number" id="reps" placeholder="Reps" class="input-field">
                        </div>
                    </div>
                    
                    <button id="addOrUpdateExerciseBtn" class="primary-button full-width">
                        <span class="button-icon">➕</span>
                        <span>Add Exercise</span>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Exercise History Container (initially hidden) -->
        <div id="exerciseHistoryContainer" class="exercise-history-container" style="display: none;">
            <h4>
                <span class="history-icon">📊</span>
                Recent Performance
            </h4>
            <div id="exerciseHistoryContent">
                <!-- History entries will be populated here -->
            </div>
        </div>
        
        <div class="workout-section">
            <div class="section-header">
                <h3>
                    <span class="section-icon">📋</span>
                    Current Workout Plan
                </h3>
            </div>
            <div class="workout-plan" id="workoutPlan">
                <div class="empty-state">
                    <div class="empty-icon">🏋️</div>
                    <p>No exercises added yet</p>
                    <span>Start building your workout above</span>
                </div>
            </div>
        </div>

        <div class="action-buttons-container">
            <!-- Planning Mode Buttons -->
            <button id="startWorkoutBtn" class="primary-button pulse-on-hover">
                <span class="button-icon">🚀</span>
                <span>Start Workout</span>
                <span class="button-glow"></span>
            </button>
            <button id="savePlanBtn" class="secondary-button">
                <span class="button-icon">💾</span>
                <span>Save Plan Only</span>
            </button>

            <!-- Live Mode Buttons (hidden by default) -->
            <button id="finishWorkoutBtn" class="success-button" style="display:none;">
                <span class="button-icon">✅</span>
                <span>Finish & Save Workout</span>
            </button>
            <button id="cancelWorkoutBtn" class="danger-button" style="display:none;">
                <span class="button-icon">❌</span>
                <span>Cancel Workout</span>
            </button>
        </div>
    </div>
    
    <button id="showTimerBtn" class="timer-toggle-btn">
        <div class="timer-content">
            <span class="timer-icon">⏱️</span>
            <span>Rest Timer</span>
        </div>
    </button>

    <!-- This timer pop-up is hidden by default -->
    <div class="rest-timer">
        <button id="closeTimerBtn" class="close-timer-btn">×</button>
        <div class="timer-header">
            <h3>Rest Timer</h3>
            <canvas id="stopwatchCanvas" width="60" height="60"></canvas>
        </div>
        <div id="timerDisplay" class="timer-display">5:00</div>
        <div class="timer-controls">
            <button id="startTimerBtn" class="start-button">
                <span>▶️</span>
                Start
            </button>
            <button id="stopTimerBtn" class="stop-button">
                <span>⏸️</span>
                Stop
            </button>
            <button id="resetTimerBtn" class="reset-button">
                <span>🔄</span>
                Reset
            </button>
        </div>
    </div>

    <div id="exerciseModal" class="modal">
        <div class="modal-content large-modal">
            <button id="closeModalTopBtn" class="close-modal-top">×</button>
            <div class="modal-header">
                <h3 class="modal-title">Select Exercise</h3>
                <p class="modal-subtitle">Choose from our exercise library</p>
            </div>
            <div class="category-buttons" id="categoryButtons">
                <!-- Buttons will be generated by JS -->
            </div>
            <div id="exerciseCategories" class="exercise-categories"></div>
            <button id="closeModalBottomBtn" class="secondary-button full-width">
                <span>Close</span>
            </button>
        </div>
    </div>

    <script src="js/preset.js"></script>
</body>
</html>

</file>

</codebase>
