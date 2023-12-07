import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import EditableSudokuCell from './EditableCell';

const EditableSudokuGrid = ({ matrix, onCellChange }) => {
    return (
      <View style={styles.container}>
        {matrix.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => (
              <EditableSudokuCell
                key={colIndex}
                value={value}
                onChange={(newValue) => onCellChange(rowIndex, colIndex, newValue)}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  export default EditableSudokuGrid;  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
    },
    cellText: {
      fontSize: 18,
    },
    submitButton: {
      marginTop: 20,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });