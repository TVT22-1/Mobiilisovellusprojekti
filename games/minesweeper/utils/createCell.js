export function createCell(row, col) {
  return {
    row,
    col,
    isBomb: false,
    isRevealed: false,
    isFlagged: false,
    // isEmpty: false,
    value: null,
  };
}