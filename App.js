import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopinpeliScreen from './screens/TopinpeliScreen';
import FlappybirdScreen from './screens/FlappybirdScreen';
import FlappybirdMenuScreen from './screens/FlappybirdMenuScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import HomeScreen from './screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import FlappybirdLeaderboard from './screens/FlappybirdLeaderboard';
import FlappybirdSettings from './screens/FlappybirdSettings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          
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
           />
               <Stack.Screen
           name="flappybirdSettings" 
           component={FlappybirdSettings} 
           />
           <Stack.Screen 
           name="flappybirdgame" 
           component={FlappybirdScreen}
           options={{
            headerShown: false
           }} 
           />

          <Stack.Screen name="minesweeper" component={MinesweeperScreen} />
          <Stack.Screen name="snakegame" component={SnakegameScreen} />
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
