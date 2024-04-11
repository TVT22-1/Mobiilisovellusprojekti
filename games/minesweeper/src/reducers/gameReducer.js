import { getNeighbors } from '../utils/createBoard'

export function gameReducer(state, action) {
    const { type, row, col } = action; // Destructure action to extract type, row, and col

    switch (type) {
        case 'HANDLE_CELL_CLICK': {
            // If the cell is flagged, return the current state
            if (state.board[row][col].isFlagged)
                return state;

            // If the clicked cell is a bomb, reveal all cells and end the game
            else if (state.board[row][col].isBomb) {
                return {
                    ...state,
                    board: revealAll(state.board),
                    isGameOver: true,
                    
                };
            } else if (state.board[row][col].value === null) {
                // If the clicked cell is empty, expand and reveal surrounding cells
                return {
                    ...state,
                    board: expand(state.board, row, col),
                };
            } else {
                // Otherwise, reveal the clicked cell
                return {
                    ...state,
                    board: revealCell(state.board, row, col),
                };
            }
        }
        case 'TOGGLE_FLAG': {
            // Toggle flag on the clicked cell
            return {
                ...state,
                board: toggleFlag(state.board, row, col),
            };
        }

        case 'REVEAL_NEIGHBORS': {
            // Reveal the neighbors of the clicked cell
            const neighbors = getNeighbors(state.board, row, col);
            let newBoard = [...state.board];
            let gameIsOver = false; // Flag to indicate if the game should end

            for (const [neighborRow, neighborCol] of neighbors) {
                const cell = newBoard[neighborRow][neighborCol];
                if (!cell.isRevealed && !cell.isFlagged) {
                    newBoard[neighborRow][neighborCol].isRevealed = true;
                    if (cell.isBomb) {
                        gameIsOver = true; // Set the flag if a bomb is revealed among the neighbors
                    }
                    if (cell.value === null) {
                        // Continue revealing its neighbors if the revealed cell is empty
                        newBoard = revealAround(newBoard, neighborRow, neighborCol);
                    }
                }
            }

            if (gameIsOver) {
                // End the game if a bomb is revealed among the neighbors
                return {
                    ...state,
                    board: revealAll(newBoard),
                    isGameOver: true,
                };
            } else {
                // Check if all non-bomb cells are revealed
                const nonBombCells = state.board.flat().filter(cell => !cell.isBomb);
                const unrevealedNonBombCells = nonBombCells.filter(cell => !cell.isRevealed);
                if (unrevealedNonBombCells.length === 0) {
                    // All non-bomb cells are revealed, player wins
                    return {
                        ...state,
                        board: newBoard,
                        isGameOver: true,
                        isGameWon: true,
                    };
                } else {
                    return {
                        ...state,
                        board: newBoard,
                        isGameWon: false, // Ensure the flag is reset if not all cells are revealed
                    };
                }
            }
        }

        case 'NEW_GAME': {
            // Start a new game with the specified board and number of bombs
            return {
                ...state,
                board: action.payload,
                isGameOver: false,
                isGameWon: false,
                numOfOpenedCells: 0,
                numberOfBombs: action.numberOfBombs, // Add numberOfBombs to the state
            };
        }

        default: {
            // Handle unknown action types
            console.log('error, action not found');
            return state;
        }
    }
}

function revealCell(board, row, col) {                          // Reveal the clicked cell
    const newBoard = board.slice()                              // Create a copy of the board
    const cell = newBoard[row][col]                             // Get the clicked cell
    const newCell = { ...cell, isRevealed: true }               // Update the cell to be revealed
    newBoard[row][col] = newCell                                // Update the cell in the new board
    return newBoard                                             // Return the updated board
}

function expand(board, row, col) {                              // Expand and reveal surrounding cells
    const newBoard = board.slice()                              // Create a copy of the board
    const stack = [[row, col]]                                  // Initialize a stack with the clicked cell

    while (stack.length > 0) {                                  // Continue until the stack is empty 
        const [row, col] = stack.pop()                          // Pop the last cell from the stack
        const neighbors = getNeighbors(newBoard, row, col)      // Get the neighbors of the cell

        for (const neighbor of neighbors) {                     // Iterate through the neighbors
            const [row, col] = neighbor                         // Destructure the neighbor
            if (newBoard[row][col].isRevealed) continue         // Skip if the neighbor is already revealed
            if (!newBoard[row][col].isBomb) {                   // Check if the neighbor is not a bomb
                newBoard[row][col].isRevealed = true            // Update the neighbor to be revealed
                if (newBoard[row][col].value > null) continue   // Skip if the neighbor has a value
                stack.push(neighbor)                            // Push the neighbor to the stack
            }
        }
    }
    return newBoard
}

// Function to reveal all cells
function revealAll(board) {                                     // Reveal all cells on the board
    const newBoard = board.slice()                              // Create a copy of the board
    for (let row = 0; row < newBoard.length; row++) {           // Iterate through the rows
        for (let col = 0; col < newBoard[row].length; col++) {  // Iterate through the columns
            const cell = newBoard[row][col]                     // Get the cell
            const newCell = { ...cell, isRevealed: true }       // Update the cell to be revealed
            newBoard[row][col] = newCell                        // Update the cell in the new board
        }
    }
    return newBoard                                             // Return the updated board
}

// Function to toggle flag on a cell
function toggleFlag(board, row, col) {                          // Toggle the flag on the clicked cell
    const newBoard = board.slice()                              // Create a copy of the board
    const cell = newBoard[row][col]                             // Get the clicked cell
    const newCell = { ...cell, isFlagged: !cell.isFlagged }     // Toggle the flag on the cell
    newBoard[row][col] = newCell                                // Update the cell in the new board
    return newBoard                                             // Return the updated board
}

// Function to reveal neighbors of a cell
function revealAround(board, row, col) {
    const height = board.length;
    const width = board[0].length;

    const neighbors = [ // Define the neighbors of the cell
        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1], // Top row
        [row, col - 1], [row, col + 1],                         // Middle row
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1], // Bottom row
    ];

    // Iterate through the neighbors and reveal them if they are valid and not flagged
    for (const [neighborRow, neighborCol] of neighbors) {
        if (neighborRow >= 0 && neighborRow < height && neighborCol >= 0 && neighborCol < width) {
            const cell = board[neighborRow][neighborCol];
            if (!cell.isRevealed && !cell.isFlagged) {
                board[neighborRow][neighborCol].isRevealed = true;
                if (cell.value === null) {
                    revealAround(board, neighborRow, neighborCol); // Recursively reveal neighbors if value is null
                }
            }
        }
    }

    return board;
}

// Function to check if all non-bomb cells are revealed
function checkGameWon(board) {                                                      // Check if all non-bomb cells are revealed
    const nonBombCells = board.flat().filter(cell => !cell.isBomb);                 // Filter non-bomb cells
    const unrevealedNonBombCells = nonBombCells.filter(cell => !cell.isRevealed);   // Filter unrevealed non-bomb cells
    console.log(unrevealedNonBombCells);
    console.log(unrevealedNonBombCells.length);
    if (unrevealedNonBombCells.length === 0) {                                     // Check if all non-bomb cells are revealed
        return true                                                             // Return true if all non-bomb cells are revealed
        isGameOver = true;                                                         // Set isGameOver to true
        isGameWon = true;                                                          // Set isGameWon to true

    } else {
        return false;                                                              // Return false if not all non-bomb cells are revealed
    }                                    // Return true if all non-bomb cells are revealed
}