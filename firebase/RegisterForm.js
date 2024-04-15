import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput, ActivityIndicator } from 'react-native-paper'
import { firestore, updateProfile, auth, setDoc, doc, getDoc, createUserWithEmailAndPassword } from '../firebase/Config';
import { set } from 'firebase/database';



export default function RegisterForm() {

    // REGISTER FORM STATES
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registering, setRegistering] = useState(false);

    //ERRORS IN REGISTER
    const [emailRegError, setEmailRegError] = useState(null); // email already in use
    const [passwordRegError, setPasswordRegError] = useState(null); // password too weak
    const [usernameRegError, setUsernameRegError] = useState(null); // username already in use

    handleRegister = async () => {
        try {
            const usernameAvailable = await checkUsernameAvailability(username);

            if (!usernameAvailable) { // If username is already taken
                console.log("Username is already taken");
                setUsernameRegError("Username is already taken");
                return;
            }

            // Check if the password meets minimum length requirements
            if (password.length < 6) {
                console.log("Password is too weak");
                setPasswordRegError("Password is too weak");
                return;
            }

            // Create user with email and password to Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set the username as the displayName // IMPORTANT WHEN FETCHING USERNAME
            await updateProfile(user, { displayName: username });

            // Store the username in the usernames collection
            await storeUsername(username, email, user.uid);
            console.log("KÄYTTÄJÄNIMI TALLENNETTU CLOUDIIN");

            // Signed up succesfully
         
            console.log("User signed up\nUsername:" + username, '\nEmail:', email)
            registerSuccessModal();
            closeRegisterModal();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log("Email is already in use");
                setEmailRegError("Email is already in use");
            } else if (error.code === 'auth/invalid-email') {
                console.log("Invalid email");
                setEmailRegError("Invalid email");
            } else {
                console.error('Error signing up:', error);
            }
        }
    }

            
    const checkUsernameAvailability = async (username) => {
        try {
            console.log("Before getDoc");
            const docSnap = await getDoc(doc(firestore, 'users', username));
            console.log("After getDoc");
            if (docSnap.exists()) {
                console.log("Username is already taken");
                return false;
            } else {
                console.log("Username is available");
                return true;
            }
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false;
        }
    };

    //To store the username in the cloud firestore usernames collection
    const storeUsername = async (username, email, userId) => {
        try {
            // Reference the Firestore document for the username
            const usernameDocRef = doc(firestore, 'users', username);

            // Set username, email, and UID in the document
            await setDoc(usernameDocRef, { username, email, uid: userId });
        } catch (error) {
            console.error('Error storing username:', error);
        }
    };

    // Register modal
    const registerModal = () => {
        console.log("Register");
        setRegisterModalVisible(true);
    }

    const closeRegisterModal = () => {
        setRegisterModalVisible(false);
    }

    const registerSuccessModal = () => {
        console.log("Registration successful");
        setRegistrationSuccess(true);
    }

    const closeRegisterSuccessModal = () => {
        setRegistrationSuccess(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dontTxt}>Don't have a user yet? Register now!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={registerModal}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={registerModalVisible}
                onRequestClose={closeRegisterModal}               
            >
                <View style={styles.modalView}>
                    <Image source={require('../assets/images/clover3.png')} style={{ width: 80, height: 85, }} />
                    <Text style={styles.regTxt}>Register</Text>

                    {registering && <ActivityIndicator size='large' color='#000000' />}

                    <View style={styles.modalInputs}>

                    {/* Display error message */}
                    {emailRegError && <Text style={styles.errorText}>{emailRegError}</Text>}
                    <TextInput
                        label="Email"
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailRegError(null);
                        }
                        }
                        value={email}
                        keyboardType='email-address'
                    />

                    {/* Display error message */}
                    {usernameRegError && <Text style={styles.errorText}>{usernameRegError}</Text>}
                    <TextInput
                        label="Username"
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setUsername(text);
                            setUsernameRegError(null);
                        }
                        }
                        value={username}

                    />

                    {/* Display error message */}
                    {passwordRegError && <Text style={styles.errorText}>{passwordRegError}</Text>}
                    <TextInput
                        label="Password"
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordRegError(null);
                        }
                        }
                        value={password}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.regbutton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.regbutton}
                        onPress={closeRegisterModal}
                    
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Display registration success message */}
            <Modal
                animationType='slide'
                transparent={false}
                visible={registrationSuccess}
                onRequestClose={closeRegisterSuccessModal}>
                <View style={styles.modalView}>
                    <Image source={require('../assets/images/clover3.png')} style={{ width: 80, height: 85, marginBottom: 20}} />
                    <Text style={styles.successText}>Registration successful</Text>
                    <Text style={styles.successText}>You can now log in!</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={closeRegisterSuccessModal}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#2A2A2A',
        padding: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        elevation: 5,

    },

    dontTxt: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'comfortaa-variable',
        color: 'white',
        width: 200,

    },

    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'comfortaa-variable',

    },


   

    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA8282',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalInputs: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(253, 253, 253, 0.7)',
        borderRadius: 20,
        padding: 20,
        borderColor: '#EA8282',
        borderWidth: 2,
        borderStyle: 'dashed',

        

    },

    inputField: {
        width: 200,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
    },

    regTxt: {
        fontSize: 26,
        marginBottom: 20,
        fontFamily: 'comfortaa-variable',
        color: 'white',
    },

    regbutton: {
        backgroundColor: '#2A2A2A',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        elevation: 5,
    },

    errorText: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'comfortaa-variable',
    },
    successText: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'comfortaa-variable',
        color: 'white',
    },
})