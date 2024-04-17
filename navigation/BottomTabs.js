import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { tabBarStyles } from '../styles/styles';
import HomeScreen from '../components/HomeScreen';
import CalculatorScreen from '../components/CalculatorScreen';
import NutritionFactsScreen from '../components/NutritionFactsScreen';
import FoodCheckerScreen from '../components/FoodCheckerScreen';

const Tab = createBottomTabNavigator();
  
  function BottomTabs({ username }) {
    return (
      <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Calculator') {
          iconName = focused ? 'calculator' : 'calculator-outline';
        } else if (route.name === 'NutritionFacts') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        }else if (route.name === 'FoodChecker') {
          iconName = focused ? 'fast-food' : 'fast-food-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      ...tabBarStyles,
      headerStyle: { backgroundColor: 'mediumpurple', shadowColor: 'mediumpurple' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 20},
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} initialParams={{ username }} />
    <Tab.Screen name="Calculator" component={CalculatorScreen} />
    <Tab.Screen name="FoodChecker" component={FoodCheckerScreen} />
    <Tab.Screen name="NutritionFacts" component={NutritionFactsScreen} />
  </Tab.Navigator>
    );
  }
  
  export default BottomTabs;

