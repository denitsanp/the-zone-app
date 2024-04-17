import React, { useState } from 'react';
import { View, Text, Image, Modal, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert} from 'react-native';
import { styles } from '../styles/foodstyles';
import { db } from '../database'; 
import { LinearGradient } from 'expo-linear-gradient';

const FoodTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState('');


  const toggleModal = () => {
    if (isModalVisible) {
      setSearchQuery('');
    }
    setIsModalVisible(!isModalVisible);
  };

  const searchFoods = () => {
    if (searchQuery.length>3) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM foods WHERE LOWER(name) LIKE ?',
        [`%${searchQuery.toLowerCase()}%`],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              setFoods(_array);
              setLastSearchQuery(searchQuery);
              toggleModal();
            } else {
              Alert.alert("No Results", "No such food available.", [{ text: "OK" }]);
              setFoods([]);
            }
          },
          (_, error) => console.log('Error searching foods', error)
        );
      });
    } else {
      Alert.alert("Invalid Search", "Please enter at least 4 characters.", [{ text: "OK" }]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient colors={['mediumpurple', 'white']} style={styles.container}>
      <Image source={require('../assets/food.png')} style={styles.image} />
      <Text style={styles.title}>Check nutrients for non-packaged food</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a food..."
        placeholderTextColor="white"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.button} onPress={searchFoods}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal} 
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Nutrients per block {lastSearchQuery}:</Text>
          <Text style={styles.modalTitle}>{foods.length > 0 ? foods[0].category : ""}</Text> 
            {foods.map((food, index) => (
              <View key={index} style={styles.result}>
        
                <Text style={styles.modalText}> {food.name} - {food.grams_per_block} grams</Text>
              </View>
            ))}
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
    </TouchableWithoutFeedback>

  );
};

export default FoodTable;

