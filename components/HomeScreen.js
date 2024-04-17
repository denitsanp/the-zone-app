import React, { useLayoutEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../auth/UserContext';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from './ImageCarousel';


function HomeScreen({ navigation }) {
  const { username, signOutUser } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut} style={{ marginRight: 10 }}>
          <Ionicons name="exit-outline" size={28} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, signOutUser]);

  const handleSignOut = async () => {
    try {
      await signOutUser(); 
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AuthScreen' }],
        })
      );
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const usernameText = username ? (
    <Text style={[styles.name, { color: 'indigo' }]}>{username}!</Text>
  ) : null; 

  const images = [{
    image: require('../assets/slide1.png'),
  },
  {
    image: require('../assets/slide2.png'),
  },
  {
    image: require('../assets/slide3.png'),
  },
  ];

  return (
    <LinearGradient colors={['mediumpurple', 'white']} style={styles.container}>
      <Text style={styles.text}>Hey, {usernameText} Ready to get in the Zone?</Text>
      <View style={styles.container}> 
      <ImageCarousel images={images} autoPlay={true} />
    </View>
    </LinearGradient>


  );
}

export default HomeScreen;

