import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StartScreen } from './components/screens/StartScreen';
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
        <Tab.Screen name="Map" component={StartScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;