import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StartScreen } from './components/screens/StartScreen';
import { GameScreen } from './components/screens/GameScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
    <StatusBar style='auto'/>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={StartScreen}/>
        <Tab.Screen name="Game" component={GameScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;