import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const EditableSudokuCell = ({ value, onChange }) => {
    const handleChange = (text) => {
      // Ensure only single-digit numbers or empty string are allowed
      if (/^\d?$/.test(text)) {
        onChange(text === '' ? 0 : parseInt(text, 10));
      }
    };
  
    return (
      <View style={styles.cell}>
        <TextInput
          style={styles.cellText}
          keyboardType="numeric"
          value={value !== 0 ? value.toString() : ''}
          onChangeText={handleChange}
        />
      </View>
    );
  };

  export default EditableSudokuCell;

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
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
    },
    cellText: {
      fontSize: 22,
      fontWeight: 'bold',
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