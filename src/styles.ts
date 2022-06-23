import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 4
  },
  arrow: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    transform: [{ rotate: '45deg' }]
  }
})
