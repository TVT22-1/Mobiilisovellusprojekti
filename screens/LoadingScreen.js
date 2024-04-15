import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { auth } from '../firebase/Config';

export default function LoadingScreen({navigation}) {

    // user logged in or not

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserToken = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const username = await AsyncStorage.getItem('username');
            
                if (userToken) {              
                    navigation.navigate('Home', {username});
                } else {
                    // If the user token is not found, navigate to the Login screen
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Error fetching user token:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserToken();
    }, []);

    if (isLoading) {
        // You can show a loading spinner here while checking the user token
        return null;
    }



    return (
        <View style={styles.container}>
            <View style={styles.appnameAndImage}>
            <Image source={require('../assets/images/clover3.png')} style={{ width: 100, height: 105, }} />
                <Text style={styles.appnameTxt}>CloverGames</Text>
               
            </View>
            
            <ActivityIndicator 
            animating={true} 
            color={'#EA8282'} 
            size={'large'}
            
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      
        backgroundColor: '#ebf0ed',
    },
    appnameAndImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    appnameTxt: {
        fontSize: 40,
        fontFamily: 'pacifico-regular',
        marginBottom: 20,
        color: '#EA8282',
        fontSize: 42,
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1.2 },
        textShadowRadius: 4,
    },
})