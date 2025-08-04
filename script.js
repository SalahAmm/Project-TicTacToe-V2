// Create GameBoard Function that Initialized the game , and update
//the game each Round

const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  // See Availible and put the player Sign in it

  const inputSign = (player, index) => {
    if (board[index] === "") {
      board[index] = player;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, inputSign, resetBoard };
})();

//Winning Condition :

const WinningCondition = (() => {
  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ]; 
})();


const PlayerData = (() => {


const Player = (name , value) => {

  return {name , value}
};

const board = Gameboard;

const player1 = Player('Player 1', 'X');
const player2 = Player('Player2' ,'O');

let currentPlayer = player2;

const switchTurn = () => {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
};


const getActivePlayer = () => currentPlayer;

console.log(getActivePlayer(), board.getBoard());






return {getActivePlayer, }


})();