import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { firebaseApiKey } from "./secrets";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "middleground-32410.firebaseapp.com",
  projectId: "middleground-32410",
  storageBucket: "middleground-32410.appspot.com",
  messagingSenderId: "594652399515",
  appId: "1:594652399515:web:0f7ceee26b2f9c8b04c33e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = initializeFirestore(app, {});

export { auth, db };
