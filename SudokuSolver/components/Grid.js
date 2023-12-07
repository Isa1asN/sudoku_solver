import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SudokuGrid = ({ matrix }) => {
  const cellStyle = (row, col) => {
    return {
      ...styles.cell,
      borderTopWidth: row % 3 === 0 ? 2 : 0,
      borderBottomWidth: row === 8 ? 2 : 1,
      borderLeftWidth: col % 3 === 0 ? 2 : 0,
      borderRightWidth: col === 8 ? 2 : 1,
    };
  };

  return (
    <View style={styles.container}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value, colIndex) => (
            <View key={colIndex} style={[styles.cell, cellStyle(rowIndex, colIndex)]}>
              <Text style={styles.cellText}>{value !== 0 ? value : ''}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'lightgreen'
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  cellText: {
    fontSize: 23,
  },
 
});

export default SudokuGrid;
