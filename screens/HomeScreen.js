import { View, Text, StyleSheet, Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');

  // to get the username from the AsyncStorage everytime the screen is focused/loaded
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsername = async () => {
        const username = await AsyncStorage.getItem('username');
        setUsername(username);
      }
      fetchUsername();
    }, [])
  );


  return (

    <View style={styles.container}>
      <View style={styles.appnameAndImage}>
        <Text style={styles.appnameTxt}>CloverGames</Text>
        <Image source={require('../assets/images/clover3.png')} style={{ width: 50, height: 55, }} />
      </View>

      <View style={styles.welcomecontainer}>

        <Text style={styles.welcomeTxt}>Welcome, {username}! </Text>
        <Text style={styles.welcomeTxt}>Choose a game to play!</Text>
      </View>

      <View style={styles.gameAppsContainer}>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('flappybird')}>
            <ImageBackground source={require('../assets/images/flappy.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Flappy Bird</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('minesweeper')}>
            <ImageBackground source={require('../assets/images/minesweep.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Minesweeper</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('snakegame')}>
            <ImageBackground source={require('../assets/images/mato2.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Snake Game</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('Topinpeli')}>
            <ImageBackground source={require('../assets/images/memorygame.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Memory Game</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf0ed',
},
  appnameAndImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  appnameTxt: {
    fontSize: 40,
    fontFamily: 'pacifico-regular',

    color: '#EA8282',
    fontSize: 42,
    padding: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1.2 },
    textShadowRadius: 4,
  },
  welcomecontainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTxt: {
    fontSize: 20,
    fontFamily: 'comfortaa-variable',
    color: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  gameAppsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    gap: 20,
    backgroundColor: '#faa0a0',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    height: 400,
    borderColor: '#EA8282',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  gameApp: {
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: '#EA8282',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  gameAppImage: {
    width: 120,
    height: 120,
  },
  gameAppText: {
    fontSize: 16,
    fontFamily: 'comfortaa-variable',
    color: 'white',
    backgroundColor: '#EA8282',
    borderRadius: 10,
    padding: 2,
    marginTop: 5,

  },
  gameAppAndText: {

    justifyContent: 'center',
    alignItems: 'center',

  },


})