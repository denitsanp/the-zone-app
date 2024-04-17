
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const gradientColors = ['mediumpurple', 'lavender'];

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuthentication = async () => {
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User signed in successfully!');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User created successfully!');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            } else if (error.code === 'auth/weak-password') {
                alert('The password must be 6 at least characters long!');
            } else {
                alert('An error occurred. Please try again.');
            }
            console.error('Authentication error:', error.message);
        }
    };

    const hideKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <LinearGradient colors={gradientColors} style={styles.authContainer}>
                <Image source={require('../assets/homeimg.png')} style={styles.image} />
                <Text style={styles.title}> Let's get started!</Text>
                <Text style={styles.subtitle}> ...balanced nutrition for a healthier you </Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={'white'}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={'white'}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="indigo" />
                </View>

                <View style={styles.bottomContainer}>
                    <Text
                        style={styles.toggleText}
                        onPress={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

export default AuthScreen;

