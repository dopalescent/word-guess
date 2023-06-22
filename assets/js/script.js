// Array of words to be guessed
const words = ["apple", "banana", "orange", "grape", "strawberry"];

let currentWord; // The word to be guessed
let guessedLetters; // Array to store correctly guessed letters
let remainingGuesses; // Number of remaining guesses
let winCount = 0; // Total wins
let lossCount = 0; // Total losses
let timerInterval; // Interval ID for the timer
let startTime; // Start time for the timer
const timerDuration = 30; // Timer duration in seconds

const wordDisplay = document.getElementById("wordDisplay");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const winCountDisplay = document.getElementById("winCount");
const lossCountDisplay = document.getElementById("lossCount");
const startButton = document.getElementById("startButton");

// Initialize the game
function initGame() {
  currentWord = getRandomWord();
  guessedLetters = Array(currentWord.length).fill("_");
  remainingGuesses = currentWord.length;
  wordDisplay.textContent = guessedLetters.join(" ");
  resultDisplay.textContent = "";
  startTimer();
}

// Get a random word from the words array
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Handle key press events
document.addEventListener("keyup", function (event) {
  const key = event.key.toLowerCase();
  if (/[a-z]/.test(key)) {
    if (remainingGuesses > 0 && !guessedLetters.includes(key)) {
      checkLetter(key);
    }
  }
});

// Check if the guessed letter is in the word
function checkLetter(letter) {
  let letterFound = false;
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      guessedLetters[i] = letter;
      remainingGuesses--;
      letterFound = true;
    }
  }
  wordDisplay.textContent = guessedLetters.join(" ");

  if (remainingGuesses === 0) {
    winGame();
  } else if (!letterFound) {
    remainingGuesses--;
    if (remainingGuesses === 0) {
      loseGame();
    }
  }
}

// Start the timer
function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  const remainingSeconds = timerDuration - elapsedSeconds;
  timerDisplay.textContent = remainingSeconds;

  if (remainingSeconds <= 0) {
    loseGame();
  }
}

// Win the game
function winGame() {
  clearInterval(timerInterval);
  resultDisplay.textContent = "Congratulations! You won!";
  winCount++;
  winCountDisplay.textContent = winCount;
}

// Lose the game
function loseGame() {
  clearInterval(timerInterval);
  resultDisplay.textContent = "Game over! You lost!";
  lossCount++;
  lossCountDisplay.textContent = lossCount;
}

// Start the game when the start button is clicked
startButton.addEventListener("click", initGame);
