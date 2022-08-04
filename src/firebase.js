// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu2rDVRiyhsugpLWAsrDWrhoVZmiM4WEo",
  authDomain: "test-firebase-d594b.firebaseapp.com",
  projectId: "test-firebase-d594b",
  storageBucket: "test-firebase-d594b.appspot.com",
  messagingSenderId: "379321634435",
  appId: "1:379321634435:web:73a77c40667bbea26095b6",
  measurementId: "G-TYS9RJV38Q",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
// setPersistence(authService, browserLocalPersistence);
export const dbService = firebase.firestore();
