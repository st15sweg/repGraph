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