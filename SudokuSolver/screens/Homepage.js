import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const myImage = require('../assets/logo.jpg');


const HomePage = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('Solver');
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={myImage} style={{ width: 200, height: 200, borderWidth:2, backgroundColor:'red' }} />
      </View>
      <Text style={styles.welcomeText}>Welcome to Sudoku Solver</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  welcomeText: {
    marginTop: 30,
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#008d70',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 10,
    marginTop: 90,
  },
  startButtonText: {
    color: '#fff', 
    fontSize: 18,
  },
});

export default HomePage;
