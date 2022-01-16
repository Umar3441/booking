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
import MyInformation1 from '../screens/app/myInformation1';
import MyInformation2 from '../screens/app/myInformation2';
import MyInformation3 from '../screens/app/myInformation3';
import MyInformation4 from '../screens/app/myInformation4';
import GenerateInfoQrCode from '../screens/app/generateInfoQrCode';



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
            <Stack.Screen name='MyInformation1' component={MyInformation1} />
            <Stack.Screen name='MyInformation2' component={MyInformation2} />
            <Stack.Screen name='MyInformation3' component={MyInformation3} />
            <Stack.Screen name='MyInformation4' component={MyInformation4} />
            <Stack.Screen name='GenearetInfoQRcode' component={GenerateInfoQrCode} />


        </Stack.Navigator>

    );
}

export default AppNavigator;