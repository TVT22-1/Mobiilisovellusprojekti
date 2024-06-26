import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontLoader from './appComponents.js/FontLoader';

//____SCREENS____
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';

// Snakegame
import SnakegameMenuScreen from './screens/SnakegameMenuScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import SnakegameSettings from './screens/SnakegameSettings';
import SnakegameLeaderboard from './screens/SnakegameLeaderboard';

//Flappy Bird
import FlappybirdLeaderboard from './screens/FlappybirdLeaderboard';
import FlappybirdSettings from './screens/FlappybirdSettings';
import FlappybirdGameoverScreen from './screens/FlappybirdGameoverScreen';
import FlappybirdScreen from './screens/FlappybirdScreen';
import FlappybirdMenuScreen from './screens/FlappybirdMenuScreen';

// Minesweeper
import MinesweeperScreen from './screens/MinesweeperScreen';
import MinesweeperMenuScreen from './screens/MinesweeperMenuScreen';
import MinesweeperLeaderboard from './screens/MinesweeperLeaderboard';

// Memory
import MemoryScreen from './screens/MemoryScreen';
import MemoryLeaderboard from './screens/MemoryLeaderboard';
import MemoryGame from './games/memorygame/components/MemoryGame';
import Options from "./games/memorygame/components/Options";


// for Firebase
import { auth } from './firebase/Config';
import LoginForm from './firebase/LoginForm';
import Logout from './firebase/Logout';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      {/* you can use fontloader to use custom fonts anywhere in the app */}
      <FontLoader>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1a1a1a',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'comfortaa-variable',
                
              },
             

              headerLeft: () => (
                <Logout navigation={navigation} />
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={() => ({
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'black',
              },
              
            })}
          >
          </Stack.Screen>

          {/*Flappy Bird*/}
          <Stack.Screen
            name="flappybird"
            component={FlappybirdMenuScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
           name="flappybirdLeaderboard" 
           component={FlappybirdLeaderboard} 
           options={{
            headerShown: false,
          }}
           />
               <Stack.Screen
           name="flappybirdSettings" 
           component={FlappybirdSettings} 
           options={{
            headerShown: false,
          }}
           />
           <Stack.Screen 
           name="flappybirdgame" 
           component={FlappybirdScreen}
           initialParams={{ restartPressed: false }}
           options={{
            headerShown: false
           }} 
           />
              <Stack.Screen 
           name="flappybirdgameover" 
           component={FlappybirdGameoverScreen}
           options={{
            headerShown: false
           }} 
           />

          {/* flappy ends */}

          {/* Minesweeper */}
          <Stack.Screen
            name="minesweeper"
            component={MinesweeperMenuScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="minesweeperLeaderboard"
            component={MinesweeperLeaderboard}
            options={
              {
                title: 'Leaderboard',
                headerStyle: {
                  backgroundColor: '#EA8282',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'comfortaa-variable',
                  alignItems: 'center',
                },
              }
            }
          />
          <Stack.Screen 
          name="minesweepergame"
          component={MinesweeperScreen}
          options={
            {
              title: ' ',
              headerStyle: {
                backgroundColor: '#EA8282',
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'comfortaa-variable',
                alignItems: 'center',
              },
          }
          }
          />
          {/* Minesweeper ends */}

          {/* snake */}
          <Stack.Screen
            name="snakegame"
            component={SnakegameMenuScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SnakegameLeaderboard"
            component={SnakegameLeaderboard}
            options={{
              title: 'Leaderboard',
              headerStyle: {
                backgroundColor: '#EA8282',
              },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'comfortaa-variable',
                alignItems: 'center',

              },
            }}
          />

          <Stack.Screen
            name="actualgame"
            component={SnakegameScreen}
            options={
              {
                headerShown: false
              }
            } />
          <Stack.Screen
            name="snakeSettings"
            component={SnakegameSettings}
            options={{
              title: 'Settings',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'comfortaa-regular',

              },
            }} />
          {/* snake ends */}

          {/* memory */}
          <Stack.Screen name="Memory" component={MemoryScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name="MemoryGame" component={MemoryGame}
            options={{ headerShown: false }} />
          <Stack.Screen name="Options" component={Options} />
          <Stack.Screen name="MemoryLeaderboard" component={MemoryLeaderboard}
          options={{
            title: 'Leaderboard',
            headerStyle: {
              backgroundColor: '#EA8282',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'comfortaa-variable',
              alignItems: 'center',
            },
          }}
          />
          {/* memory ends */}
        </Stack.Navigator>
      </FontLoader>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
