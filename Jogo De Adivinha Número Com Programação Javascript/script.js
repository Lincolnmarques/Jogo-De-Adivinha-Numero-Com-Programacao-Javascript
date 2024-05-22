let secretNumber = generateSecretNumber();
let attempts = 0;
let guessedNumbers = [];
let currentLevel = 1;

const guessForm = document.getElementById('guessForm');
guessForm.addEventListener('submit', function(event) {
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

    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    if (guessedNumbers.includes(guess)) {
        result.textContent = 'Você já tentou esse número. Tente um diferente.';
        return;
    }

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

    if (guess < secretNumber) {
        directionLeft.style.display = 'inline';
        directionRight.style.display = 'none';
    } else {
        directionLeft.style.display = 'none';
        directionRight.style.display = 'inline';
    }

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
