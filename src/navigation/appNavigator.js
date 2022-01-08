// In App.js in a new project

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnableLocation from '../screens/app/enableLocation';
import TabNavigator from './bottomTabNavigator';
import DateSelector from '../screens/app/DateSelector';
import BookingDetails from '../screens/app/bookingDetails';
import LookingForFlights from '../screens/app/lookingForFlights';
import FlightList from '../screens/app/flightsList';
import PaymentDetails from '../screens/app/paymentDetails';
import QRcode from '../screens/app/qrCode';
import MyBookingDetails from '../screens/app/myBookingDetails';



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
            <Stack.Screen name="DateSelector" component={DateSelector} />
            <Stack.Screen name='BookingDetails' component={BookingDetails} />
            <Stack.Screen name='LookingForFlights' component={LookingForFlights} />
            <Stack.Screen name='FlightList' component={FlightList} />
            <Stack.Screen name='PaymentDetails' component={PaymentDetails} />
            <Stack.Screen name='QRcode' component={QRcode} />
            <Stack.Screen name='MyBookingDetails' component={MyBookingDetails} />


        </Stack.Navigator>

    );
}

export default AppNavigator;