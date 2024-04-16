import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useState, useEffect } from 'react'
import { createBoard } from '../utils/createBoard'
import Cell from './Cell'
import { gameReducer } from '../reducers/gameReducer'
import { saveScoreToFirebase } from './ScoreToFirebase'
import { set } from 'firebase/database'

export default function Board() {
  let height = 10
  let width = 10
  let bombs = 10
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null); // to hold the timer interval
  const [selectedValue, setSelectedValue] = React.useState("easy");
  const [gameState, dispatch] = React.useReducer(gameReducer,
    {
      board: createBoard(width, height, bombs),
      isGameOver: false,
      isGameWon: false,
      isGameOn: true,
      isTimerOn: false,
      numOfOpenedCells: 0,
      numberOfNonBombCells: width * height - bombs,
      numberOfBombs: bombs
    })
    // Calculate the number of flagged cells
  const numFlaggedCells = gameState.board.flat().filter(cell => cell.isFlagged).length;

  // Calculate the number of remaining bombs
  const remainingBombs = gameState.numberOfBombs - numFlaggedCells;
  
  function handlePress(row, col) {
    console.log(gameState.board[row][col] );
    if (!gameState.isTimerOn && !gameState.isGameOver && !gameState.isGameWon) {
      // Start the timer if it's not already running
      setTimerInterval(setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000));
      dispatch({ type: 'START_TIMER' });
    }
    if (gameState.isGameOver || gameState.isGameWon) {
      return;
    }
    dispatch({ type: 'HANDLE_CELL_CLICK', row, col });
    dispatch({ type: 'CHECK_GAME_WON' });
  }

  function handleLongPress(row, col) {
    dispatch({ type: 'TOGGLE_FLAG', row, col })
  }

  // Function to handle New game -button click
  function handleButtonClick() {
    gameState.isTimerOn = false;
    clearInterval(timerInterval);
    setElapsedTime(0);

    switch (selectedValue) {
      case 'easy':
        width = 10;
        height = 10;
        bombs = 10;
        break;
      case 'medium':
        width = 14;
        height = 15;
        bombs = 35;
        break;
      case 'hard':
        width = 14;
        height = 20;
        bombs = 50;
        break;
      default:
        width = 10;
        height = 10;
        bombs = 10;
    }

    // Create a new board
    const newBoard = createBoard(height, width, bombs);
    dispatch({ type: 'NEW_GAME', payload: newBoard, numberOfBombs: bombs });
  }

  // Effect to stop the timer when the game is over
  useEffect(() => {
    if (gameState.isGameOver || gameState.isGameWon) {
      clearInterval(timerInterval);
      dispatch({ type: 'STOP_TIMER' });
      if (gameState.isGameWon) {
        const score = formatTime(elapsedTime);
        const difficulty = selectedValue;
        console.log(score, difficulty );
        // Save the score to Firebase
        saveScoreToFirebase(score, difficulty);
    }
    }
  }, [gameState.isGameOver, gameState.isGameWon]);

  // Function to format time in mm:ss format
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    let formatedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    return formatedTime ;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{gameState.isGameOn ? 'Minesweeper' :
        (gameState.isGameOver ? 'Game Over' : 'You Won!')
      }</Text>
      <View style={styles.header}>
        <Text style={styles.timer}>{`${formatTime(elapsedTime)}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <Text style={styles.flaggedCounter}>{`💣: ${remainingBombs}`}</Text>
      </View>
      <Text style={styles.difficulty}>Difficulty:</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.dropdown}
        dropdownIconColor={'white'}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      {gameState.board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} handlePress={handlePress} handleLongPress={handleLongPress} {...cell} />
          ))}
        </View>
      ))}
    </View>
  )
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
    color: 'white',
  },
  difficulty: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
  },
  dropdown: {
    height: 50,
    width: 150,
    marginBottom: 10,
    color: 'white',
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#EA8282',
    padding: 10,
    borderRadius: 5,

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
    color: 'white',
  },
});