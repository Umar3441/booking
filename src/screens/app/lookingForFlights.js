import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from "react-native-animated-progress";
import { textStyles, images, colors, tokens } from '../../utils';
import axios from 'axios';



const LookingForFlights = ({ route }) => {

    const navigation = useNavigation();
    const [flightOffers, setflightOffers] = useState(null)

    const offerRequiredData = route.params




    const data = {
        "data": {
            "slices": [
                {
                    "origin": offerRequiredData.departureCityCode,
                    "destination": offerRequiredData.arrivalCityCode,
                    "departure_date": offerRequiredData.departureDate
                }
            ],
            "passengers": [
                {
                    "given_name": offerRequiredData.fullName,
                    "type": "adult"
                }
            ],
            "cabin_class": "economy"
        }

    }
    const requestConfig = {
        headers: {
            'Accept-Encoding': 'gzip',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Duffel-Version': 'beta',
            "Authorization": "Bearer " + tokens.duffelTest
        }
    }


    const searchFlights = async () => {
        try {
            const offers = await axios.post('https://api.duffel.com/air/offer_requests', data, requestConfig)

            console.log(offers.data.data.offers[0].slices[0])

            let finalOffers = []

            offers.data.data.offers.forEach(offer => {
                offer.slices.forEach(slice => {
                    slice.segments.forEach(segment => {
                        finalOffers.push({ ...segment, base_amount: offer.base_amount, total_amount: offer.total_amount, base_currency: offer.base_currency, tax_amount: offer.tax_amount })
                    });
                });
            });

            console.log(finalOffers[0].id)

            navigation.navigate('FlightList', { selectedDate: offerRequiredData.departureDate, flightOffers: finalOffers });


        } catch (error) {
            console.log(error)
        }

    }

    styles
    useEffect(() => {
        searchFlights()
    })



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.white} translucent barStyle='dark-content' />


            <View style={styles.noTripsContainer}>
                <Image source={images.lookingForFlightsLogo} style={styles.noTripsLogo} />
                <Text style={[textStyles.bigBoldBlack, { fontSize: 22, alignSelf: 'center', color: colors.primary, marginTop: 50 }]}>
                    Looking for tickets
                </Text>

                <Text style={[textStyles.greyNormal16, { marginTop: 20, alignSelf: 'center' }]}>
                    The prices shows are final,
                </Text>
                <Text style={[textStyles.greyNormal16, { marginTop: 4, alignSelf: 'center' }]}>
                    You will not find commissions and
                </Text>
                <Text style={[textStyles.greyNormal16, { marginTop: 4, alignSelf: 'center' }]}>
                    hidden payments
                </Text>

                <View style={{ width: '60%', alignSelf: 'center', marginTop: 20 }}>
                    <ProgressBar
                        indeterminate
                        height={7}
                        backgroundColor={colors.primary}
                        animated={true}
                        trackColor={colors.silver}

                    />
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonStyle}>
                    <Text style={styles.bigButtonTextStyle}>
                        CANCEL
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default LookingForFlights

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // paddingTop: getStatusBarHeight(),


    },

    noTripsContainer: {
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 90

    },
    noTripsLogo: {
        width: 250,
        height: 250,
        alignSelf: 'center',

    },
    buttonStyle: {


        alignSelf: 'center',
        marginTop: 30
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.grey,

    },
})
