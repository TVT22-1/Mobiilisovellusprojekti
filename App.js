import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopinpeliScreen from './screens/Memory';
import FlappybirdScreen from './screens/FlappybirdScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';
// mato
import SnakegameMenuScreen from './screens/SnakegameMenuScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import SnakegameSettings from './screens/SnakegameSettings';
import SnakegameLeaderboard from './screens/SnakegameLeaderboard';
// mato ends

import HomeScreen from './screens/HomeScreen';

import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="flappybird" component={FlappybirdScreen} />
          
          {/* Minesweeper */}
          <Stack.Screen
          name="minesweeper" 
          component={MinesweeperScreen} 
          options={{
            headerShown: false
          }}
          />
          {/* Minesweeper ends */}

          {/* mato */}
          <Stack.Screen
            name="snakegame"
            component={SnakegameMenuScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="snakegameLeaderboard"
            component={SnakegameLeaderboard} />
          <Stack.Screen
            name="actualgame"
            component={SnakegameScreen} 
            options={
              {
                headerShown: false
              }
            }/>
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

              }, }}/>
          {/* mato ends */}

          <Stack.Screen name="Topinpeli" component={TopinpeliScreen} />

        </Stack.Navigator>
    
  

     

       
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
