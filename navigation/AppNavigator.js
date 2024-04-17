import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../components/AuthScreen';
import BottomTabs from './BottomTabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();

function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return null; 
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}
export default AppNavigator;
