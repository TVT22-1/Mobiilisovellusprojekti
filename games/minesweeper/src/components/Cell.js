import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function Cell({ col, row, isBomb, isRevealed, isFlagged, value, handlePress, handleLongPress }) {
  return (
    <Pressable
      onPress={() => handlePress(row, col)}
      onLongPress={() => handleLongPress(row, col)} // Ensure this line is correctly wired up
      style={[styles.container, !isRevealed && styles.isRevealed, !isRevealed && styles.isFlagged]}>
      <Text style={styles.text}>
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
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  text: {
    fontSize: 17,
    fontWeight: '800',
  },
  isRevealed: {
    backgroundColor: '#EA8282',
  },
})