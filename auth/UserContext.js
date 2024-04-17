import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { app } from '../firebaseConfig';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const auth = getAuth(app);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const emailUsername = currentUser.email.split('@')[0];
        setUsername(emailUsername);
      } else {
        setUsername('');
      }
    });
    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <UserContext.Provider value={{ username, signOutUser }}>
      {children}
    </UserContext.Provider>
  );
};
