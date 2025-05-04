const workouts = {
    chest: [
      {
        name: "Push-Ups",
        explanation: "Start in a high plank position with your hands placed slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up to the starting position.",
        targets: "Pectorals (chest), triceps, shoulders."
      },
      {
        name: "Chest Press (Bench Press)",
        explanation: "Lie on a flat bench with a dumbbell in each hand. Push the dumbbells up until your arms are extended, then lower them slowly until your elbows are at about 90 degrees.",
        targets: "Pectorals, triceps, deltoids."
      },
      {
        name: "Chest Flys",
        explanation: "Lie on a bench holding dumbbells, arms extended above your chest. Slowly lower the dumbbells out to your sides with a slight bend in the elbows, then return to the starting position.",
        targets: "Pectorals."
      }
    ],
    back: [
      {
        name: "Pull-Ups",
        explanation: "Hang from a bar with your palms facing away from you. Pull your body up until your chin passes the bar, then lower yourself back down.",
        targets: "Latissimus dorsi, biceps, shoulders."
      },
      {
        name: "Bent-Over Rows",
        explanation: "Hold a barbell or dumbbells with your palms facing you. Bend at the waist and pull the weight towards your torso, keeping your back flat. Lower the weight slowly back down.",
        targets: "Lats, rhomboids, traps, biceps."
      },
      {
        name: "Deadlifts",
        explanation: "Stand with your feet shoulder-width apart and grip the barbell with both hands. Keep your back flat and lift the bar by extending your hips and knees, then lower it back down slowly.",
        targets: "Hamstrings, glutes, lower back."
      }
    ],
    legs: [
      {
        name: "Squats",
        explanation: "Stand with your feet shoulder-width apart, bend your knees and hips to lower your body as if sitting in a chair, keeping your chest up. Push through your heels to stand back up.",
        targets: "Quadriceps, hamstrings, glutes."
      },
      {
        name: "Lunges",
        explanation: "Take a big step forward, lowering your hips until both knees are at 90-degree angles. Push through the front foot to return to the starting position. Repeat on the other leg.",
        targets: "Quadriceps, hamstrings, glutes."
      },
      {
        name: "Leg Press",
        explanation: "Sit on a leg press machine with your feet shoulder-width apart. Press the platform away from you by extending your knees, then slowly return the platform to the starting position.",
        targets: "Quadriceps, hamstrings, glutes."
      }
    ],
    shoulders: [
      {
        name: "Overhead Shoulder Press",
        explanation: "Sit or stand with dumbbells in each hand. Press the dumbbells overhead until your arms are fully extended, then slowly lower them back to the starting position.",
        targets: "Deltoids, triceps."
      },
      {
        name: "Lateral Raises",
        explanation: "Stand with dumbbells by your sides, then raise your arms out to the sides until they are at shoulder height. Lower them back down slowly.",
        targets: "Lateral deltoids."
      },
      {
        name: "Front Raises",
        explanation: "Hold dumbbells in front of your thighs with palms facing you. Raise the dumbbells straight in front of you until they reach shoulder height, then lower them back down.",
        targets: "Anterior deltoids."
      }
    ],
    arms: [
      {
        name: "Bicep Curls",
        explanation: "Stand with dumbbells in both hands, arms extended straight down. Curl the weights up to shoulder height, keeping your elbows stationary. Slowly lower the weights back down.",
        targets: "Biceps."
      },
      {
        name: "Tricep Dips",
        explanation: "Sit on a bench with your hands gripping the edge. Place your feet on the ground in front of you. Lower your body by bending your elbows to a 90-degree angle, then press back up.",
        targets: "Triceps."
      },
      {
        name: "Hammer Curls",
        explanation: "Hold dumbbells with your palms facing each other. Curl the weights up towards your shoulders, keeping your elbows close to your body. Slowly lower back down.",
        targets: "Biceps, brachialis."
      }
    ],
    core: [
      {
        name: "Planks",
        explanation: "Start in a forearm plank position with your body in a straight line. Engage your core and hold for a set amount of time, keeping your hips level.",
        targets: "Core, abs, lower back."
      },
      {
        name: "Russian Twists",
        explanation: "Sit on the floor with your knees bent, leaning back slightly. Hold a weight or medicine ball with both hands, and twist your torso to each side.",
        targets: "Obliques, abs."
      },
      {
        name: "Leg Raises",
        explanation: "Lie flat on your back with your legs extended. Lift your legs toward the ceiling while keeping them straight, then lower them back down without touching the ground.",
        targets: "Lower abs."
      }
    ],
    cardio: [
      {
        name: "Jumping Jacks",
        explanation: "Stand upright with your legs together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then return to the starting position.",
        targets: "Full body, cardiovascular system."
      },
      {
        name: "High Knees",
        explanation: "Stand tall and jog in place, lifting your knees as high as possible with each step, aiming for your waist or chest.",
        targets: "Legs, glutes, cardiovascular system."
      },
      {
        name: "Burpees",
        explanation: "Start standing, then squat down, placing your hands on the floor. Jump your feet back into a plank, perform a push-up, then jump your feet back to your hands and leap into the air.",
        targets: "Full body, cardiovascular system."
      }
    ]
  };
  

  
    // Add more muscle groups similarly...

  
  document.querySelectorAll('.workout-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const muscle = link.getAttribute('data-muscle');
      displayWorkouts(workouts[muscle], muscle);
    });
  });
  
  function displayWorkouts(workoutList, muscle) {
    const container = document.getElementById("workout-content");
    container.innerHTML = `<h3>${muscle.toUpperCase()} Workouts</h3>`;
  
    workoutList.forEach((workout, index) => {
      const timerId = `timer-${muscle}-${index}`;
      const workoutHTML = `
        <div class="workout-box">
          <h5>${workout.name}</h5>
          <p>${workout.explanation}</p>
          <div class="timer" id="${timerId}">00:45</div>
          <div class="timer-controls">
            <button class="btn btn-success" onclick="startWorkoutTimer('${timerId}')">Start</button>
            <button class="btn btn-warning" onclick="pauseWorkoutTimer('${timerId}')">Pause</button>
            <button class="btn btn-danger" onclick="resetWorkoutTimer('${timerId}')">Reset</button>
          </div>
        </div>
      `;
      container.innerHTML += workoutHTML;
  
      createTimer(timerId, 45); // 45 seconds preset
    });
  }
  
  // Individual timers
  const timers = {};
  
  function createTimer(id, duration) {
    timers[id] = {
      time: duration,
      interval: null,
      running: false
    };
    updateTimerDisplay(id);
  }
  
  function updateTimerDisplay(id) {
    const time = timers[id].time;
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    document.getElementById(id).textContent = `${mins}:${secs}`;
  }
  
  function startWorkoutTimer(id) {
    if (!timers[id].running) {
      timers[id].running = true;
      timers[id].interval = setInterval(() => {
        if (timers[id].time > 0) {
          timers[id].time--;
          updateTimerDisplay(id);
        } else {
          clearInterval(timers[id].interval);
          timers[id].running = false;
        }
      }, 1000);
    }
  }
  
  function pauseWorkoutTimer(id) {
    clearInterval(timers[id].interval);
    timers[id].running = false;
  }
  
  function resetWorkoutTimer(id) {
    clearInterval(timers[id].interval);
    timers[id].time = 45;
    timers[id].running = false;
    updateTimerDisplay(id);
  }
  