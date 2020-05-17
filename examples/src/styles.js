import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#140078',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#8559da',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    elevation: 6
  },
  text: {
    color: 'white',
    fontWeight: '600'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
