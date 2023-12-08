import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SudokuGrid from '../components/Grid';

const Solutionpage = ({navigation, route}) => {
  // const sudokuMatrix = [
  //   [5, 3, 0, 0, 7, 0, 0, 0, 0],
  //   [6, 0, 0, 1, 9, 5, 0, 0, 0],
  //   [0, 9, 8, 0, 0, 0, 0, 6, 0],
  //   [8, 0, 0, 0, 6, 0, 0, 0, 3],
  //   [4, 0, 0, 8, 0, 3, 0, 0, 1],
  //   [7, 0, 0, 0, 2, 0, 0, 0, 6],
  //   [0, 6, 0, 0, 0, 0, 2, 8, 0],
  //   [0, 0, 0, 4, 1, 9, 0, 0, 5],
  //   [0, 0, 0, 0, 8, 0, 0, 7, 9],
  // ];
  const sudokuMatrix = route.params.sudokuMatrix;
  const reshapedMatrix = sudokuMatrix.reduce((acc, curr, i) => {
    const row = Math.floor(i / 9);
    const col = i % 9;
    if (col === 0) {
      acc.push([curr]);
    } else {
      acc[row].push(curr);
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <SudokuGrid matrix={sudokuMatrix} />
      <Text style={styles.solvedtxt}>Solved!</Text>
      <TouchableOpacity style={{marginTop:45}} onPress={() => navigation.navigate('Solver')}>
        <Text style={styles.tryanth}>try another</Text>
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
  solvedtxt: {
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 20,
  },
  tryanth: {
    fontSize: 22, 
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'lightblue',
  }
});

export default Solutionpage;
