import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('Solution');
  };

  return (
    <View style={styles.container}>
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
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff', 
    fontSize: 18,
  },
});

export default HomePage;
