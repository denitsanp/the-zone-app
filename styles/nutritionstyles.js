import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    results: {
      backgroundColor: 'lavender',
      borderWidth: 1,
      borderRadius: 25, 
      borderColor: 'lavender', 
      elevation: 3, 
      shadowOpacity: 0.3, 
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 1 },
      padding: 14,
      marginTop: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'indigo',
      width: '80%',
    },
    input: {
      width: '80%', 
      padding: 15,
      height: 90,
      marginTop: 10,
      marginBottom: 20,
      borderWidth: 2,
      borderRadius: 30, 
      borderColor: 'indigo',
      fontSize: 16,
    },
    button: {
      backgroundColor: 'khaki',
      justifyContent: 'center',
      height: 60,
      borderRadius: 30,
      marginBottom: 10,
      width: '80%',
      shadowOpacity: 0.2, 
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
      color: 'indigo',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
    },
    resultsContainer: {
      width: '90%',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: 22,
      color: 'indigo',
    },
    resultText: {
      fontSize: 18,
      marginTop: 10,
      fontWeight: 'bold',
      color: 'mediumpurple',
    },
     
  });