import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function Cell({ col, row, isBomb, isRevealed, isFlagged, value, handlePress, handleLongPress }) {
  const textColor = () => {
    switch (value) {
      case 1:
        return styles.textOne;
      case 2:
        return styles.textTwo;
      case 3:
        return styles.textThree;
      case 4:
        return styles.textFour;
      case 5:
        return styles.textFive;
      case 6:
        return styles.textSix;
      case 7:
        return styles.textSeven;
      case 8:
        return styles.textEight;
      default:
        return styles.textDefault;
    }
  };

  return (
    <Pressable
      onPress={() => handlePress(row, col)}
      onLongPress={() => handleLongPress(row, col)}
      style={[styles.container, !isRevealed && styles.isNotRevealed, isRevealed && styles.isRevealed]}
    >
      <Text style={[styles.text, textColor()]}>
        {isRevealed && (isBomb ? '💣' : value)}
        {!isRevealed && isFlagged && '🚩'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2, // Android shadow
  },
  text: {
    fontSize: 17,
    fontWeight: '800',
  },
  textOne: {
    color: 'white',
  },
  textTwo: {
    color: 'green',
  },
  textThree: {
    color: 'red',
  },
  textFour: {
    color: 'orange',
  },
  textFive: {
    color: 'pink',
  },
  textSix: {
    color: 'navy',
  },
  textSeven: {
    color: 'maroon',
  },
  textEight: {
    color: 'darkgreen',
  },
  textDefault: {
    color: 'white', // Default color for other values
  },
  isNotRevealed: {
    backgroundColor: '#EA8282',
  },
  isRevealed: {
    backgroundColor: 'black',
  },
});
