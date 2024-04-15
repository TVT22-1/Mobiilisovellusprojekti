import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import LoginForm from '../firebase/LoginForm'
import RegisterForm from '../firebase/RegisterForm'


export default function LoginScreen({ navigation}) {

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
            <View style={styles.appnameAndImage}>
                <Text style={styles.appnameTxt}>CloverGames</Text>
                <Image source={require('../assets/images/clover3.png')} style={{ width: 60, height: 65, }} />
            </View>

            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'comfortaa-variable', marginBottom: 10,}}>Login or Register to have fun!</Text>
            <View style={styles.forms}>

                <View>
                    <LoginForm navigation={navigation} />
                </View>
                <View>
                    <RegisterForm />
                </View>
            </View>
        </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginBottom: 20,
        color: '#EA8282',
        fontSize: 42,
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1.2 },
        textShadowRadius: 4,
    },
    forms: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(234, 130, 130, 0.9)',
        borderRadius: 20,
        width: 320,
        gap: 20,
        padding: 20,
        borderColor: '#EA8282',
        borderWidth: 2,
        borderStyle: 'dashed',

    },
})