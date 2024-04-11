import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFonts } from 'expo-font';
import MusicPlayer from '../games/snakegame/components/MusicPlayer';


export default function SnakegameMenuScreen({ navigation }) {

    const [isMusicMuted, setIsMusicMuted] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        'Pacifico': require('../games/snakegame/assets/fonts/Pacifico-Regular.ttf'),
        'Comfortaa': require('../games/snakegame/assets/fonts/Comfortaa-VariableFont_wght.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const handleStartPress = () => {
        // Logic to start playing the music when the button is pressed
        // setIsMusicMuted(false);
        navigation.navigate('actualgame');
      };

    return (


        <View style={styles.container}>
            <StatusBar hidden={true} />



            <ImageBackground source={require('../games/snakegame/assets/mato2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    
                }}
                imageStyle={{ opacity: 0.4, }} //only to the background
            >

                <Text style={{
                    fontFamily: 'Pacifico',
                    fontSize: 40,
                    padding: 10,
                    color: '#EA8282',
                    textShadowColor: 'rgba(0, 0, 0, 0.9)',
                    textShadowOffset: { width: -1, height: 1.2 },
                    textShadowRadius: 4,



                }}>Snake Game</Text>
                
                <View style={styles.allButtons}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleStartPress}
                    
                    
                    >
                        <Text style={styles.buttonTxt}>Start</Text>
                    </TouchableOpacity>
                    {/* <MusicPlayer source={require('../games/snakegame/assets/music/background.mp3')}/> */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('snakegameLeaderboard')}
                    >
                        <Text style={styles.buttonTxt}>Leaderboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonTxt}>Exit</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7C0D2',
    },

    allButtons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(253, 253, 253, 0.4)',
        borderRadius: 20,
        width: 300,
       
        gap: 20,
        padding: 20,
        borderColor: '#EA8282',
        borderWidth: 2,
        borderStyle: 'dashed',
        position: 'absolute',
        bottom: 160,
       


    

    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: '#EA8282',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#EC5E5E',
        borderWidth: 1,
        margin: 10,

        // elevation: 5,

        
    },
    buttonTxt: {
        color: 'white',
        fontFamily: 'Comfortaa',
        fontSize: 20,
        

    }
})