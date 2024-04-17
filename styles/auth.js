import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'khaki',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 30,
    color: 'indigo',
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'indigo',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 25,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: 'khaki',
    paddingHorizontal: 20,
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  toggleText: {
    color: 'indigo',
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 100,
  },
  image: {
    width: 300,
    height: 300,
  },
});
