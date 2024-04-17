import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './auth/UserContext'; 
import AppNavigator from './navigation/AppNavigator';
import { initDb } from './database'; 


const App = () => {

  useEffect(() => {
    initDb()
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
