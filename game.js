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

// Función para seleccionar personaje
function selectCharacter(character) {
    gameData.playerCharacter = character;
    gameData.playerName = character === 'niño' ? 'Aventurero' : 'Aventurera';
    
    // Actualizar avatar y nombre
    document.getElementById('player-name').textContent = gameData.playerName;
    
    // Transición a la pantalla de bienvenida
    document.getElementById('character-select').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}

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
                },
                {
                    question: '¿Qué alimento es una legumbre?',
                    options: ['Zanahoria', 'Lentejas', 'Manzana', 'Pollo'],
                    correct: 1,
                    explanation: 'Las lentejas son legumbres, ricas en proteínas vegetales y fibra.',
                    difficulty: 'Fácil'
                },
                {
                    question: '¿Cuál es un lácteo?',
                    options: ['Pan', 'Yogur', 'Pescado', 'Miel'],
                    correct: 1,
                    explanation: 'El yogur es un producto lácteo rico en calcio y probióticos.',
                    difficulty: 'Fácil'
                }
            ]
        },
        {
            name: 'Hábitos Saludables',
            questions: [
                {
                    question: '¿Cuántos vasos de agua deberías beber al día?',
                    options: ['2-3', '4-5', '6-8', '10-12'],
                    correct: 2,
                    explanation: 'Se recomienda beber 6-8 vasos de agua al día para mantenerse hidratado.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuál es el mejor momento para hacer ejercicio?',
                    options: ['Justo antes de dormir', 'Después de comer', 'En la mañana o tarde', 'Solo los fines de semana'],
                    correct: 2,
                    explanation: 'Es mejor hacer ejercicio en la mañana o tarde, evitando las horas de comida.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuántas comidas principales debes hacer al día?',
                    options: ['1', '2', '3', '5'],
                    correct: 2,
                    explanation: 'Se recomiendan 3 comidas principales: desayuno, almuerzo y cena.',
                    difficulty: 'Fácil'
                },
                {
                    question: '¿Cuánto tiempo debes dormir cada noche?',
                    options: ['4-5 horas', '6-7 horas', '8-10 horas', 'Más de 12 horas'],
                    correct: 2,
                    explanation: 'Los niños necesitan dormir entre 8-10 horas para un desarrollo saludable.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué debes hacer antes de comer?',
                    options: ['Ver la TV', 'Lavarte las manos', 'Hacer ejercicio', 'Tomar un refresco'],
                    correct: 1,
                    explanation: 'Lavarse las manos antes de comer es importante para la higiene.',
                    difficulty: 'Fácil'
                }
            ]
        },
        {
            name: 'Nutrición Avanzada',
            questions: [
                {
                    question: '¿Qué vitamina se produce con la exposición al sol?',
                    options: ['Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina E'],
                    correct: 2,
                    explanation: 'La vitamina D se produce en la piel cuando nos exponemos al sol.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué mineral es importante para los huesos?',
                    options: ['Hierro', 'Calcio', 'Sodio', 'Potasio'],
                    correct: 1,
                    explanation: 'El calcio es esencial para tener huesos y dientes fuertes.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué alimento tiene más hierro?',
                    options: ['Lentejas', 'Manzana', 'Plátano', 'Pepino'],
                    correct: 0,
                    explanation: 'Las lentejas son una excelente fuente de hierro vegetal.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué nutriente ayuda a la vista?',
                    options: ['Vitamina A', 'Vitamina B', 'Vitamina K', 'Vitamina D'],
                    correct: 0,
                    explanation: 'La vitamina A es esencial para mantener una buena visión.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué fruta tiene más potasio?',
                    options: ['Plátano', 'Manzana', 'Naranja', 'Pera'],
                    correct: 0,
                    explanation: 'El plátano es una excelente fuente de potasio.',
                    difficulty: 'Normal'
                }
            ]
        },
        {
            name: 'Alergias e Intolerancias',
            questions: [
                {
                    question: '¿Qué alimento puede causar alergia común?',
                    options: ['Frutos secos', 'Lechuga', 'Arroz', 'Patata'],
                    correct: 0,
                    explanation: 'Los frutos secos son uno de los alérgenos más comunes.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué personas no pueden tomar leche?',
                    options: ['Intolerantes a la lactosa', 'Intolerantes al gluten', 'Alérgicos al huevo', 'Alérgicos al pescado'],
                    correct: 0,
                    explanation: 'Las personas intolerantes a la lactosa no pueden digerir bien la leche.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué cereal contiene gluten?',
                    options: ['Arroz', 'Maíz', 'Trigo', 'Quinoa'],
                    correct: 2,
                    explanation: 'El trigo contiene gluten, que algunas personas no pueden consumir.',
                    difficulty: 'Difícil'
                },
                {
                    question: '¿Qué alimento puede causar alergia al marisco?',
                    options: ['Gambas', 'Pollo', 'Zanahoria', 'Arroz'],
                    correct: 0,
                    explanation: 'Las gambas son un marisco que puede causar reacciones alérgicas.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué bebida no contiene lactosa?',
                    options: ['Leche de vaca', 'Yogur natural', 'Leche de almendras', 'Batido de chocolate'],
                    correct: 2,
                    explanation: 'La leche de almendras es una alternativa sin lactosa.',
                    difficulty: 'Normal'
                }
            ]
        },
        {
            name: 'Alimentación y Ejercicio',
            questions: [
                {
                    question: '¿Qué debes comer antes de hacer ejercicio?',
                    options: ['Nada', 'Comida ligera', 'Comida pesada', 'Dulces'],
                    correct: 1,
                    explanation: 'Una comida ligera te da energía sin causar malestar.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Cuánto tiempo hay que esperar para nadar después de comer?',
                    options: ['No hay que esperar', '30 minutos', '2 horas', '4 horas'],
                    correct: 2,
                    explanation: 'Es recomendable esperar 2 horas después de una comida principal.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué bebida es mejor durante el ejercicio?',
                    options: ['Refresco', 'Agua', 'Café', 'Zumo'],
                    correct: 1,
                    explanation: 'El agua es la mejor opción para hidratarse durante el ejercicio.',
                    difficulty: 'Fácil'
                },
                {
                    question: '¿Qué alimento da energía rápida?',
                    options: ['Plátano', 'Pescado', 'Huevo', 'Leche'],
                    correct: 0,
                    explanation: 'El plátano proporciona energía rápida gracias a sus azúcares naturales.',
                    difficulty: 'Normal'
                },
                {
                    question: '¿Qué debes comer después del ejercicio?',
                    options: ['Solo proteínas', 'Proteínas y carbohidratos', 'Solo grasas', 'Nada'],
                    correct: 1,
                    explanation: 'La combinación de proteínas y carbohidratos ayuda a recuperarse.',
                    difficulty: 'Difícil'
                }
            ]
        }
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