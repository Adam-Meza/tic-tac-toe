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
 winBoxHeaders = document.querySelectorAll('.js-win-box'),
 winCounts = document.querySelectorAll('.js-win-count'),

 numPlayersBtnBox = document.querySelector('.js-num-players-btn-box'),
 onePlayerBtn = document.querySelector('.js-one-player-btn'),
 twoPlayerBtn = document.querySelector('.js-one-player-btn'),
 newGameBtn = document.querySelector('.js-new-game-button'),
 playBtn = document.querySelector('.js-play-btn');

// NAVIGATION FUNCTIONS//

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

let updateHeader = () => {
  if (currentGame.isDraw) {
    header.innerHTML = "It's a Draw!";
  } else if (currentGame.isOver) {
    header.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  } else {
    header.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
  }
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
  } 
};

let resetDMforFirstGame = () => {
  currentGame = {};
  firstPlayer = null;
  secondPlayer = null;
  numOfPlayers = 0;
};

let resetDOMforFirstGame = () => {
  winCounts[0].innerHTML = "0"
  winCounts[1].innerHTML = "0"
  userInputForm.classList = "num-form js-user-input-form";
  userPrompt.innerText = "How Many Players?";
  body.background = "./assets/pond.jpg";
  playBtn.classList = "play-btn js-play-btn";
};

let updateDOMforFirstGame = () => {
  body.background = "./assets/sun.jpg";
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

let makeGenericPlayer = () => firstPlayer ? secondPlayer = new Player("Player 2") : firstPlayer = new Player("Player 1");

// DOM MANIPULATION ATOMIC FUNCTIONS //

let disableBoardSqaures = () => boardSquares.forEach(square => square.disabled = true);
let activateSquares = () => boardSquares.forEach(square => square.disabled = false);
let updateNameFormDOM = () => nameInput.value ? playBtn.innerText = "Let's Play!" : playBtn.innerText = "Continue as Guest";
let clearInput = () => nameInput.value = "";

let updateTargetSquare = () => {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  event.target.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
};

let resetDOM = () => {
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
      updateDOMforFirstGame();
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

let updateDMforNewGame = () => {
  currentGame.updatePlayersInStorage();
  currentGame.initiateNewGame();
  currentGame.checkXandOPlayers();
};

let  updateDOMforNewGame = () => {
  activateSquares();
  resetDOM();
  updateHeader();
  updateWinCounter();
};

let setUpNewGame = () => {
  updateDMforNewGame();
  updateDOMforNewGame();
  numOfPlayers === "1" ? currentGame.checkIfCompTurn(): null;
};

let updateDOM = () => {
  if (currentGame.isOver) {
    disableBoardSqaures();
    updateHeader();
    setTimeout(setUpNewGame, 4000);
  } else {
    currentGame.passTurn();
    updateHeader();
  };
};

let navToNewGameForm = () => {
  resetDMforFirstGame();
  resetDOMforFirstGame();
  resetDOM();
  activateSquares();
  hideOrShowGameBoard();
  hideOrShowInputElems();
};

// EVENT LISTENERS // 

nameInput.addEventListener('input', updateNameFormDOM);
nameInput.addEventListener('submit', enterPressPlay);
playBtn.addEventListener('click', playBtnFunctionality);
newGameBtn.addEventListener('click', navToNewGameForm);

numPlayersBtnBox.addEventListener('click', () => {
  event.preventDefault();
  if (event.target.id){
    numOfPlayers = event.target.id;
    pageNagivation();
    };
  }
);

gameBoard.addEventListener('click', () => {
  if (event.target.id) {
    updateDM();
    updateTargetSquare();
    updateDOM();
    };
  }
);