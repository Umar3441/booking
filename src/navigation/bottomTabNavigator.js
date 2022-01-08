import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTrips from '../screens/app/myTrips';
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';
import MyBooking from '../screens/app/myBooking';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={

            {
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.grey,

                tabBarStyle: {
                    backgroundColor: colors.silver,
                    borderTopWidth: 2,
                    // height: 90
                }

            }
        }>
            <Tab.Screen name="MyTrips" component={MyTrips}
                options={
                    {
                        tabBarIcon: ({ color }) => <Octicons name='calendar' size={30} color={color} />,
                        tabBarLabel: 'My Trips'
                    }
                }
            />
            <Tab.Screen name="MyBooking" component={MyBooking}

                options={
                    {
                        tabBarIcon: ({ color }) => <Feather name='book-open' size={30} color={color} />,
                        tabBarLabel: 'My Booking'
                    }
                }
            />
            <Tab.Screen name="Favourite" component={MyTrips}
                options={
                    {
                        tabBarIcon: ({ color }) => <Fontisto name='favorite' size={30} color={color} />,
                        tabBarLabel: 'Favourite'
                    }
                }
            />

            <Tab.Screen name="Profile" component={MyTrips}
                options={
                    {
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account-circle-outline' size={30} color={color} />,
                        tabBarLabel: 'Profile'
                    }
                }
            />

        </Tab.Navigator>
    );
}

export default TabNavigator;