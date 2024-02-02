import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import EditableSudokuGrid from '../components/EditableGrid';
import axios from 'axios';

const EditableSudokuPage = ({navigation, route}) => {
    const { sudokuMatrix } = route.params;
    // console.log(sudokuMatrix);s
    
    // const reshapedMatrix = sudokuMatrix.reduce((acc, curr, i) => {
    //   const row = Math.floor(i / 9);
    //   const col = i % 9;
    //   if (col === 0) {
    //     acc.push([curr]);
    //   } else {
    //     acc[row].push(curr);
    //   }
    //   return acc;
    // }, []);


    // const [editableMatrix, setEditableMatrix] = useState([
    //   [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //   [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //   [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //   [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //   [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //   [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //   [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //   [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //   [0, 0, 0, 0, 8, 0, 0, 7, 9],
    // ]);
  
    const [editableMatrix, setEditableMatrix] = useState(sudokuMatrix);

    const handleCellChange = (row, col, newValue) => {
      const newMatrix = [...editableMatrix];
      newMatrix[row][col] = newValue;
      setEditableMatrix(newMatrix);
    };
  
    const handleSubmit = async () => {

      const response = await axios.post('http://192.168.8.108:5000/solve_grid', {
          grid: editableMatrix,
        });
        // console.log(response.data)
  
        if (response.data['message'] === 1) {
          navigation.navigate('Solution', {data : response.data});
        } 
        else if (response.data['message'] === -1) {
          navigation.navigate('Editable', {sudokuMatrix: response.data['classified']});
        }
      
      // console.log('Submitted matrix:', editableMatrix);
    };
  
    return (
      <View style={styles.container}>
        <EditableSudokuGrid matrix={editableMatrix} onCellChange={handleCellChange} />
        <Text style={styles.desctxt}>
          The recognized puzzle grid is being unsolvable. Please edit the wrong cells and submit to solve.
        </Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'lightpink'
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
      marginTop: 10,
      backgroundColor: 'purple',
      padding: 10,
      borderRadius: 5,
      marginBottom: 50,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
    },
    desctxt: {
      fontSize: 15,
      color: 'red',
      marginTop: 0,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  
  export default EditableSudokuPage;