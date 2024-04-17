import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Dimensions } from 'react-native';
import { styles } from '../styles/nutritionstyles';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function NutritionFacts() {
  const [ingredients, setIngredients] = useState('');
  const [nutritionData, setNutritionData] = useState(null);

  const fetchNutritionData = async () => {
    const APP_ID = '985a016d'; 
    const APP_KEY = 'f1d5289e464090509beddf05ac123256';
    const ingredientsArray = ingredients.split('\n').filter(Boolean); 

    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`;
    const payload = {
      ingr: ingredientsArray
    };

    try {
      const response = await axios.post(apiUrl, payload);
      setNutritionData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 555) {
        alert('The ingredients list did not pass the nutrition quality check. Please make sure the ingredients are listed correctly with proper weights and measures.');
      } else {
        alert('An error occurred while fetching nutrition data. Please try again.');
      }
      console.error("Error fetching nutrition data: ", error);
      setNutritionData(null);
    }
  };

  const getQuantity = (nutrient) => {
    const quantity = nutritionData?.totalNutrients[nutrient]?.quantity; 
    return quantity ? parseFloat(quantity.toFixed(0)) : 0;
  };
  
  const protein = getQuantity('PROCNT');
  const carbs = getQuantity('CHOCDF');
  const fat = getQuantity('FAT');
  const total = protein + carbs + fat;

  const prepareChartData = () => {
    if (!nutritionData) return [];
    const data = [
      {
      name: 'Protein',
      quantity: total > 0 ? parseFloat((protein / total * 100).toFixed(0)) : 0, 
      color: 'indigo',
      legendFontColor: 'indigo',
      legendFontSize: 15,
    },
    {
      name: 'Carbs',
      quantity: total > 0 ? parseFloat((carbs / total * 100).toFixed(0)) : 0, 
      color: 'mediumpurple',
      legendFontColor: 'indigo',
      legendFontSize: 15,
    },
    {
      name: 'Fat',
      quantity: total > 0 ? parseFloat((fat / total * 100).toFixed(0)) : 0, 
      color: 'khaki',
      legendFontColor: 'indigo',
      legendFontSize: 15,
      },

    ];
    return data.filter(item => parseFloat(item.quantity) > 0); 
  };

  const chartData = prepareChartData();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <LinearGradient colors={['mediumpurple', 'white']} style={styles.container}>
        <Text style={styles.title}>
        Enter an ingredient list:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={`1 cup of rice
500 grams of chicken breast
250 grams of mushrooms`}
        placeholderTextColor="white"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        numberOfLines={4} 
      />
      <TouchableOpacity style={styles.button} onPress={fetchNutritionData}>
        <Text style={styles.buttonText}>Analyze</Text>
      </TouchableOpacity>
      {nutritionData && chartData.length > 0 && (
          <PieChart
          data={chartData}
          width={screenWidth} 
          height={250} 
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor={"quantity"}
          valueAccessor={(value) => `${value}%`}
          backgroundColor={"transparent"}
          center={[screenWidth / 16, 2]} 
        />
        )}
    </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default NutritionFacts;


