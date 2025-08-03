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

  return {getBoard , inputSign , resetBoard}
})();
