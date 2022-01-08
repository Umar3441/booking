import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils';
import { useNavigation } from '@react-navigation/native'







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
            <View style={{ backgroundColor: colors.white, width: '100%', padding: 20, borderWidth: 0, marginTop: 15, marginBottom: index === bookings.length - 1 ? 70 : 0 }}>
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
                />
            </View>
        </View>
    )
}

export default MyBooking

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
})
