import React, { useEffect } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import auth from '@react-native-firebase/auth'


import { textStyles, images, colors } from '../../utils';

const MyTrips = () => {

    const navigation = useNavigation();




    useEffect(() => {
        check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {

                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        navigation?.navigate('EnableLocation')
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        navigation?.navigate('EnableLocation')
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }, [navigation])



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.white} translucent barStyle='dark-content' />
            <View style={styles.header}>
                <SimpleLineIcons onPress={() => navigation?.navigate('Profile')} name='menu' size={25} color={colors.black} />
                <Text style={{ fontSize: 20, fontWeight: '300', color: colors.black }}>
                    My Trips
                </Text>

                <Entypo onPress={() => {
                    auth().signOut().then(
                        () => { navigation.replace('Auth') }
                    )

                }} name='dots-three-vertical' size={25} color={colors.black} />
            </View>

            <View style={styles.noTripsContainer}>
                <Image source={images.noUpcomingTrips} style={styles.noTripsLogo} />
                <Text style={[textStyles.bigBoldBlack, { fontSize: 22, color: colors.primary, marginTop: 20 }]}>
                    No upcoming trips
                </Text>

                <Text style={[textStyles.greyNormal16, { marginTop: 20 }]}>
                    When you book a trip, You'll see
                </Text>
                <Text style={[textStyles.greyNormal16,]}>
                    your initnerary here
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('BookingDetails')} style={styles.buttonStyle}>
                    <Text style={styles.bigButtonTextStyle}>
                        BOOK A TICKET
                    </Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

export default MyTrips

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.silver,
        // paddingTop: getStatusBarHeight(),


    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        paddingBottom: 15,
        paddingTop: getStatusBarHeight() + 15

    },
    noTripsContainer: {
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    noTripsLogo: {
        width: 320,
        height: 320,

    },
    buttonStyle: {
        width: '70%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        marginTop: 40
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.white,
        letterSpacing: 2
    },
})
