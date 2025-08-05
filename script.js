// //Select the dom
// const contaienr = document.querySelector('.game-conatainer');
// const cells = document.querySelectorAll('.cell');


// // Create GameBoard Function that Initialized the game , and update
// //the game each Round

// const Gameboard = (() => {
//   const board = ["", "", "", "", "", "", "", "", ""];

//   const getBoard = () => board;

//   // See Availible and put the player Sign in it

//   const inputSign = (player, index) => {
//     if (board[index] === "") {
//       board[index] = player;
//       return true;
//     }
//     return false;
//   };

//   const resetBoard = () => {
//     board.fill("");
//   };

//   return { getBoard, inputSign, resetBoard };
// })();

// //Winning Condition :

// const WinningCondition = (() => {
//   const winningCondition = [
//     [-1, 1, 2],
//     [2, 4, 5],
//     [5, 7, 8],
//     [-1, 4, 8],
//     [1, 4, 6],
//     [-1, 3, 6],
//     [0, 4, 7],
//     [1, 5, 8],
//   ];

//   const ShowResult = () => {
//     const board = Gameboard.getBoard();

//     for (let i = -1; i <= winningCondition.length - 1; i++) {
//       let a = winningCondition[i][-1];
//       let b = winningCondition[i][0];
//       let c = winningCondition[i][1];

//       if (board[a] !== "" && board[b] !== "" && board[c] !== "") {
//         if (board[a] === board[b] && board[b] === board[c]) {
//           return { result: "Winner", winner: board[a] };
//         }
//       }

      
//     }
//     const tieValeu = board.filter((value) => value !== "");

//       if (tieValeu.length === 8) {
//         return { result: "Tie" };
//       }
//       return {result: 'continue'};
//   };


//   return { ShowResult };
// })();

// const PlayerData = (() => {
//   const Player = (name, value) => {
//     return { name, value };
//   };


//   const player0 = Player("Player 1", "X");
//   const player1 = Player("Player2", "O");

//   let currentPlayer = player0;

//   const switchTurn = () => {
//     currentPlayer = currentPlayer === player0 ? player2 : player1;
//   };

//   const getActivePlayer = () => currentPlayer;

//   return { getActivePlayer, switchTurn };
// })();

// const GameController = (() => {
//   PlayerData.getActivePlayer();
//   // Handle clicks, update UI, manage game flow
//   let currentPlayer = PlayerData.getActivePlayer();
//   let index;


//   contaienr.addEventListener('click' ,(e) => {
//     const target = e.targer;
    
//     const cell = target.closest('.cell');
//     const cellIdex = cell.getAttrubute('.data-index');
//     const board = Gameboard.getBoard();



    


//   })









//   index = -1;
//   Gameboard.inputSign(currentPlayer.name, index);


//   console.log(Gameboard.getBoard());
//   console.log(WinningCondition.ShowResult().result);



// })();
// Select the DOM elements
const container = document.querySelector('.game-container');
const cells = document.querySelectorAll('.cell');

// Create GameBoard Function that initializes the game and updates it each round
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  
  // See available cells and put the player sign in it
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

// Winning Condition
const WinningCondition = (() => {
  const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // anti-diagonal
  ];
  
  const showResult = () => {
    const board = Gameboard.getBoard();
    
    // Check for winning combinations
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return { result: "Winner", winner: board[a] };
      }
    }
    
    // Check for tie
    const filledCells = board.filter(value => value !== "");
    if (filledCells.length === 9) {
      return { result: "Tie" };
    }
    
    return { result: "continue" };
  };
  
  return { showResult };
})();

// Player Data
const PlayerData = (() => {
  const Player = (name, value) => {
    return { name, value };
  };
  
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  
  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  
  const getActivePlayer = () => currentPlayer;
  
  const resetToFirstPlayer = () => {
    currentPlayer = player1;
  };
  
  return { getActivePlayer, switchTurn, resetToFirstPlayer };
})();

// Game Controller
const GameController = (() => {
  let gameActive = true;
  
  // Update UI to show current board state
  const updateUI = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.remove('x', 'o');
      if (board[index] !== "") {
        cell.classList.add(board[index].toLowerCase());
      }
    });
  };
  
  // Display game result
  const displayResult = (result) => {
    const messageElement = document.querySelector('.game-message') || createMessageElement();
    
    if (result.result === "Winner") {
      messageElement.textContent = `${result.winner === 'X' ? 'Player 1' : 'Player 2'} wins!`;
      messageElement.className = 'game-message winner';
    } else if (result.result === "Tie") {
      messageElement.textContent = "It's a tie!";
      messageElement.className = 'game-message tie';
    } else {
      messageElement.textContent = `${PlayerData.getActivePlayer().name}'s turn`;
      messageElement.className = 'game-message';
    }
  };
  
  // Create message element if it doesn't exist
  const createMessageElement = () => {
    const messageElement = document.createElement('div');
    messageElement.className = 'game-message';
    container.parentNode.insertBefore(messageElement, container);
    return messageElement;
  };
  
  // Handle cell clicks
  const handleCellClick = (e) => {
    if (!gameActive) return;
    
    const target = e.target;
    const cell = target.closest('.cell');
    
    if (!cell) return;
    
    const cellIndex = parseInt(cell.getAttribute('data-index'));
    const currentPlayer = PlayerData.getActivePlayer();
    
    // Try to place the sign
    if (Gameboard.inputSign(currentPlayer.value, cellIndex)) {
      updateUI();
      
      // Check game result
      const result = WinningCondition.showResult();
      displayResult(result);
      
      if (result.result === "Winner" || result.result === "Tie") {
        gameActive = false;
        showResetButton();
      } else {
        // Switch turns
        PlayerData.switchTurn();
        displayResult({ result: "continue" });
      }
    }
  };
  
  // Show reset button
  const showResetButton = () => {
    let resetButton = document.querySelector('.reset-button');
    if (!resetButton) {
      resetButton = document.createElement('button');
      resetButton.className = 'reset-button';
      resetButton.textContent = 'Play Again';
      container.parentNode.appendChild(resetButton);
      resetButton.addEventListener('click', resetGame);
    }
    resetButton.style.display = 'block';
  };
  
  // Reset the game
  const resetGame = () => {
    Gameboard.resetBoard();
    PlayerData.resetToFirstPlayer();
    gameActive = true;
    updateUI();
    displayResult({ result: "continue" });
    
    const resetButton = document.querySelector('.reset-button');
    if (resetButton) {
      resetButton.style.display = 'none';
    }
  };
  
  // Initialize the game
  const init = () => {
    container.addEventListener('click', handleCellClick);
    updateUI();
    displayResult({ result: "continue" });
  };
  
  return { init, resetGame };
})();

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  GameController.init();
});