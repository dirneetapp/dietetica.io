// Configuración del juego
const gameConfig = {
    difficulties: {
        'Fácil': { timeLimit: 30, pointsPerQuestion: 10 },
        'Normal': { timeLimit: 20, pointsPerQuestion: 20 },
        'Difícil': { timeLimit: 15, pointsPerQuestion: 30 }
    },
    soundEffects: {
        correct: 'correct.mp3',
        incorrect: 'incorrect.mp3',
        achievement: 'achievement.mp3'
    },
    soundEnabled: true
};

// Sistema de logros
const achievements = [
    { id: 'perfectionist', name: 'Perfeccionista', description: 'Obtén una puntuación perfecta en un nivel', unlocked: false },
    { id: 'speed_master', name: 'Maestro de la Velocidad', description: 'Completa un nivel en menos de 1 minuto', unlocked: false },
    { id: 'health_expert', name: 'Maestro de la Salud', description: 'Completa todos los niveles en dificultad difícil', unlocked: false }
];

// Datos del juego
const gameData = {
    currentLevel: 0,
    score: 0,
    currentQuestion: 0,
    timer: null,
    timeLeft: 0,
    difficulty: 'Normal',
    practiceMode: false,
    playerCharacter: null,
    playerName: '',
    levels: [
        {
            name: 'Grupos de Alimentos',
            questions: [
                {
                    question: '¿Cuál de estos alimentos es una proteína?',
                    options: ['Manzana', 'Pollo', 'Pan', 'Aceite'],
                    correct: 1,
                    explanation: 'El pollo es una excelente fuente de proteína animal.',
                    difficulty: 'Fácil'
                },
                {
                    question: '¿Qué alimento es una fuente de carbohidratos?',
                    options: ['Pescado', 'Arroz', 'Aceite de oliva', 'Queso'],
                    correct: 1,
                    explanation: 'El arroz es un carbohidrato complejo que nos da energía.',
                    difficulty: 'Fácil'
                },
                {
                    question: '¿Cuál es una grasa saludable?',
                    options: ['Mantequilla', 'Aguacate', 'Tocino', 'Margarina'],
                    correct: 1,
                    explanation: 'El aguacate contiene grasas saludables y omega-3.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué alimento tiene más vitamina C?',
                    options: ['Naranja', 'Carne', 'Pan', 'Leche'],
                    correct: 0,
                    explanation: 'Las naranjas son una excelente fuente de vitamina C.',
                    difficulty: 'Fácil'
                }
            ]
        },
        {
            name: 'Hábitos Saludables',
            questions: [
                {
                    question: '¿Cuántos vasos de agua es recomendable beber al día?',
                    options: ['2-3', '4-5', '6-8', '10-12'],
                    correct: 2,
                    explanation: 'Es recomendable beber entre 6 y 8 vasos de agua al día para mantenerse hidratado.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuál es el mejor momento para comer frutas?',
                    options: ['Solo en la cena', 'Entre comidas', 'Solo en el desayuno', 'No importa el momento'],
                    correct: 3,
                    explanation: 'Las frutas son saludables en cualquier momento del día, lo importante es consumirlas regularmente.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuántas comidas principales se recomienda hacer al día?',
                    options: ['2', '3', '4', '5'],
                    correct: 1,
                    explanation: 'Se recomiendan 3 comidas principales: desayuno, comida y cena.',
                    difficulty: 'Fácil'
                }
            ]
        },
        {
            name: 'Nutrición Avanzada',
            questions: [
                {
                    question: '¿Qué vitamina se produce cuando tomamos el sol?',
                    options: ['Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina E'],
                    correct: 2,
                    explanation: 'La vitamina D se produce en nuestra piel cuando nos exponemos al sol de forma moderada.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué mineral es importante para prevenir la anemia?',
                    options: ['Calcio', 'Hierro', 'Sodio', 'Potasio'],
                    correct: 1,
                    explanation: 'El hierro es esencial para prevenir la anemia y se encuentra en carnes rojas, legumbres y verduras de hoja verde.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué alimento tiene más proteína por 100 gramos?',
                    options: ['Huevos', 'Lentejas', 'Pollo', 'Atún'],
                    correct: 2,
                    explanation: 'El pollo tiene aproximadamente 31g de proteína por 100g, más que los otros alimentos mencionados.',
                    difficulty: 'Difícil'
                }
            ]
        },
        {
            name: 'Alergias e Intolerancias',
            questions: [
                {
                    question: '¿Qué cereal contiene gluten?',
                    options: ['Arroz', 'Trigo', 'Maíz', 'Quinoa'],
                    correct: 1,
                    explanation: 'El trigo contiene gluten, por eso las personas celíacas deben evitarlo.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué producto es naturalmente libre de lactosa?',
                    options: ['Leche de vaca', 'Yogur natural', 'Leche de almendras', 'Queso fresco'],
                    correct: 2,
                    explanation: 'La leche de almendras es naturalmente libre de lactosa porque proviene de frutos secos.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuál es una alergia alimentaria común?',
                    options: ['Frutos secos', 'Arroz', 'Patatas', 'Zanahorias'],
                    correct: 0,
                    explanation: 'Los frutos secos son uno de los alérgenos más comunes, especialmente en niños.',
                    difficulty: 'Normal'
                }
            ]
        }
    ]
    ]
};

// Función para seleccionar personaje
function selectCharacter(character) {
    gameData.playerCharacter = character;
    gameData.playerName = character === 'niño' ? 'Jugador' : 'Jugadora';
    
    // Actualizar avatar y nombre en todas las pantallas
    const avatarImg = character === 'niño' ? 'niño.png' : 'niña.png';
    document.getElementById('player-avatar').src = avatarImg;
    document.getElementById('player-name').textContent = gameData.playerName;
    document.getElementById('player-name-display').textContent = gameData.playerName;
    
    // Animación de selección
    const selectedCard = event.currentTarget;
    selectedCard.style.transform = 'scale(1.1)';
    setTimeout(() => {
        selectedCard.style.transform = 'scale(1)';
        // Ocultar pantalla de selección y mostrar pantalla de bienvenida
        document.getElementById('character-select').classList.remove('active');
        document.getElementById('welcome-screen').classList.add('active');
    }, 300);

    // Reproducir sonido de selección si está habilitado
    playSound('correct');
}

// Función para iniciar el juego
function startGame(difficulty = 'Normal', practiceMode = false) {
    gameData.difficulty = difficulty;
    gameData.practiceMode = practiceMode;
    gameData.score = 0;
    gameData.currentLevel = 0;
    gameData.currentQuestion = 0;

    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('current-difficulty').textContent = difficulty;

    showQuestion();
    startTimer();
}

// Función para mostrar pregunta actual
function showQuestion() {
    const level = gameData.levels[gameData.currentLevel];
    const question = level.questions[gameData.currentQuestion];
    
    document.getElementById('game-area').innerHTML = `
        <h2>${level.name} - Pregunta ${gameData.currentQuestion + 1}</h2>
        <p>${question.question}</p>
    `;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        optionsContainer.innerHTML += `
            <button onclick="checkAnswer(${index})" class="option-button">
                ${option}
            </button>
        `;
    });
}

// Función para verificar respuesta
function checkAnswer(selectedIndex) {
    const question = gameData.levels[gameData.currentLevel].questions[gameData.currentQuestion];
    const correct = selectedIndex === question.correct;

    if (correct) {
        playSound('correct');
        const points = gameConfig.difficulties[gameData.difficulty].pointsPerQuestion;
        gameData.score += points;
        document.getElementById('score').textContent = gameData.score;
    } else {
        playSound('incorrect');
    }

    showFeedback(correct, question.explanation);
    checkAchievements();

    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

// Función para reproducir sonidos
function playSound(soundType) {
    if (gameConfig.soundEnabled && gameConfig.soundEffects[soundType]) {
        const audio = new Audio(gameConfig.soundEffects[soundType]);
        audio.play().catch(error => console.log('Error al reproducir sonido:', error));
    }
}

// Función para alternar sonido
function toggleSound() {
    gameConfig.soundEnabled = !gameConfig.soundEnabled;
    document.getElementById('sound-toggle').textContent = 
        gameConfig.soundEnabled ? 'Desactivar Sonido' : 'Activar Sonido';
}

// Función para mostrar retroalimentación
function showFeedback(correct, explanation) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
        <p>${correct ? '¡Correcto!' : 'Incorrecto'}</p>
        <p>${explanation}</p>
    `;
    document.getElementById('game-area').appendChild(feedback);
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    gameData.currentQuestion++;
    const level = gameData.levels[gameData.currentLevel];

    if (gameData.currentQuestion >= level.questions.length) {
        gameData.currentLevel++;
        gameData.currentQuestion = 0;

        if (gameData.currentLevel >= gameData.levels.length) {
            endGame();
            return;
        }
    }

    showQuestion();
}

// Función para iniciar el temporizador
function startTimer() {
    const timeLimit = gameConfig.difficulties[gameData.difficulty].timeLimit;
    gameData.timeLeft = timeLimit;
    updateTimer();

    gameData.timer = setInterval(() => {
        gameData.timeLeft--;
        updateTimer();

        if (gameData.timeLeft <= 0) {
            clearInterval(gameData.timer);
            endGame();
        }
    }, 1000);
}

// Función para actualizar el temporizador
function updateTimer() {
    document.getElementById('timer').textContent = gameData.timeLeft;
}

// Función para verificar logros
function checkAchievements() {
    const perfectScore = gameData.score === gameData.currentQuestion * 
        gameConfig.difficulties[gameData.difficulty].pointsPerQuestion;

    if (perfectScore && !achievements.find(a => a.id === 'perfectionist').unlocked) {
        unlockAchievement('perfectionist');
    }

    // Verificar más logros...
}

// Función para desbloquear logros
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        playSound('achievement');
        showAchievementNotification(achievement);
    }
}

// Función para mostrar notificación de logro
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <h3>¡Logro Desbloqueado!</h3>
        <p>${achievement.name}</p>
        <p>${achievement.description}</p>
    `;

    document.getElementById('achievement-notifications').appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Función para terminar el juego
function endGame() {
    clearInterval(gameData.timer);
    
    if (!gameData.practiceMode) {
        updateHighScores();
    }

    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('final-score').textContent = gameData.score;
    document.getElementById('final-difficulty').textContent = gameData.difficulty;
    
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    document.getElementById('achievements-count').textContent = unlockedAchievements.length;

    displayHighScores();
}

// Función para actualizar puntuaciones altas
function updateHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({
        score: gameData.score,
        difficulty: gameData.difficulty,
        character: gameData.playerCharacter,
        date: new Date().toLocaleDateString()
    });

    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length > 10) highScores.length = 10;
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Función para mostrar puntuaciones altas
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    const highScoresList = document.getElementById('final-high-scores-list');
    highScoresList.innerHTML = '';

    highScores.forEach((score, index) => {
        highScoresList.innerHTML += `
            <li>
                ${index + 1}. ${score.character === 'niño' ? 'Jugador' : 'Jugadora'} - 
                ${score.score} puntos (${score.difficulty}) - ${score.date}
            </li>
        `;
    });
}

// Función para reiniciar el juego
function restartGame() {
    clearInterval(gameData.timer);
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('character-select').classList.add('active');
}