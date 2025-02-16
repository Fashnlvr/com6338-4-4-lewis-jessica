var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

var currentWord = '';
var guessedWord = [];
var incorrectLetters = [];
var remainingGuesses = 10;
var wins = 0;
var losses = 0;
var previousWord = '';

var wordElement = document.getElementById('word-to-guess');
var previousWordElement = document.getElementById('previous-word');
var incorrectLettersElement = document.getElementById('incorrect-letters');
var remainingGuessesElement = document.getElementById('remaining-guesses');
var winsElement = document.getElementById('wins');
var lossesElement = document.getElementById('losses');

function initializeGame() {
  previousWord = currentWord;
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(currentWord.length).fill('_');
  incorrectLetters = [];
  remainingGuesses = 10;

  wordElement.textContent = guessedWord.join('');
  previousWordElement.textContent = previousWord;
  incorrectLettersElement.textContent = '';
  remainingGuessesElement.textContent = remainingGuesses;
}

document.addEventListener('keyup', function (event) {
  var key = event.key.toLowerCase();
  if (!/^[a-z]$/.test(key) || guessedWord.includes(key) || incorrectLetters.includes(key)) {
    return;
  }

  if (currentWord.includes(key)) {
    for (var i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === key) {
        guessedWord[i] = key;
      }
    }
    wordElement.textContent = guessedWord.join('');
  } else {
    incorrectLetters.push(key);
    incorrectLettersElement.textContent = incorrectLetters.join(', ');
    remainingGuesses--;
    remainingGuessesElement.textContent = remainingGuesses;
  }

  if (!guessedWord.includes('_')) {
    wins++;
    winsElement.textContent = wins;
    initializeGame();
  } else if (remainingGuesses === 0) {
    losses++;
    lossesElement.textContent = losses;
    initializeGame();
  }
});

initializeGame();
