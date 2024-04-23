// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBVFhCfS4Beaui1c6bxCPo7yiOesH1UiPc",
  authDomain: "guesswhereami-929be.firebaseapp.com",
  projectId: "guesswhereami-929be",
  storageBucket: "guesswhereami-929be.appspot.com",
  messagingSenderId: "992861681588",
  appId: "1:992861681588:web:1928304b00c74c4871e4e1",
  measurementId: "G-3334GLTN8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });


export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;