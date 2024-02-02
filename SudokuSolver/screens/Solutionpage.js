import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import SudokuGrid from '../components/Grid';
import { useState } from 'react';

const Solutionpage = ({navigation, route}) => {

    const data = route.params.data;
    const dataUri = `data:image/png;base64,${route.params.data.image}`;
  // console.log(dataUri);


  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={{uri: dataUri}} />
      </View>
      <Text style={styles.solvedtxt}>Solved!</Text>
      <TouchableOpacity style={{marginTop:45}} onPress={() => navigation.navigate('Solver')}>
        <Text style={styles.tryanth}>return</Text>
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
  },
  img : {
    width: 320,
    height: 320,
    borderRadius: 6,
},
});

export default Solutionpage;

