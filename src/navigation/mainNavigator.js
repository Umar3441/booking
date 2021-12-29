// In App.js in a new project

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator'
import AppNavigator from './appNavigator'


const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                {
                    headerShown: false
                }
            }>
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="App" component={AppNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;