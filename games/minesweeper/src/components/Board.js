import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { createBoard, getNeighbors } from '../utils/createBoard';
import Cell from './Cell';
import { gameReducer } from '../reducers/gameReducer';

export default function Board() {
  const [selectedValue, setSelectedValue] = React.useState('easy');
  const BOARD_SIZE = 10;
  const NUMBER_OF_BOMBS = 3;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [gameOver, setGameOver] = useState(false); // New state to track if the game is over
  const [gameState, dispatch] = React.useReducer(gameReducer, {
    board: createBoard(BOARD_SIZE, BOARD_SIZE, NUMBER_OF_BOMBS),
    isGameOver: false,
    isGameWon: false,
    numOfOpenedCells: 0,
  });

  useEffect(() => {
    // Start the timer when the first cell is revealed or flagged
    if (gameStarted && !gameOver) {
      const intervalId = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(intervalId);

    }

    // Cleanup function to stop the timer when the component unmounts or the game is over
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, gameOver]);

  // Calculate the number of flagged cells
  const numFlaggedCells = gameState.board.flat().filter(cell => cell.isFlagged).length;

  // Calculate the number of remaining bombs
  const remainingBombs = gameState.numberOfBombs - numFlaggedCells;

  function handlePress(row, col) {
    if (!gameOver) {
      // Start the timer when the first cell is revealed or flagged
      if (!gameStarted) {
        setGameStarted(true);
      }
      dispatch({ type: 'HANDLE_CELL_CLICK', row, col });
      const cell = gameState.board[row][col];
      // if (isGameOver) {      // Check if the clicked cell is a bomb
      //   setGameOver(true);    // Set gameOver to true if the game is over
      //   clearInterval(timer); // Stop the timer when the game is over
      // } 

    }
  }
  // Function to handle long press
  function handleLongPress(row, col) {
    if (!gameOver) {
      // Start the timer when the first cell is revealed or flagged
      if (!gameStarted) {
        setGameStarted(true);
      }
      const cell = gameState.board[row][col];               // Get the cell object
      if (cell.isRevealed && !cell.isFlagged && cell.value !== null) {            // Check if the cell is revealed and has a value (not empty)
        const flaggedNeighbors = getNeighbors(gameState.board, row, col).filter(  // Get the flagged neighbors
          ([r, c]) => gameState.board[r][c].isFlagged       // Filter the flagged neighbors
        ).length;                                           // Get the number of flagged neighbors
        if (flaggedNeighbors === cell.value) {              // Check if the number of flagged neighbors matches the cell value
          dispatch({ type: 'REVEAL_NEIGHBORS', row, col }); // Update the action type to REVEAL_NEIGHBORS to reveal the neighbors
        }
      } else {
        dispatch({ type: 'TOGGLE_FLAG', row, col });        // Update the action type to TOGGLE_FLAG to toggle the flag
      }
    }
  }

  // Function to handle New game -button click
  function handleButtonClick() {
    let height, width, bombs;

    switch (selectedValue) {
      case 'easy':
        height = 10;  // Set the height to 10
        width = 10;   // Set the width to 10
        bombs = 3;    // Set the number of bombs
        break;
      case 'medium':
        height = 15;
        width = 15;
        bombs = 20;
        break;
      case 'hard':
        height = 20;
        width = 15;
        bombs = 40;
        break;
      default:
        height = 10;
        width = 10;
        bombs = 10;
    }

    // Reset the timer when starting a new game
    clearInterval(timer);
    setElapsedTime(0);
    setGameStarted(false);
    setGameOver(false);

    // Create a new board
    const newBoard = createBoard(height, width, bombs);
    dispatch({ type: 'NEW_GAME', payload: newBoard, numberOfBombs: bombs }); // Update the action type to NEW_GAME to start a new game
  }

  // Function to format time in mm:ss format
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{gameOver ?
        (gameState.isGameWon ? 'You won!' : 'Game Over')
        : 'Minesweeper'}</Text>
      <View style={styles.header}>
        <Text style={styles.timer}>{`Time: ${formatTime(elapsedTime)}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <Text style={styles.flaggedCounter}>{`💣: ${remainingBombs}`}</Text>
      </View>
      <Picker
        selectedValue={selectedValue}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      <View>
        {gameState.board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                handlePress={handlePress}
                handleLongPress={handleLongPress}
                {...cell}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3d3433',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dropdown: {
    height: 50,
    width: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EA8282',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flaggedCounter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
