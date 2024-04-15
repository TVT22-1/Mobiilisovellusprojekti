import { signOut, auth } from './Config';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export default function Logout({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  const confirmLogout = () => {
    console.log('Logging out...');
    handleLogout();
    hideModal();
  }

  const handleLogout = async () => {
    try {
      const username = auth.currentUser.displayName;
      // Sign out the current user from Firebase Authentication
      await signOut(auth);
      // Remove the user token from async storage
      await AsyncStorage.removeItem('userToken');
      // Navigate to the login screen
      navigation.navigate('Login');
      // Reset the username state
      
      console.log({username}, 'logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View styles={styles.exitContainer}>

      <TouchableOpacity onPress={showModal} style={styles.touchable}>
        <Icon style={styles.icon} name="logout" size={20} color="black" />
        <Text style={{ fontSize: 10 }}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
          <View style={styles.modalView}>
            <Text style={styles.modaltextQ}>Are you sure you want to logout?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modalButtonYes} onPress={confirmLogout}>
              <Text style={styles.modaltext}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonNo} onPress={hideModal}>
              <Text style={styles.modaltext}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
       
      </Modal>
        
    </View>
  );
}

styles = StyleSheet.create({
  exitContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,

  },
  modalView: {
    backgroundColor: '#f59f9f',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderColor: '#EA8282',
    borderWidth: 2,
    
    elevation: 5,



  },

  modaltextQ: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'comfortaa-variable',
    fontSize: 20,
    color: 'white',

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'comfortaa-variable',

  },
  modalButtonYes: {
    backgroundColor: '#cdfcc0',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    elevation: 5,
  },
  modalButtonNo: {
    backgroundColor: '#ffe0f2',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    elevation: 5,
  },



})