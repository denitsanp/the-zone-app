import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/calcstyles';
import { LinearGradient } from 'expo-linear-gradient';

function CalculatorScreen() {
  const [macronutrient, setMacronutrient] = useState('protein');
  const [grams, setGrams] = useState('');
  const [blocks, setBlocks] = useState('');
  const [result, setResult] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const calculateGrams = () => {
    let resultPerBlock;
    switch (macronutrient) {
      case 'protein':
        resultPerBlock = 700;
        break;
      case 'carb':
        resultPerBlock = 900;
        break;
      case 'fat':
        resultPerBlock = 150;
        break;
      default:
        resultPerBlock = 0;
    }

    let numericGrams = parseFloat(grams);  
    let numericBlocks = parseInt(blocks, 10);

    if (numericGrams > 0 && numericBlocks > 0) {
      const total = (resultPerBlock /  numericGrams * numericBlocks).toFixed(2);
      setResult(total);
      toggleModal();
    } else {
      alert('Please enter valid values for grams and blocks');
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['mediumpurple', 'white']} style={styles.container}>
        <View style={styles.imageContainer}> 
        <Image source={require('../assets/calc.png')} style={styles.image} />
        </View>
      <Picker
        selectedValue={macronutrient}
        onValueChange={(itemValue) => setMacronutrient(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Protein" value="protein" color='indigo'/>
        <Picker.Item label="Carbohydrates" value="carb" color='indigo'/>
        <Picker.Item label="Fat" value="fat" color='indigo'/>
      </Picker>

      <Text style={styles.label}>Nutrient value by label:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter grams per 100g product"
        keyboardType="numeric"
        value={grams}
        onChangeText={setGrams}
      />
      <Text style={styles.label}>Food blocks:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of blocks"
        keyboardType="numeric"
        value={blocks.toString()}
        onChangeText={(text) => setBlocks(Number(text))}
      />

      <TouchableOpacity onPress={calculateGrams} style={styles.button}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal} 
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Your {macronutrient} portion is:</Text>
              <Text style={styles.modalText}>
                {result} grams per {blocks} blocks
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Got it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </LinearGradient>
    </TouchableWithoutFeedback >
  );
}

export default CalculatorScreen;

