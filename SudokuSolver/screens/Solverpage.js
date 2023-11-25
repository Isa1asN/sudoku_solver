import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Solverpage = ({ navigation }) => {
  const handleStartPress = () => {
    // Navigate to the screen where your Sudoku solver logic will be implemented
    // You can replace 'SolverScreen' with the actual name of your solver screen
    navigation.navigate('SolverScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Sudoku Solver</Text>
      {/* <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity> */}
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
    backgroundColor: '#3498db', // You can customize the button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff', // Button text color
    fontSize: 18,
  },
});

export default Solverpage;
