import React, { useState, useRef } from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CustomTextInput from '../../components/customTextInput'
import { colors, textStyles, tokens } from '../../utils';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'




const PaymentDetails = ({ route }) => {

    const navigation = useNavigation();
    const offer = route.params;
    console.log(offer.offer.offerId)

    const [cardNumber, setcardNumber] = useState('')
    const [expiryDate, setexpiryDate] = useState('')
    const [cvv, setcvv] = useState('')
    const [cardNumberError, setcardNumberError] = useState('')
    const [expiryDateError, setexpiryDateError] = useState('')
    const [cvvError, setcvvError] = useState('')



    const data = {
        "data": {
            "selected_offers": offer.offer.offerId,
            "payments": [
                {
                    "type": "balance",
                    "currency": "USD",
                    "amount": offer.offer.total_amount
                }
            ],
            "passengers": [
                {
                    "phone_number": "+44 2080160508",
                    "email": "amelia@example.com",
                    "born_on": "1897-07-24",
                    "title": "ms",
                    "gender": "f",
                    "family_name": "Earhart",
                    "given_name": "Amelia",

                }
            ],
            "type": "instant"
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


    const generateQRcode = async () => {
        let globalError = false;

        if (!cardNumber) {
            setcardNumberError('required')
            globalError = true
        }
        if (!expiryDateError) {
            setexpiryDateError('required')
            globalError = true
        }
        if (!cvvError) {
            setcvvError('required')
            globalError = true
        }

        if (!globalError) {
            // const order = await axios.post('https://api.duffel.com/air/orders', requestData, requestConfig)

            // console.log(order)


            console.log(offer.passengerData.passportNumber)
            console.log(offer.offer.offerId)

            navigation.navigate('QRcode', {
                fullname: offer.passengerData.fullName,
                date: offer.passengerData.selectedDate,
                offerId: offer.offer.offerId,
                passportNumber: offer.passengerData.passportNumber,
                phoneNumber: offer.passengerData.phoneNumber
            })
        } else {
            return
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 10, left: 5 }} name="close" size={25} />
            <KeyboardAwareScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <Text style={textStyles.bigBoldBlack}>Payment Details</Text>

                <View style={{ marginVertical: 10 }}>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 0 }]}>
                        Please Fill Payment Details!
                    </Text>

                </View>


                <View>
                    <CustomTextInput
                        title='Card Number'
                        error={cardNumberError}
                        value={cardNumber}
                        onChangeText={(text) => setcardNumber(text)}
                        placeholder="Card Number"
                        keyboardType='numeric'
                    />
                    <CustomTextInput
                        title='Expiry Date'
                        value={expiryDate}
                        expiryDateError={expiryDateError}
                        onChangeText={(text) => setexpiryDate(text)}
                        placeholder="dd / mm"
                        keyboardType='numeric'
                    />
                    <CustomTextInput
                        title='CVV'
                        value={cvv}
                        onChangeText={(text) => setcvv(text)}
                        placeholder="CVV"
                        cvvError={cvvError}
                        keyboardType='numeric'
                    />
                </View>






            </KeyboardAwareScrollView>
            <TouchableOpacity onPress={() => generateQRcode()} style={styles.buttonStyle}>
                <Text style={styles.bigButtonTextStyle}>
                    Generate the QR
                </Text>
            </TouchableOpacity>

        </View>
    )
}




export default PaymentDetails

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        position: 'absolute',
        // top: Dimensions.get('screen').height - 200
        bottom: 40,
        alignSelf: 'center',
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.white,
        letterSpacing: 1
    },
    modalViewContainer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 30,
        overflow: 'hidden',
        paddingHorizontal: 10,
        marginTop: getStatusBarHeight(),
    },
    modalStyles: {
        width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        flex: 1,
        // backgroundColor: colors.grey,
        alignSelf: 'center',
        marginVertical: 0,
        // paddingHorizontal: 10,
        // paddingTop: getStatusBarHeight(),
        // paddingBottom: 10

    },
    searchBoxContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.white,
        alignSelf: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 20,
        paddingHorizontal: 5,
        backgroundColor: 'transparent'
    }

})
