// In App.js in a new project

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from '../screens/auth/getStarted';
import SignUp from '../screens/auth/signUp';
import Login from '../screens/auth/Login';
import OtpVerification from '../screens/auth/otpVerification';



const Stack = createNativeStackNavigator();

function AuthNavigator() {
    return (

        <Stack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <Stack.Screen name="Welcome" component={GetStarted} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OtpScreen" component={OtpVerification} />
        </Stack.Navigator>

    );
}

export default AuthNavigator;