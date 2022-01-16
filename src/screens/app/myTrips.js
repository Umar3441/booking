import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import auth from '@react-native-firebase/auth'
import { useSelector } from 'react-redux';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'


import { textStyles, images, colors } from '../../utils';

const MyTrips = () => {

    const userInfo = useSelector(state => state.userReducer.user)
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setInitializing(false)
        }, 1000);
    }, [])


    if (initializing)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.silver }}>
                <ActivityIndicator color={colors.primary} size='large' />
            </View>
        )

    if (userInfo?.bookings) {
        return (
            <MyBooking />
        )
    } else {
        return (
            <NoUpcomingTrips />
        )
    }
}

const MyBooking = () => {


    const navigation = useNavigation()

    const userInfo = useSelector(state => state.userReducer.user)
    const [bookings, setBookings] = useState(userInfo?.bookings)
    // console.log(bookings)



    useEffect(() => {
        setBookings(userInfo?.bookings)
    }, [userInfo])





    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes}m`;
    }

    const FlightView = ({ dataItem, index }) => {

        const item = dataItem.offer

        const arrivalTime = moment(item.arriving_at);
        const departureTime = moment(item.departing_at);

        const diff = arrivalTime.diff(departureTime, 'minutes');

        return (
            <View style={{ backgroundColor: colors.white, width: '100%', padding: 20, borderWidth: 0, marginTop: 15, }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{moment(item.departing_at).format("h:mm a")}</Text>
                        <Entypo name='aircraft-take-off' size={25} color={colors.primary} style={{ position: 'absolute', top: -10, left: 105 }} />
                        <Text style={{ color: colors.lightGrey, fontWeight: '700' }}>  -------------  </Text>
                        <Text style={{ fontSize: 18 }}>{moment(item.arriving_at).format("h:mm a")}</Text>
                    </View>
                    <Text style={{ fontSize: 18 }}>${item.total_amount}</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>

                    <Text style={{ fontSize: 14, color: colors.grey }}>{item.origin.iata_city_code},{moment(item.departing_at).format("ddd")}</Text>
                    <Text style={{ color: colors.lightGrey, fontWeight: '700' }}>                               </Text>
                    <Text style={{ fontSize: 14, color: colors.grey }}>{item.destination.iata_city_code},{moment(item.arriving_at).format("ddd")}</Text>


                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                    <Ionicons name='md-timer-outline' size={22} />
                    <Text style={{ color: colors.grey, }}> Duration :</Text>
                    <Text style={{ fontSize: 14 }}>{timeConvert(diff)}</Text>
                    <Text style={{ color: colors.grey, }}>  |  Non-stop</Text>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>


                    <Text style={{}}>{item.operating_carrier.name}</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('MyBookingDetails', { dataItem, email: userInfo.email })} style={{ alignSelf: 'center', marginTop: 10, backgroundColor: colors.primary, padding: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 15, color: colors.white, fontWeight: '500' }}>View Details</Text>
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <View style={styles.header}>
                <SimpleLineIcons onPress={() => navigation?.navigate('Profile')} name='menu' size={25} color={colors.black} />
                <Text style={{ fontSize: 20, fontWeight: '300', color: colors.black }}>
                    My Bookings
                </Text>

                <Entypo onPress={() => {
                    auth().signOut().then(
                        // () => { navigation.replace('Auth') }
                    )
                }} name='dots-three-vertical' size={25} color={colors.black} />
            </View>
            <View style={{ flex: 1, }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: colors.silver, paddingTop: 15, paddingHorizontal: 10 }}
                    data={bookings}
                    // keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => <FlightView dataItem={item} index={index} />}
                    ListFooterComponentStyle={
                        {
                            marginBottom: 70

                        }
                    }
                    ListFooterComponent={() => {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 0, marginBottom: 50 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('DateSelector')} style={styles.buttonStyle}>
                                    <Text style={[styles.bigButtonTextStyle, { marginTop: 0 }]}>
                                        BOOK A TICKET
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )

                    }}
                />
            </View>
        </View >
    )
}

const NoUpcomingTrips = () => {


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
                        // () => { navigation.replace('Auth') }
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

                <TouchableOpacity onPress={() => navigation.navigate('DateSelector')} style={styles.buttonStyle}>
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
