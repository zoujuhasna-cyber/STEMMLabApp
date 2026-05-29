import { initializeApp } from "firebase/app";
import * as FirebaseAuth from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const { initializeAuth, getAuth, getReactNativePersistence } = FirebaseAuth as typeof FirebaseAuth & {
  getReactNativePersistence: (storage: typeof ReactNativeAsyncStorage) => unknown;
};

// Real configuration for stemmlabapp project
const firebaseConfig = {
  apiKey: "AIzaSyCfvFY8qD0wZ299ZD7YGhuQUVwBCrOWH4w",
  authDomain: "stemmlabapp.firebaseapp.com",
  projectId: "stemmlabapp",
  storageBucket: "stemmlabapp.firebasestorage.app",
  messagingSenderId: "621450290210",
  appId: "1:621450290210:web:40c5b1ea06c6c2ea6b967b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence for React Native/Expo
// This ensures the user stays logged in
export const auth: Auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage) as any,
    });
  } catch (error: any) {
    if (error?.code === 'auth/already-initialized') {
      return getAuth(app);
    }
    throw error;
  }
})();

// Initialize Firestore
export const db = getFirestore(app);

export default app;
