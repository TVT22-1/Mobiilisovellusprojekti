import { getNeighbors } from "../utils/createBoard"

export function gameReducer(state, action) {
  const { type, row, col } = action

  switch (type) {
    case 'HANDLE_CELL_CLICK': {

      if (state.board[row][col].isFlagged)
        return state

      if (state.board[row][col].isBomb) {
        return {
          ...state,
          board: revealAll(state.board),
          isGameOver: true,
          isGameOn: false,
          isTimerOn: false,
        }
      } else if (state.board[row][col].value === null) {
        // expand
        return {
          ...state,
          board: expand(state.board, row, col),
        }
      } else { 
        return {
          ...state,
          board: revealCell(state.board, row, col),
        }   
      }
    }
    case 'TOGGLE_FLAG': {
      return {
        ...state,
        board: toggleFlag(state.board, row, col),
      }
    }
    case 'NEW_GAME': {
      const { payload: board, numberOfBombs } = action;
      const height = board.length;
      const width = board[0].length;
      const numberOfNonBombCells = height * width - numberOfBombs;

      return {
        ...state,
        board,
        isGameOver: false,
        isGameWon: false,
        isGameOn: true,
        isTimerOn: false,
        numOfOpenedCells: 0,
        numberOfBombs,
        numberOfNonBombCells,
        numFlaggedCells: 0,
      };
    }

    case 'CHECK_GAME_WON': {
      const { board } = state;
      let nonBombCellsRevealed = 0;

      // Count the number of revealed non-bomb cells
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col].isRevealed && !board[row][col].isBomb) {
            nonBombCellsRevealed++;
            state.numOfOpenedCells = nonBombCellsRevealed
          }
        }
      }

      // If all non-bomb cells are revealed, set isGameWon to true
      if (!state.isGameOver && nonBombCellsRevealed === state.numberOfNonBombCells) {
        return {
          ...state,
          isGameWon: true,
          isGameOn: false,
          isTimerOn: false,
        };
      }

      return state;
    }

    case 'START_TIMER': {
      return {
        ...state,
        isTimerOn: true,
      };
    }
    case 'STOP_TIMER': {
      return {
        ...state,
        isTimerOn: false,
      };
    }
    default: {
      console.log('error, action not found')
    }
  }
}

function revealCell(board, row, col) {
  const newBoard = board.slice()
  const cell = newBoard[row][col]
  const newCell = { ...cell, isRevealed: true }
  newBoard[row][col] = newCell
  return newBoard
}

function expand(board, row, col) {
  const newBoard = board.slice()
  const stack = [[row, col]]

  while (stack.length > 0) {
    const [row, col] = stack.pop()
    const neighbors = getNeighbors(newBoard, row, col)

    for (const neighbor of neighbors) {
      const [row, col] = neighbor
      if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) continue
      if (!newBoard[row][col].isBomb) {
        newBoard[row][col].isRevealed = true
        if (newBoard[row][col].value > null) continue
        stack.push(neighbor)
      }
    }
  }
  return newBoard
}

function revealAll(board) {
  const newBoard = board.slice()
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      const cell = newBoard[row][col]
      const newCell = { ...cell, isRevealed: true }
      newBoard[row][col] = newCell
    }
  }
  return newBoard
}

function toggleFlag(board, row, col) {
  if (board[row][col].isRevealed){
  return board
  }
  const newBoard = board.slice()
  const cell = newBoard[row][col]
  const newCell = { ...cell, isFlagged: !cell.isFlagged }
  newBoard[row][col] = newCell
  return newBoard
}
