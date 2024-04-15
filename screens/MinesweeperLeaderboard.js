import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firestore, collection, getDocs } from '../firebase/Config';
import { orderBy, query, limit, where } from 'firebase/firestore';
import { Icon } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MinesweeperLeaderboard() {

  const [highestScore, setHighestScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchHighestScore().then(score => {
      setHighestScore(score);
    });
  }, []);

  useEffect(() => {
    const getLeaderboard = async () => {
      const leaderboardData = await fetchGlobalLeaderboard();
      setLeaderboard(leaderboardData);
    };
    getLeaderboard();
  }, []);


  const fetchHighestScore = async () => {
    try {
      const currentUser = auth.currentUser;
      // Query the scores collection to get the highest score from current user
      const scoresQuery = query(
        collection(firestore, 'leaderboard_minesweeper'),
        where('userId', '==', currentUser.uid), // Filter by current user ID
        orderBy('score', 'desc'), // Order by score in descending order
        limit(1) // Limit to 1 document
      );
      const querySnapshot = await getDocs(scoresQuery);
      if (!querySnapshot.empty) {
        // Get the highest score from the first document
        const highestScoreData = querySnapshot.docs[0].data();
        console.log('Highest score from:', currentUser.displayName, 'is', highestScoreData.score);
        return highestScoreData.score;

      } else {
        // No scores found
        return null;
      }
    } catch (error) {
      console.error('Error fetching highest score:', error);
      return null;
    }
  };

  const fetchGlobalLeaderboard = async () => {
    try {
      // Query the scores collection to get the top 10 scores from different users
      const scoresQuery = query(
        collection(firestore, 'leaderboard_minesweeper'),
        orderBy('score', 'desc'), // Order by score in descending order
        limit(10) // Limit to 10 documents
      );
      const querySnapshot = await getDocs(scoresQuery);
      const leaderboard = querySnapshot.docs.map(doc => {
        return {
          username: doc.data().username,
          score: doc.data().score
        };
      }
      );
      console.log('Global leaderboard:', leaderboard);
      return leaderboard;

    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      return null;
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.yourHSContainer}>
        <MaterialCommunityIcons name="trophy" color="gold" size={50} />
        <Text style={styles.yourHS}>Your highscore:</Text>
        <Text style={styles.yourHS}>{highestScore}</Text>
      </View>

      <View style={styles.globalLeadersContainer}>
        <Text style={styles.yourHS}>Global leaderboard:</Text>
        {/* Display global leaderboard here */}
        {leaderboard.map((entry, index) => (
          <View key={index} style={styles.leaderboardEntry}>
            <Text style={styles.LBusername}>{entry.username}</Text>
            <Text style={styles.LBscore}>{entry.score}</Text>
          </View>
        ))}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    backgroundColor: 'black',
  },
  yourHS: {
    fontSize: 30,
    fontFamily: 'comfortaa-variable',
    color: 'white',
  },
  yourHSContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  globalLeadersContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  leaderboardEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    margin: 10,
  },
  LBusername: {
    fontSize: 20,
    color: 'white',
  },
  LBscore: {
    fontSize: 20,
    color: 'white',
  },
  })