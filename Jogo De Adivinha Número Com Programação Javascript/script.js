let secretNumber = generateSecretNumber();
let attempts = 0;
let guessedNumbers = [];
let currentLevel = 1;

document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    guessNumber();
});

function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function guessNumber() {
    const guessInput = document.getElementById('guessInput');
    const result = document.getElementById('result');
    const attemptsSpan = document.getElementById('attempts');
    const guessedNumbersList = document.getElementById('guessedNumbers');
    const guess = parseInt(guessInput.value);
    const directionLeft = document.getElementById('arrow-left');
    const directionRight = document.getElementById('arrow-right');
    const levelSpan = document.getElementById('currentLevel');

    if (!isValidGuess(guess)) {
        result.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    if (isDuplicateGuess(guess)) {
        result.textContent = 'Você já tentou esse número. Tente um diferente.';
        return;
    }

    processGuess(guess, guessInput, result, attemptsSpan, guessedNumbersList, directionLeft, directionRight, levelSpan);
}

function isValidGuess(guess) {
    return !isNaN(guess) && guess >= 1 && guess <= 100;
}

function isDuplicateGuess(guess) {
    return guessedNumbers.includes(guess);
}

function processGuess(guess, guessInput, result, attemptsSpan, guessedNumbersList, directionLeft, directionRight, levelSpan) {
    attempts++;
    attemptsSpan.textContent = attempts;
    guessedNumbers.push(guess);
    guessedNumbersList.textContent += ` ${guess}`;
    const proximity = Math.abs(guess - secretNumber);

    if (proximity === 0) {
        result.textContent = `Parabéns! Você acertou o número secreto ${secretNumber} em ${attempts} tentativas.`;
        if (attempts < 10) {
            currentLevel++;
            levelSpan.textContent = currentLevel;
        }
        resetGame();
        return;
    }

    updateDirection(guess);
    provideFeedback(result, proximity);
}

function updateDirection(guess) {
    const directionLeft = document.getElementById('arrow-left');
    const directionRight = document.getElementById('arrow-right');
    
    if (guess < secretNumber) {
        directionLeft.style.display = 'inline';
        directionRight.style.display = 'none';
    } else {
        directionLeft.style.display = 'none';
        directionRight.style.display = 'inline';
    }
}

function provideFeedback(result, proximity) {
    if (proximity <= 5) {
        result.textContent = 'Bem próximo! Continue assim.';
    } else if (proximity <= 10) {
        result.textContent = 'Está próximo! Continue tentando.';
    } else {
        result.textContent = 'Ainda distante. Continue tentando.';
    }
}

function resetGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    guessedNumbers = [];
    document.getElementById('guessInput').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('guessedNumbers').textContent = 'Números tentados:';
    document.getElementById('arrow-left').style.display = 'none';
    document.getElementById('arrow-right').style.display = 'none';
}
