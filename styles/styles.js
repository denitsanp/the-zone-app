import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    lineHeight: 50,
    padding: 20,
    marginTop: 50,
    fontWeight: 'bold',
    color: 'khaki',
  },
  subtitle: {
    fontSize: 16,
    color: 'plum',
    padding: 30,
    textAlign: 'justify',
},
  imageContainer: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shadowStyles: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
  },
});

export const tabBarStyles = {
    tabBarStyle: { backgroundColor: 'white' },
    tabBarActiveTintColor: 'mediumpurple',
    tabBarInactiveTintColor: 'lightslategrey',
    tabBarShowLabel: true,
  };

