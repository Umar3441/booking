// In App.js in a new project

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnableLocation from '../screens/app/enableLocation';
import TabNavigator from './bottomTabNavigator';
import DateSelector from '../screens/app/DateSelector';



const Stack = createNativeStackNavigator();



function AppNavigator() {
    return (

        <Stack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>

            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="EnableLocation" component={EnableLocation} />


        </Stack.Navigator>

    );
}

export default AppNavigator;