import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBuS1irNir8GEUOkBUf8vK3jA_7kij9d9E",
    authDomain: "the-zone-app.firebaseapp.com",
    projectId: "the-zone-app",
    storageBucket: "the-zone-app.appspot.com",
    messagingSenderId: "97661227650",
    appId: "1:97661227650:web:3d020285a6490e52201a9b"
  };
  
  const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
