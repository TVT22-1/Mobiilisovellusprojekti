// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, addDoc } from "firebase/firestore";
import { signOut, getAuth, initializeAuth, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";
import { snapshot } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaWDjP_Zcc1f6ppbDSseeTFCIKfrKfvbY",
  authDomain: "clovergames-6443d.firebaseapp.com",
  projectId: "clovergames-6443d",
  storageBucket: "clovergames-6443d.appspot.com",
  messagingSenderId: "274128948644",
  appId: "1:274128948644:web:e0b2ca67eed6782c680531"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const firestore = getFirestore(firebaseApp);

// Get Auth instance
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {
  firestore,
  auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  snapshot,
  collection, // Make sure this import is correct
  setDoc,
  getDocs,
  doc,
  getDoc,
  signOut,
  addDoc,
};