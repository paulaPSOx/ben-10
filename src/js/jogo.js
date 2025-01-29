// Variáveis globais do jogo
let score = 0;
let attempts = 3;
let currentCharacter = "";
let gameOver = false;
let powerActive = false;
let powerTimeout;
let gameInterval;
let gameSpeed = 900;
let timeLeft = 90;
let highScore = 0;
let gameStarted = false;
let benClicked = false;
let nonBenClicked = false;
let roundCompleted = false;

// Referências de elementos DOM
const cups = document.querySelectorAll('.cup');
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const startButton = document.getElementById("start-btn");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer");
const highScoreDisplay = document.getElementById("high-score");

// Lista de personagens disponíveis
const characters = [
    "anfibio", "arraiajato", "artropode", "besta", "calafrio", "chama",
    "cromatico", "diamante", "eco-eco", "fogo-selvagem", "gigante",
    "gwen", "kevin", "irado", "max-tennyson", "ultra-t", "xlr8", "ben"
];

// Habilita os botões dos cups
function disableCups() {
    cups.forEach(cup => {
        cup.classList.add('disabled');
        cup.onclick = null;
    });
}

function enableCups() {
    cups.forEach(cup => {
        cup.classList.remove('disabled');
        cup.onclick = (event) => checkChoice(event);
    });
}

// Inicia o jogo
function startGame() {
    if (gameOver) return;

    // Reseta os parâmetros do jogo
    score = 0;
    attempts = 3;
    timeLeft = 90;
    gameOver = false;
    powerActive = false;
    benClicked = false;
    nonBenClicked = false;
    roundCompleted = false;
    gameStarted = true;

    updateDisplay();

    gameOverScreen.style.display = "none";
    startButton.disabled = true;
    restartButton.disabled = false;

    enableCups();

    randomCharacterUnderCup();
    gameInterval = setInterval(randomCharacterUnderCup, gameSpeed);
    countdownTimer();

    if (gameStarted) {
        highScoreDisplay.style.display = "block";
    }
}

// Reinicia o jogo
function restartGame() {
    score = 0;
    attempts = 3;
    timeLeft = 90;
    gameOver = false;
    powerActive = false;
    benClicked = false;
    nonBenClicked = false;
    roundCompleted = false;
    gameStarted = false;

    updateDisplay();

    clearTimeout(powerTimeout);
    clearInterval(gameInterval);
    cups.forEach(cup => cup.innerHTML = "");
    cups.forEach(cup => cup.classList.remove("poder-ativo"));

    startButton.disabled = false;
    restartButton.disabled = true;

    gameOverScreen.style.display = "none";

    disableCups();

    highScoreDisplay.style.display = "none";
}

// Formata o tempo no formato MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
}

// Inicia a contagem regressiva do tempo
function countdownTimer() {
    const timerInterval = setInterval(() => {
        if (gameOver || timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
            return;
        }
        timeLeft--;
        updateDisplay();
    }, 1000);
}

// Embaralha os personagens nas xícaras
function shuffleCups() {
    cups.forEach(cup => cup.innerHTML = "");

    const availableCharacters = [...characters];
    
    const benCupIndex = Math.floor(Math.random() * cups.length);
    const benCup = cups[benCupIndex];
    const benImg = document.createElement('img');
    benImg.src = "src/imagem/jogo/ben.png";
    benImg.alt = "ben";
    benImg.style.width = "100%";
    benCup.appendChild(benImg);

    availableCharacters.splice(availableCharacters.indexOf("ben"), 1);

    
    cups.forEach((cup, index) => {
        if (index !== benCupIndex) {
            const randomCharacterIndex = Math.floor(Math.random() * availableCharacters.length);
            const character = availableCharacters[randomCharacterIndex];
            availableCharacters.splice(randomCharacterIndex, 1);

            const img = document.createElement('img');
            img.src = `src/imagem/jogo/${character}.png`;
            img.alt = character;
            img.style.width = "100%";
            cup.appendChild(img);
        }
    });

    // Define a ação ao clicar nas xícaras
    cups.forEach((cup, index) => {
        cup.onclick = () => checkChoice(index === benCupIndex);
    });
}

// Verifica se a escolha do jogador foi correta
function checkChoice(isBen) {
    if (gameOver || powerActive || roundCompleted) return;

    roundCompleted = true;

    if (isBen && !benClicked) {
        score += 10;
        benClicked = true;

        if (score > highScore) {
            highScore = score;
        }
    } else if (!isBen && !nonBenClicked) {
        attempts--;
        nonBenClicked = true;

        if (attempts <= 0) {
            endGame();
        }
    }

    updateDisplay();
}

// Ativa o poder de uma xícara
function activatePower(cupIndex) {
    powerActive = true;
    const cup = cups[cupIndex];
    cup.classList.add("poder-ativo");

    powerTimeout = setTimeout(() => {
        cup.classList.remove("poder-ativo");
        powerActive = false;
    }, 2000);
}

// Finaliza o jogo
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    finalScoreDisplay.textContent = score;
    document.getElementById("high-score").textContent = `Recorde: ${highScore}`;
    gameOverScreen.style.display = "block";

    startButton.disabled = true;
    startButton.classList.add("disabled-button");

    restartButton.disabled = false;
}

// Reinicia o jogo
function restartGame() {
    score = 0;
    attempts = 3;
    timeLeft = 90;
    gameOver = false;
    powerActive = false;
    benClicked = false; 
    nonBenClicked = false; 
    roundCompleted = false;
    gameStarted = false;

    updateDisplay();

    clearTimeout(powerTimeout);
    clearInterval(gameInterval);
    cups.forEach(cup => cup.innerHTML = "");
    cups.forEach(cup => cup.classList.remove("poder-ativo"));

    startButton.disabled = false;
    startButton.classList.remove("disabled-button"); 

    restartButton.disabled = true;

    gameOverScreen.style.display = "none";

    disableCups();

    highScoreDisplay.style.display = "none";
}

function randomCharacterUnderCup() {
    shuffleCups();
    benClicked = false;
    nonBenClicked = false; 
    roundCompleted = false;
}

// Atualiza os displays de pontuação, tentativas e timer
function updateDisplay() {
    scoreDisplay.textContent = `Pontos: ${score}`;
    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    timerDisplay.textContent = `Tempo: ${formatTime(timeLeft)}`;
    highScoreDisplay.textContent = `Recorde: ${highScore}`;
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

disableCups();

highScoreDisplay.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    const logoBen10 = document.getElementById("logo-ben10");  // Obtém o elemento de logo com id "logo-ben10"
    const linkBen10 = document.getElementById("link-ben10");

    // Verifica se os elementos existem na página
    if (logoBen10 && linkBen10) {
        // Adiciona um ouvinte de evento para o clique no link
        linkBen10.addEventListener("click", function (event) {
            event.preventDefault();  // Impede a ação padrão do link (não irá para o destino do href)

            // Troca o logo para a imagem do Omnitrix carregando
            logoBen10.src = "src/imagem/omnitrix-recharging.png";

            // Após 80ms, redireciona o usuário para a página "menu.html"
            setTimeout(() => {
                window.location.href = "menu.html";  // Redireciona para a página do menu
            }, 80);
        });
    }
});
