import { createCell } from './createCell'


export function createBoard(height, width, bombs) {
    const board = [];
    for (let row = 0; row < height; row++) {
        const newRow = []
        for (let col = 0; col < width; col++) {
            newRow.push(createCell(row, col))
        }
        board.push(newRow)
    }
    // add bombs
    addBombs(board, bombs)
    // increase numbers around bombs
    increaseNums(board)

    return board
}

function increaseNums(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col].isBomb) {
                const neighbors = getNeighbors(board, row, col);

                for (const neighbor of neighbors) {
                    const [ row, col ] = neighbor;
                    board[row][col].value += 1;
                }
            }
        }
    }

}

export function getNeighbors(board, row, col) {
    const height = board.length;
    const width = board[row].length;
    const neighbors = [];

    if (row - 1 >= 0) neighbors.push([row - 1, col]); // up
    if (row + 1 < height) neighbors.push([row + 1, col]); // down
    if (col - 1 >= 0) neighbors.push([row, col - 1]); // left
    if (col + 1 < width) neighbors.push([row, col + 1]); // right

    if (row - 1 >= 0 && col - 1 >= 0) neighbors.push([row - 1, col - 1]); // up left
    if (row - 1 >= 0 && col + 1 < width) neighbors.push([row - 1, col + 1]); // up right    
    if (row + 1 < height && col - 1 >= 0) neighbors.push([row + 1, col - 1]); // down left
    if (row + 1 < height && col + 1 < width) neighbors.push([row + 1, col + 1]); // down right

    return neighbors;
}

function addBombs(board, bombs) {
    let bombsPlaced = 0;
    const height = board.length;
    const width = board[0].length;

    while (bombsPlaced < bombs) {
        let randomRow = Math.floor(Math.random() * height);
        let randomCol = Math.floor(Math.random() * width);

        if (!board[randomRow][randomCol].isBomb) {
            board[randomRow][randomCol].isBomb = true;
            bombsPlaced++;
        }
    }
}
