import React, { useState, useRef } from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import CustomTextInput from '../../components/customTextInput';
import { colors, textStyles } from '../../utils';
import PhoneInput from "react-native-phone-number-input";

import CheckBox from 'react-native-check-box'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";
import { airports, initialAirports } from '../../utils'

function ValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const BookingDetails = ({ route }) => {

    const navigation = useNavigation()
    const departureDate = route.params.selectedDate.toISOString().split('T')[0]


    /////////////Full Name states ////////////////
    const [fullName, setFullName] = useState(null)
    const [fullNameError, setFullNameError] = useState(null)
    const [fullNameBorderColor, setFullNameBorderColor] = useState(colors.lightGrey)
    /////////////Phone Number Input States////////////////

    const phoneNumberRef = useRef(null)
    const [phoneNumber, setphoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState(null)
    const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState(colors.lightGrey)

    /////////////Passport number states ////////////////
    const [passportNumber, setPassportNumber] = useState(null)
    const [passportNumberError, setPassportNumberError] = useState(null)
    const [passportNumberBorderColor, setPassportNumberBorderColor] = useState(colors.lightGrey)


    /////////////Driving license states ////////////////
    const [drivingLicense, setdrivingLicense] = useState(null)
    const [drivingLicenseError, setdrivingLicenseError] = useState(null)
    const [drivingLicenseBorderColor, setdrivingLicenseBorderColor] = useState(colors.lightGrey)


    /////////////Departure City states ////////////////
    const [departureCity, setdepartureCity] = useState(null)
    const [departureCityError, setdepartureCityError] = useState(null)
    const [departureCityBorderColor, setdepartureCityBorderColor] = useState(colors.lightGrey)
    const [departureCityCode, setdepartureCityCode] = useState(null)

    /////////////Arrival City states ////////////////
    const [arrivalCity, setarrivalCity] = useState(null)
    const [arrivalCityError, setarrivalCityError] = useState(null)
    const [arrivalCityBorderColor, setarrivalCityBorderColor] = useState(colors.lightGrey)
    const [arrivalCityCode, setarrivalCityCode] = useState(null)


    ///////Airport Modal States ////////
    const [airportModalVisibility, setAirportModalVisibility] = useState(false)
    const [visibleAirports, setvisibleAirports] = useState(initialAirports)
    const [searchText, setsearchText] = useState('')
    const [depModal, setdepModal] = useState(false)
    const [arrivModal, setarrivModal] = useState(false)



    const proceedToTicketFunction = () => {
        let globalError = false;

        if (!fullName) {
            setFullNameError('Required')
            globalError = true
        }
        if (!passportNumber) {
            setPassportNumberError('Required')
            globalError = true
        }
        // if (!drivingLicense) {
        //     setdrivingLicenseError('Required')
        //     globalError = true
        // }
        if (!departureCity) {
            setdepartureCityError('Required')
            globalError = true
        }

        if (!arrivalCity) {
            setarrivalCityError('Required')
            globalError = true
        }
        if (!phoneNumber) {
            setPhoneNumberError('Required')
            globalError = true
        }

        if (!globalError) {

            navigation.navigate('LookingForFlights', data = {
                fullName,
                passportNumber,
                departureCity,
                departureCityCode,
                arrivalCity,
                arrivalCityCode,
                phoneNumber,
                // drivingLicense,
                departureDate,

            })

        } else {
            return
        }



    }


    const SearchItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                if (depModal) {
                    setdepartureCity(item.city)
                    setdepartureCityCode(item.iata_code)
                }
                if (arrivModal) {
                    setarrivalCity(item.city)
                    setarrivalCityCode(item.iata_code)
                }
                setdepModal(false)
                setarrivModal(false)
                setAirportModalVisibility(false)
            }} style={{ width: '100%', paddingVertical: 10 }}>
                <Text style={{ fontSize: 15, marginTop: 5 }}>
                    {item.city}
                </Text>
                <Text style={{ marginLeft: 5, marginVertical: 5, fontSize: 14, color: colors.grey }}>
                    {item.country}
                </Text>

            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 10, left: 5 }} name="arrowleft" size={25} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                <Text style={textStyles.bigBoldBlack}>Booking Details</Text>

                <View style={{ marginVertical: 10 }}>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 0 }]}>
                        Please Provide all the mentioned details
                    </Text>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 0 }]}>
                        here !
                    </Text>
                </View>

                <CustomTextInput
                    title='Full Name'
                    placeHolder='Enter Full Name'
                    borderColor={fullNameBorderColor}
                    error={fullNameError}
                    onChangeText={(text) => setFullName(text)}
                    onFocus={() => {
                        setFullNameError(null)
                        setFullNameBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setFullNameBorderColor(colors.lightGrey)
                        if (!fullName) {
                            setFullNameError('Required')
                        }
                    }}

                />


                <CustomTextInput
                    title='Passport Number'
                    placeHolder='Enter Passport Number'
                    borderColor={passportNumberBorderColor}
                    error={passportNumberError}
                    onChangeText={(text) => setPassportNumber(text)}
                    onFocus={() => {
                        setPassportNumberError(null)
                        setPassportNumberBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setPassportNumberBorderColor(colors.lightGrey)
                        if (!fullName) {
                            setPassportNumberError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <MaterialCommunityIcons name='credit-card-scan-outline' size={20} color={passportNumberBorderColor} onPress={() => console.log('scan')} />}
                />


                {/* <CustomTextInput
                    title='Driving License'
                    placeHolder='Enter Driving License'
                    borderColor={drivingLicenseBorderColor}
                    error={drivingLicenseError}
                    onChangeText={(text) => setdrivingLicense(text)}
                    onFocus={() => {
                        setdrivingLicenseError(null)
                        setdrivingLicenseBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setdrivingLicenseBorderColor(colors.lightGrey)
                        if (!fullName) {
                            setdrivingLicenseError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <FontAwesome name='drivers-license-o' size={20} color={drivingLicenseBorderColor} onPress={() => console.log('scan')} />}
                /> */}

                <CustomTextInput
                    title='Departure'
                    editable={false}
                    value={departureCity}
                    placeHolder='Select Departure'
                    borderColor={departureCityBorderColor}
                    error={departureCityError}
                    onChangeText={(text) => setdepartureCity(text)}
                    onFocus={() => {
                        setdepartureCityError(null)
                        setdepartureCityBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setdepartureCityBorderColor(colors.lightGrey)
                        if (!fullName) {
                            setdepartureCityError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => {
                        setdepModal(true)
                        setAirportModalVisibility(true)
                    }} />}
                />



                <CustomTextInput
                    title='Arrival'
                    editable={false}
                    value={arrivalCity}
                    placeHolder='Select Arrival'
                    borderColor={arrivalCityBorderColor}
                    error={arrivalCityError}
                    onChangeText={(text) => setarrivalCity(text)}
                    onFocus={() => {
                        setarrivalCityError(null)
                        setarrivalCityBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setarrivalCityBorderColor(colors.lightGrey)
                        if (!fullName) {
                            setarrivalCityError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => {
                        setarrivModal(true)
                        setAirportModalVisibility(true)
                    }} />}
                />



                <View style={{ marginTop: 10 }}>
                    <Text style={textStyles.blackMedium16}>Phone Number</Text>
                    <PhoneInput
                        ref={phoneNumberRef}
                        defaultValue={phoneNumber}
                        defaultCode="DM"
                        layout="first"

                        textInputProps={
                            {
                                onFocus: () => {
                                    setPhoneNumberError(null)
                                    setPhoneNumberBorderColor(colors.primary)
                                },
                                onBlur: () => {

                                    setPhoneNumberBorderColor(colors.lightGrey)
                                    if (!phoneNumber) {
                                        setPhoneNumberError('Required')
                                    }
                                }
                            }}

                        onChangeFormattedText={(text) => {
                            setphoneNumber(text)
                        }}
                        layout='second'
                        countryPickerButtonStyle={
                            {
                                backgroundColor: colors.silver,
                                borderRadius: 10,
                                marginRight: 5
                            }
                        }
                        textContainerStyle={
                            {
                                backgroundColor: colors.white,
                                borderColor: phoneNumberBorderColor,
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingVertical: Platform.OS === 'ios' ? 20 : 5

                            }
                        }
                        containerStyle={
                            {
                                width: '100%',
                                marginTop: 5,
                            }
                        }
                    />

                    {phoneNumberError ? <Text style={{ color: 'red', marginLeft: '30%' }}>
                        {phoneNumberError}
                    </Text> : null}

                </View>







                <TouchableOpacity onPress={() => proceedToTicketFunction()} style={[styles.buttonStyle, { marginBottom: 50 }]}>
                    <Text style={styles.bigButtonTextStyle}>
                        Proceed to Tickets
                    </Text>
                </TouchableOpacity>


            </KeyboardAwareScrollView>

            <Modal
                visible={airportModalVisibility}
                style={styles.modalStyles}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                hasBackdrop={true}
                backgroundColor={colors.lightGrey}
                coverScreen={true}
            // swipeDirection='down'
            // onSwipeComplete={() => setAirportModalVisibility(false)}
            >
                <View style={styles.modalViewContainer}>
                    <View style={styles.searchBoxContainer}>
                        <TextInput style={{ width: '85%', height: 40, }}
                            value={searchText}
                            onChangeText={(text) => {
                                setsearchText(text)
                                if (text) {
                                    const tempAirports = airports.filter(airport => airport.city.includes(text))
                                    setvisibleAirports(tempAirports)
                                } else {
                                    setvisibleAirports(initialAirports)
                                }
                            }}

                        />
                        <AntDesign name='closecircleo' color={colors.primary} size={35} onPress={() => setAirportModalVisibility(false)} />
                    </View>
                    <FlatList
                        data={visibleAirports}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.objectID}
                        ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: colors.lightGrey }} />}
                        renderItem={({ item }) => <SearchItem item={item} />}
                    />

                </View>
            </Modal>
        </View >
    )
}




export default BookingDetails

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
        marginTop: 10
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
