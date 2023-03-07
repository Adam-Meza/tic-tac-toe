// GLOBAL VARIABLES //
var currentGame = {},
 firstPlayer = null,
 secondPlayer = null,
 numOfPlayers = 0;

// QUERY SELECTORS //
var body = document.querySelector('.body'),
 nameInput = document.querySelector('.js-name-input'),
 userInputForm = document.querySelector('.js-user-input-form'),
 userPrompt = document.querySelector('.js-user-prompt');
 turnHeader = document.querySelector('.js-turn-header'),
 
 gameBoard = document.querySelector('.js-game-board'),
 boardSquares = document.querySelectorAll('.js-board-square'),
 playerBoxes = document.querySelectorAll('.js-player-box'),
 playerNameTitles = document.querySelectorAll('.js-player-name'),
 winBoxHeaders = document.querySelectorAll('.js-win-box'),
 winCounts = document.querySelectorAll('.js-win-count'),

 numPlayersBtnBox = document.querySelector('.js-num-players-btn-box'),
 onePlayerBtn = document.querySelector('.js-one-player-btn'),
 twoPlayerBtn = document.querySelector('.js-one-player-btn'),
 newGameBtn = document.querySelector('.js-new-game-button'),
 playBtn = document.querySelector('.js-play-btn'),

// EVENT LISTENERS // 

nameInput.addEventListener('input', updateNameFormDOM);
nameInput.addEventListener('submit', enterPressPlay);
playBtn.addEventListener('click', playBtnFunctionality);
newGameBtn.addEventListener('click', navToNewGameForm);

numPlayersBtnBox.addEventListener('click', function() {
  event.preventDefault();
  if (event.target.id){
    numOfPlayers = event.target.id
    pageNagivation();
    };
  }
);

gameBoard.addEventListener('click', function() {
  if (event.target.id) {
    updateDM();
    updateTargetSquare();
    updateDOM();
    };
  }
);

// DOM MANIPULATION - BUNDLE FUNCTIONS //

function pageNagivation() {
  if (!firstPlayer) {
    navToFirstNameForm();
  } else if (!secondPlayer && numOfPlayers === "2") {
      navToSecondNameForm();
  } else if (!secondPlayer && numOfPlayers === "1") {
      currentGame = new OnePlayerGame(firstPlayer);
      currentGame.establishXandOPlayers();
      updateDOMforFirstGame();
  } else if (firstPlayer && secondPlayer) {
    updateDMforFirstGame();
    updateDOMforFirstGame();
  };
};

function playBtnFunctionality() {
  event.preventDefault()
  if (!nameInput.value) {
    makeGenericPlayer();
  } else {
    var userInput = nameInput.value.toLowerCase();
    checkStorageForPlayer(userInput);
  };
  clearInput();
  pageNagivation();
}

function updateDMforFirstGame() {
  currentGame = new Game(firstPlayer, secondPlayer);
  currentGame.establishXandOPlayers();
};

function updateDM() {
  currentGame.addChoice(event.target.id);
  currentGame.updateAvailableSquaresArray(event.target.id);
  currentGame.checkWinOrDraw();
};

function updateDOM() {
  if (currentGame.isOver) {
    disableBoardSqaures();
    updateWinHeader();
    setTimeout(setUpNewGame, 4000);
  } else {
    currentGame.passTurn();
    updateTurnHeader();
  };
};

function setUpNewGame() {
  updateDMforNewGame();
  updateDOMforNewGame();
  if (numOfPlayers === "1") {
    currentGame.checkIfCompTurn();
  };
};

function updateDMforNewGame() {
  currentGame.updatePlayersInStorage();
  currentGame.initiateNewGame();
  currentGame.checkXandOPlayers();
};

function updateDOMforNewGame() {
  activateSquares();
  resetDOM();
  updateTurnHeader();
  updateWinCounter();
};

// NAVIGATION FUNCTIONS//

function navToFirstNameForm() {
  userPrompt.innerText = "What's Your Name?";
  userInputForm.classList = "name-form js-user-input-form";
  body.background = "./assets/wheat.jpg";
  hideOrShowInputElems();
};

function navToSecondNameForm() {
  userInputForm.classList = "second-name-form js-user-input-form";
  playBtn.classList = "second-play-btn js-play-btn";
  body.background = "./assets/flowers.jpg";
};

function updateDOMforFirstGame() {
  body.background = "./assets/sun.jpg";
  playerNameTitles[0].innerText = currentGame.firstPlayer.name;
  playerNameTitles[1].innerText = currentGame.secondPlayer.name;
  updateWinCounter();
  hideOrShowGameBoard();
  updateTurnHeader();
};

function hideOrShowInputElems() {
  nameInput.toggleAttribute("hidden");
  numPlayersBtnBox.toggleAttribute("hidden");
  playBtn.toggleAttribute("hidden");
};

function navToNewGameForm() {
  resetDMforFirstGame();
  resetDOMforFirstGame();
  resetDOM();
  activateSquares();
  hideOrShowGameBoard();
  hideOrShowInputElems();
};

function hideOrShowGameBoard() {
  gameBoard.toggleAttribute("hidden");
  newGameBtn.toggleAttribute("hidden");
  playerBoxes[0].toggleAttribute("hidden");
  playerBoxes[1].toggleAttribute("hidden");
  userInputForm.toggleAttribute("hidden");
  nameInput.toggleAttribute("hidden")
};

// DM/DOM MANIPULATION FOR FIRST GAME //

function resetDMforFirstGame(){
  currentGame = {};
  firstPlayer = null;
  secondPlayer = null;
  numOfPlayers = 0;
};

function resetDOMforFirstGame(){
  winCounts[0].innerHTML = "0"
  winCounts[1].innerHTML = "0"
  userInputForm.classList = "num-form js-user-input-form";
  userPrompt.innerText = "How Many Players?";
  body.background = "./assets/pond.jpg";
  playBtn.classList = "play-btn js-play-btn";
};

function checkStorageForPlayer(userInput) {
  var newPlayer = {};
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key([i]) === `${userInput}`) {
      newPlayer = JSON.parse(localStorage.getItem(`${userInput}`));
      setFirstOrSecond(newPlayer);
      return true;
    };
  };
  makeNewPlayer(userInput);
};

function makeGenericPlayer() {
  if (!firstPlayer) {
    firstPlayer = new Player("Player 1");
  } else {
    secondPlayer = new Player("Player 2");
  };
};

function makeNewPlayer(userInput) {
  newPlayer = new Player(`${userInput}`);
  localStorage.setItem(`${userInput}`, JSON.stringify(newPlayer));
  setFirstOrSecond(newPlayer);
};

function setFirstOrSecond(newPlayer) {
  if (newPlayer && !firstPlayer) {
    firstPlayer = newPlayer;
  } else if (newPlayer) {
    secondPlayer = newPlayer;
  } 
};

// DOM MANIPULATION ATOMIC FUNCTIONS //

function updateNameFormDOM() {
  if (nameInput.value) {
    playBtn.innerText = "Let's Play!";
  } else {
    playBtn.innerText = "Continue as Guest";
  };
};

function enterPressPlay(){
  if (event.keyCode === 13) {
    playBtnFunctionality();
  };
};

function clearInput(){
  nameInput.value = "";
};

function updateTargetSquare() {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  event.target.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
};

function disableBoardSqaures() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = true;
  };
};
  
function updateWinHeader() {
  if (currentGame.isDraw) {
    turnHeader.innerHTML = "It's a Draw!";
  } else {
    turnHeader.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  };
};
  
function updateTurnHeader() {
  turnHeader.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
};
  
function activateSquares () {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
  };
};

function resetDOM() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
    boardSquares[i].classList.remove("X");
    boardSquares[i].classList.remove("O");
    boardSquares[i].innerHTML = "";
  };
};
  
function updateWinCounter() {
  winCounts[0].innerHTML = currentGame.xPlayer.wins;
  winCounts[1].innerHTML = currentGame.oPlayer.wins;
};