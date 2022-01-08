import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils';
import { useNavigation } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg';

const MyBookingDetails = ({ route }) => {

    const navigation = useNavigation()
    const data = route.params

    console.log(data)
    const item = data.dataItem.offer

    const arrivalTime = moment(item.arriving_at);
    const departureTime = moment(item.departing_at);

    const diff = arrivalTime.diff(departureTime, 'minutes');

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes}minutes`;
    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <View style={styles.header}>
                <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={25} color={colors.black} />
                <Text style={{ fontSize: 20, fontWeight: '300', color: colors.black }}>
                    My Booking Details
                </Text>

                <Entypo onPress={() => {
                    auth().signOut().then(
                        // () => { navigation.replace('Auth') }
                    )

                }} name='dots-three-vertical' size={25} color={colors.black} />
            </View>

            <View style={{ width: '100%', padding: 10 }}>
                {data.email ? <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Ionicons name="person-circle-sharp" size={70} />
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{data.dataItem.fullName}</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{data.email}</Text>
                    </View>
                </View> : null}

                <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Passport Number</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{data.dataItem.passportNumber}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Phone Number</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{data.dataItem.phoneNumber}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Driving License</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{data.dataItem.drivingLicense}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Credit Card Number</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{data.dataItem.creditCardNumber}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 30, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Ticket Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, color: colors.grey }}>{moment(item.departing_at).format("h:mm a")}</Text>
                            <Entypo name='aircraft-take-off' size={20} color={colors.primary} style={{ position: 'absolute', top: -10, left: 105 }} />
                            <Text style={{ color: colors.lightGrey, fontWeight: '700' }}>  -------------  </Text>
                            <Text style={{ fontSize: 16, color: colors.grey }}>{moment(item.arriving_at).format("h:mm a")}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Duration</Text>
                        <Text style={{ color: colors.grey, marginTop: 10 }}>{timeConvert(diff)}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Comany</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{item.operating_carrier.name}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Price</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>${item.total_amount}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Day</Text>
                        <Text style={{ color: colors.grey, marginTop: 5 }}>{moment(item.departing_at).format("dddd")}</Text>
                    </View>
                </View>

            </View>

            <View style={{ width: 300, height: 300, marginTop: 20, alignSelf: 'center' }}>
                <QRCode
                    value={data.dataItem.qrcodeValue}
                    size={300}

                />
            </View>

        </View>
    )
}

export default MyBookingDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.silver
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
