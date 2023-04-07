// GLOBAL VARIABLES //
let currentGame = {},
 firstPlayer = null,
 secondPlayer = null,
 numOfPlayers = 0;

// QUERY SELECTORS //
const body = document.querySelector('.body'),
 nameInput = document.querySelector('.js-name-input'),
 userInputForm = document.querySelector('.js-user-input-form'),
 userPrompt = document.querySelector('.js-user-prompt'),
 header = document.querySelector('.js-header'),
 
 gameBoard = document.querySelector('.js-game-board'),
 boardSquares = document.querySelectorAll('.js-board-square'),
 playerBoxes = document.querySelectorAll('.js-player-box'),
 playerNameTitles = document.querySelectorAll('.js-player-name'),
 winBox = document.querySelectorAll('.js-win-box'),
 winCounts = document.querySelectorAll('.js-win-count'),

 numPlayersBtnBox = document.querySelector('.js-num-players-btn-box'),
 gameModeBtnBox = document.querySelector('.js-game-mode-btn-box'),
 newGameBtn = document.querySelector('.js-new-game-button'),
 playBtn = document.querySelector('.js-play-btn');
 
// NAVIGATION ATOMIC FUNCTIONS//
let navToGameModeForm = () => {
  userInputForm.classList = "mode-form js-user-input-form";
  userPrompt.innerText = "Pick Difficulty Level";
  gameModeBtnBox.toggleAttribute('hidden');
  nameInput.toggleAttribute('hidden');
  playBtn.toggleAttribute('hidden');
  // numOfPlayers.toggleAttribute('hidden')
}

// let navToHardModeDOM = () => {
//   body.background = "./assets/space.jpg"
//   boardSquares.forEach(square => square.classList.add("hard"))
//   winBox.classList.add("hard")
//   header.classList.add("hard")
//   newGameBtn.classList.add("hard")
//   playerNameTitles[0].innerText = currentGame.firstPlayer.name;
//   playerNameTitles[1].innerText = currentGame.secondPlayer.name;
//   updateWinCounter();
//   hideOrShowGameBoard();
//   updateHeader();
// }

let navToFirstNameForm = () => {
  userPrompt.innerText = "What's Your Name?";
  userInputForm.classList = "name-form js-user-input-form";
  body.background = "./assets/wheat.jpg";
  hideOrShowInputElems();
};

let navToSecondNameForm = () => {
  userInputForm.classList = "second-name-form js-user-input-form";
  playBtn.classList = "second-play-btn js-play-btn";
  body.background = "./assets/flowers.jpg";
};

let hideOrShowInputElems = () => {
  nameInput.toggleAttribute("hidden");
  numPlayersBtnBox.toggleAttribute("hidden");
  playBtn.toggleAttribute("hidden");
};

let hideOrShowGameBoard = () => {
  gameBoard.toggleAttribute("hidden");
  newGameBtn.toggleAttribute("hidden");
  playerBoxes[0].toggleAttribute("hidden");
  playerBoxes[1].toggleAttribute("hidden");
  userInputForm.toggleAttribute("hidden");
  nameInput.toggleAttribute("hidden")
};

// DM/DOM MANIPULATION FOR FIRST GAME //
let makeGenericPlayer = () => firstPlayer ? secondPlayer = new Player("Player 2") : firstPlayer = new Player("Player 1");

let updateHeader = () => {
  if (currentGame.isDraw) {
    header.innerHTML = "It's a Draw!";
  } else if (currentGame.isOver) {
    header.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  } else {
    header.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
  };
};

let updateWinCounter = () => {
  winCounts[0].innerHTML = currentGame.xPlayer.wins;
  winCounts[1].innerHTML = currentGame.oPlayer.wins;
};

let setFirstOrSecond = (newPlayer) => {
  if (newPlayer && !firstPlayer) {
    firstPlayer = newPlayer;
  } else if (newPlayer) {
    secondPlayer = newPlayer;
  };
};

let updateDOMforFirstGame = () => {
  currentGame.gameMode === "hard" ? body.background = "./assets/space.jpg" : body.background = "./assets/sun.jpg";
  playerNameTitles[0].innerText = currentGame.firstPlayer.name;
  playerNameTitles[1].innerText = currentGame.secondPlayer.name;
  updateWinCounter();
  hideOrShowGameBoard();
  updateHeader();
};

let makeNewPlayer = (userInput) => {
  newPlayer = new Player(`${userInput}`);
  localStorage.setItem(`${userInput}`, JSON.stringify(newPlayer));
  setFirstOrSecond(newPlayer);
};

let checkStorageForPlayer = (userInput) => {
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

// DOM MANIPULATION ATOMIC FUNCTIONS //
let disableSqaures = () => boardSquares.forEach(square => square.disabled = true);
let activateSquares = () => boardSquares.forEach(square => square.disabled = false);
let updateNameFormDOM = () => nameInput.value ? playBtn.innerText = "Let's Play!" : playBtn.innerText = "Continue as Guest";
let clearInput = () => nameInput.value = "";

let resetDMforNewGame = () => {
  currentGame = {};
  firstPlayer = null;
  secondPlayer = null;
  numOfPlayers = 0;
};

let resetDOMforNewGame = () => {
  winCounts[0].innerHTML = "0";
  winCounts[1].innerHTML = "0";
  // nameInput.toggleAttribute('hidden')
  userInputForm.classList = "num-form js-user-input-form";
  userPrompt.innerText = "How Many Players?";
  body.background = "./assets/pond.jpg";
  playBtn.classList = "play-btn js-play-btn";
  playBtn.innerText = "Continue As Guest"
  header.innerHTML = "Let's Play Tic-Tac-Toe!";
};

let updateTargetSquare = () => {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  event.target.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
};

let resetBoardDOM = () => {
  boardSquares.forEach(square => {
    square.disabled = false;
    square.classList.remove("X");
    square.classList.remove("O");
    square.innerHTML = "";
    }
  );
};

// DOM MANIPULATION - BUNDLE FUNCTIONS //
let updateDMforFirstGame = () => {
  currentGame = new Game(firstPlayer, secondPlayer);
  currentGame.establishXandOPlayers();
};

let pageNagivation = () => {
  if (!firstPlayer) {
    navToFirstNameForm();
  } else if (!secondPlayer && numOfPlayers === "2") {
      navToSecondNameForm();
  } else if (!secondPlayer && numOfPlayers === "1") {
      currentGame = new OnePlayerGame(firstPlayer);
      currentGame.establishXandOPlayers();
      navToGameModeForm();
  } else if (firstPlayer && secondPlayer) {
    updateDMforFirstGame();
    updateDOMforFirstGame();
  };
};

let  playBtnFunctionality = () => {
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

let enterPressPlay = () => event.keyCode === 13 ? playBtnFunctionality() : null;

let updateDM = () => {
  currentGame.addChoice(event.target.id);
  currentGame.updateAvailableSquaresArray(event.target.id);
  currentGame.checkWinOrDraw();
};

let updateDMforNextGame = () => {
  currentGame.updatePlayersInStorage();
  currentGame.initiateNewGame();
  currentGame.checkXandOPlayers();
};

let updateDOMforNextGame = () => {
  activateSquares();
  resetBoardDOM();
  updateHeader();
  updateWinCounter();
};

let setUpNextGame = () => {
  updateDMforNextGame();
  updateDOMforNextGame();
  numOfPlayers === "1" ? currentGame.checkIfCompTurn(): null;
};

let updateDOM = () => {
  if (currentGame.isOver) {
    disableSqaures();
    updateHeader();
    setTimeout(setUpNextGame, 4000);
  } else {
    currentGame.passTurn();
    updateHeader();
  };
};

let navToNewGameForm = () => {
  resetDMforNewGame();
  resetDOMforNewGame();
  resetBoardDOM();
  activateSquares();
  hideOrShowGameBoard();
  hideDisplayElem();
};

let hideDisplayElem = () => {
  numPlayersBtnBox.toggleAttribute('hidden');
  nameInput.setAttribute('hidden',true);
  gameModeBtnBox.setAttribute('hidden', true);
  playBtn.setAttribute('hidden', true);
};

// EVENT LISTENERS // 
nameInput.addEventListener('input', updateNameFormDOM);
nameInput.addEventListener('submit', enterPressPlay);
playBtn.addEventListener('click', playBtnFunctionality);
newGameBtn.addEventListener('click', navToNewGameForm);

numPlayersBtnBox.addEventListener('click', () => {
  event.preventDefault();
  if (event.target.id) {
    numOfPlayers = event.target.id;
    pageNagivation();
  };
});

gameModeBtnBox.addEventListener('click', () => {
  event.preventDefault();
  if (event.target.id === "hard" || event.target.id === "easy") {
    currentGame.gameMode = event.target.id;
    updateDOMforFirstGame();
  };
});

gameBoard.addEventListener('click', () => {
  if (event.target.id) {
    updateDM();
    updateTargetSquare();
    updateDOM();
  };
});