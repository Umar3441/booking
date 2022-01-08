import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { colors } from '../../utils'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const FlightList = ({ route }) => {

    const navigation = useNavigation()


    const data = route.params
    console.log("----->", data.flightOffers[0].id)
    console.log('++++++++++++++++', data.passengerData)

    //////////flights//////////
    // [
    //     { "aircraft": null, "arriving_at": "2022-01-10T11:20:00", "departing_at": "2022-01-10T07:25:00", "destination": { "airports": null, "city": { "city_name": null, "iata_city_code": "HEL", "iata_code": "HEL", "iata_country_code": "FI", "icao_code": null, "id": "cit_hel_fi", "latitude": null, "longitude": null, "name": "Helsinki", "time_zone": null, "type": "city" }, "city_name": "Helsinki", "iata_city_code": "HEL", "iata_code": "HEL", "iata_country_code": "FI", "icao_code": "EFHK", "id": "arp_hel_fi", "latitude": 60.31912, "longitude": 24.95808, "name": "Helsinki Airport", "time_zone": "Europe/Helsinki", "type": "airport" }, "destination_terminal": null, "distance": null, "duration": "PT2H55M", "id": "seg_0000AF0IkBMOohIUTjjN1Z", "marketing_carrier": { "iata_code": "AY", "id": "arl_00009VME7DC2bj9quHXKow", "name": "Finnair" }, "marketing_carrier_flight_number": "1582", "operating_carrier": { "iata_code": "N7", "id": "arl_00009v2Pz5jzTEQmgQOupc", "name": "Nordic Regional Airlines" }, "operating_carrier_flight_number": null, "origin": { "airports": null, "city": { "city_name": null, "iata_city_code": "PAR", "iata_code": "PAR", "iata_country_code": "FR", "icao_code": null, "id": "cit_par_fr", "latitude": null, "longitude": null, "name": "Paris", "time_zone": null, "type": "city" }, "city_name": "Paris", "iata_city_code": "PAR", "iata_code": "CDG", "iata_country_code": "FR", "icao_code": "LFPG", "id": "arp_cdg_fr", "latitude": 49.011244, "longitude": 2.548962, "name": "Paris Charles de Gaulle Airport", "time_zone": "Europe/Paris", "type": "airport" }, "origin_terminal": null, "passengers": [{ "baggages": [Array], "cabin_class": "economy", "cabin_class_marketing_name": "Economy", "fare_basis_code": "VNN0S9CZ", "passenger_id": "pas_0000AF0IjuvvtKcTX1E0YC" }] }
    // ]
    const [flights, setFlights] = useState(data.flightOffers)

    /////////date flatList////////

    const dateFlatlistRef = useRef(null)


    ///////////Date //////////////

    let dates

    var getDaysBetweenDates = function (startDate, endDate) {
        var now = startDate.clone(), dates = [];

        while (now.isSameOrBefore(endDate)) {
            dates.push(now.format('MM/DD/YYYY'));
            now.add(1, 'days');
        }
        return dates;
    };

    var startDate = moment(moment(data.selectedDate).subtract(2, 'days'));
    var endDate = moment(moment(data.selectedDate).add(30, 'days'));

    dates = getDaysBetweenDates(startDate, endDate);


    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes}m`;
    }

    const DateList = ({ item, index }) => {
        let date = moment(item).format('LLLL');
        let current = moment(moment(item).toISOString()).isSame(moment(data.selectedDate).toISOString(), 'day');
        return (
            <View style={[styles.dateView, { backgroundColor: current ? colors.primary : colors.silver }]}>
                <Text style={{ color: current ? colors.white : colors.grey, fontWeight: '500', marginBottom: 5 }}>{date.split(' ')[0].slice(0, 3)}</Text>
                <Text style={{ color: current ? colors.white : colors.grey, fontWeight: '500' }}>{date.split(',')[1].split(' ')[2]}</Text>
            </View>
        )
    }

    const FlightView = ({ item, index }) => {
        const arrivalTime = moment(item.arriving_at);
        const departureTime = moment(item.departing_at);

        const diff = arrivalTime.diff(departureTime, 'minutes');

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PaymentDetails', { passengerData: { ...data.passengerData, selectedDate: data.selectedDate }, offer: item })} style={{ backgroundColor: colors.white, width: '100%', padding: 20, borderWidth: 0, marginTop: 15, marginBottom: index === flights.length - 1 ? 70 : 0 }}>
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


            </TouchableOpacity>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.white} translucent barStyle='dark-content' />
            <View style={{ backgroundColor: colors.white }}>
                <View style={styles.header}>
                    <SimpleLineIcons onPress={() => navigation?.navigate('Profile')} name='menu' size={25} color={colors.black} />
                    <Text style={{ fontSize: 20, fontWeight: '300', color: colors.black }}>
                        {data.passengerData.departureCityCode} - {data.passengerData.arrivalCityCode}
                    </Text>
                    <Entypo name='dots-three-vertical' size={25} color={colors.black} />

                </View>
                <FlatList
                    // style={{
                    //     marginVertical: 10
                    // }}
                    ref={dateFlatlistRef}
                    data={dates}
                    keyExtractor={(item) => item}
                    horizontal
                    renderItem={
                        ({ item, index }) => (
                            <DateList item={item} index={index} />
                        )
                    }
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: colors.silver, paddingTop: 15, paddingHorizontal: 10 }}
                    data={flights}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => <FlightView item={item} index={index} />}
                />

            </View>

        </View>
    )
}

export default FlightList

const styles = StyleSheet.create({
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
    dateView: {
        backgroundColor: colors.silver,
        marginVertical: 10,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: "center",
        // paddingHorizontal: 13,
        // paddingVertical: 13,
        borderRadius: 10,
        width: 52,
        height: 65,

    }
})
