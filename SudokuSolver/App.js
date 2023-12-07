// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/Homepage';
import Solverpage from './screens/Solverpage';
import Solutionpage from './screens/Solutionpage';
import EditableSudokuPage from './screens/Editablepage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}}/>
        <Stack.Screen name="Solver" component={Solverpage} options={{headerShown:false}}/>
        <Stack.Screen name="Solution" component={Solutionpage} options={{headerShown:false}}/>
        <Stack.Screen name="Editable" component={EditableSudokuPage} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
