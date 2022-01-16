import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors, textStyles } from '../../utils'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import CustomTextInput from '../../components/customTextInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';


const MyInformation4 = ({ navigation, route }) => {


    let data = route.params
    console.log(data)

    /////////////Full Name states ////////////////
    const [cprNumber, setcprNumber] = useState(data.cprNumber)
    const [cprNumberError, setcprNumberError] = useState(null)
    const [cprNumberBorderColor, setcprNumberBorderColor] = useState(colors.lightGrey)


    /////////////CPR number states ////////////////
    const [passportNumber, setpassportNumber] = useState(data.passportNumber)
    const [passportNumberError, setpassportNumberError] = useState(null)
    const [passportNumberBorderColor, setpassportNumberBorderColor] = useState(colors.lightGrey)

    /////////////issue date states ////////////////
    const [drivingLicenseNumber, setdrivingLicenseNumber] = useState(null)
    const [drivingLicenseNumberError, setdrivingLicenseNumberError] = useState(null)
    const [drivingLicenseNumberBorderColor, setdrivingLicenseNumberBorderColor] = useState(colors.lightGrey)


    /////////////expiry date states ////////////////
    const [creditCardNumber, setcreditCardNumber] = useState(null)
    const [creditCardNumberError, setcreditCardNumberError] = useState(null)
    const [creditCardNumberBorderColor, setcreditCardNumberBorderColor] = useState(colors.lightGrey)




    /////////////faceAuthentication states/////////

    const [passportPhoto, setpassportPhoto] = useState(null)
    const [passportPhotoError, setpassportPhotoError] = useState(null)
    const [cameraOrGalleryModal, setcameraOrGalleryModal] = useState(false)

    /////////////loading /////////

    const [loading, setloading] = useState(false)


    const generateQRcode = async () => {
        let globalError = false;
        if (!cprNumber) {
            setcprNumberError('Required')
            globalError = true
        }
        if (!passportNumber) {
            setpassportNumberError('Required')
            globalError = true
        }
        if (!drivingLicenseNumber) {
            setdrivingLicenseNumberError('Required')
            globalError = true
        }
        if (!creditCardNumber) {
            setcreditCardNumberError('Requied')
            globalError = true
        }



        if (!globalError) {
            setloading(true)
            const images = []
            images.push(data.passportPhoto)
            images.push(data.drivingLicensePhoto)
            images.push(data.faceImage)
            for (let index = 0; index < images.length; index++) {

                try {
                    const reference = storage().ref(`images/${uuidv4()}`);
                    const task = reference.putFile(images[index]);
                    task.on('state_changed', taskSnapshot => {
                        // console.log((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
                    });

                    task.then(
                        async () => {
                            const url = await reference.getDownloadURL().catch((error) => { console.log('---', error) });
                            console.log('hello')
                            if (index === 0) {
                                data = { ...data, passportPhoto: url }
                            }
                            if (index === 1) {
                                data = { ...data, drivingLicensePhoto: url }
                            }
                            if (index === 2) {
                                finalData = { ...data, faceImage: url }
                                setloading(false)
                                navigation.navigate('GenearetInfoQRcode', data = { ...finalData, passportNumber, drivingLicenseNumber, creditCardNumber })
                            }
                        }
                    ).catch(
                        error => console.log(error)
                    )





                } catch (error) {
                    console.log('err', error)
                }
            }




        } else {
            return
        }


    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 10, left: 5 }} name="arrowleft" size={25} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                <Text style={textStyles.bigBoldBlack}>My Information</Text>

                <View style={{ marginVertical: 10 }}>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 0 }]}>
                        Please Provide all the mentioned details
                    </Text>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 0 }]}>
                        here !
                    </Text>
                </View>


                <CustomTextInput
                    value={passportNumber}
                    title='Passport Information'
                    placeHolder='Enter Passport Number'
                    borderColor={passportNumberBorderColor}
                    error={passportNumberError}
                    onChangeText={(text) => setpassportNumber(text)}
                    onFocus={() => {
                        setpassportNumberError(null)
                        setpassportNumberBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setpassportNumberBorderColor(colors.lightGrey)
                        if (!passportNumber) {
                            setpassportNumberError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <MaterialCommunityIcons name='credit-card-scan-outline' size={20} color={passportNumberBorderColor} onPress={() => console.log('scan')} />}
                />

                <CustomTextInput
                    value={cprNumber}
                    title='CPR Information'
                    placeHolder='CPR Number'
                    borderColor={cprNumberBorderColor}
                    error={cprNumberError}
                    onChangeText={(text) => setcprNumber(text)}
                    onFocus={() => {
                        setcprNumberError(null)
                        setcprNumberBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setcprNumberBorderColor(colors.lightGrey)
                        if (!cprNumber) {
                            setcprNumberError('Required')
                        }
                    }}

                />




                <CustomTextInput
                    value={drivingLicenseNumber}
                    title='Driving License Information'
                    placeHolder='Driving License'
                    borderColor={drivingLicenseNumberBorderColor}
                    error={drivingLicenseNumberError}
                    onChangeText={(text) => setdrivingLicenseNumber(text)}
                    onFocus={() => {
                        setdrivingLicenseNumberError(null)
                        setdrivingLicenseNumberBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setdrivingLicenseNumberBorderColor(colors.lightGrey)
                        if (!drivingLicenseNumber) {
                            setdrivingLicenseNumberError('Required')
                        }
                    }}
                    keyboardType='numeric'


                />



                <CustomTextInput
                    value={creditCardNumber}
                    title='Credit Card Number'
                    placeHolder='Enter Credit Card Number'
                    borderColor={creditCardNumberBorderColor}
                    error={creditCardNumberError}
                    onChangeText={(text) => setcreditCardNumber(text)}
                    onFocus={() => {
                        setcreditCardNumberError(null)
                        setcreditCardNumberBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setcreditCardNumberBorderColor(colors.lightGrey)
                        if (!creditCardNumber) {
                            setcreditCardNumberError('Required')
                        }
                    }}
                    keyboardType='numeric'


                />



                <TouchableOpacity onPress={() => generateQRcode()} style={[styles.buttonStyle, { marginBottom: 50 }]}>
                    <Text style={styles.bigButtonTextStyle}>
                        Generate QRcode
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            {loading ? <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', left: 0, right: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={colors.white} size="large" />
            </View> : null}

        </View >
    )
}

export default MyInformation4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: getStatusBarHeight(),
        paddingHorizontal: 10
    },
    faceAuthenticationStyle: {
        // borderWidth: 1,
        height: 250,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginVertical: 10
    },
    buttonStyle: {
        width: '100%',
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
        letterSpacing: 1
    },
    buttonBox:
    {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    optionText:
    {
        fontWeight: '600',
        color: colors.grey,
        marginTop: 5
    }
})
