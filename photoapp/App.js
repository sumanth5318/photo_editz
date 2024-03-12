import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoEditor from './HomeScreen';
import EditingScreen from './EditingScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhotoEditor">
        <Stack.Screen name="Home" component={PhotoEditor} />
        <Stack.Screen name="EditingScreen" component={EditingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
