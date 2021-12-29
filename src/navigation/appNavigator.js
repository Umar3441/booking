// In App.js in a new project

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/app/home'



const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (

        <Stack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>

    );
}

export default AppNavigator;