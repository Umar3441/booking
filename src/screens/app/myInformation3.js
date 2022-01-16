import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors, textStyles } from '../../utils'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import CustomTextInput from '../../components/customTextInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import DatePicker from 'react-native-date-picker'


const MyInformation3 = ({ navigation, route }) => {


    let data = route.params

    /////////////Full Name states ////////////////
    const [nationality, setNationality] = useState(data.nationality)
    const [nationalityError, setNationalityError] = useState(null)
    const [nationalityBorderColor, setNationalityBorderColor] = useState(colors.lightGrey)


    /////////////CPR number states ////////////////
    const [passportNumber, setpassportNumber] = useState(data.passportNumber)
    const [passportNumberError, setpassportNumberError] = useState(null)
    const [passportNumberBorderColor, setpassportNumberBorderColor] = useState(colors.lightGrey)

    /////////////issue date states ////////////////
    const [passportIssueDate, setpassportIssueDate] = useState(new Date)
    const [passportIssueDateError, setpassportIssueDateError] = useState(null)
    const [passportIssueDateBorderColor, setpassportIssueDateBorderColor] = useState(colors.lightGrey)
    const [passportIssueDatePickerOpen, setpassportIssueDatePickerOpen] = useState(false)

    /////////////expiry date states ////////////////
    const [passportExpiryDate, setpassportExpiryDate] = useState(new Date())
    const [passportExpiryDateError, setpassportExpiryDateError] = useState(null)
    const [passportExpiryDateBorderColor, setpassportExpiryDateBorderColor] = useState(colors.lightGrey)
    const [passportExpiryDatePickerOpen, setpassportExpiryDatePickerOpen] = useState(false)




    /////////////faceAuthentication states/////////

    const [passportPhoto, setpassportPhoto] = useState(null)
    const [passportPhotoError, setpassportPhotoError] = useState(null)
    const [cameraOrGalleryModal, setcameraOrGalleryModal] = useState(false)


    function selectDriviLicensePhoto(mode) {


        launchImageLibrary({
            mediaType: 'photo',
        }, (data) => {
            if (data.assets) {
                setpassportPhoto(data?.assets[0]?.uri)
            }
        })

        // if (mode === 'camera') {

        //     launchCamera({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setpassportPhoto(data?.assets[0]?.uri)
        //         }
        //     })
        // } else {
        //     launchImageLibrary({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setpassportPhoto(data?.assets[0]?.uri)
        //         }
        //     })
        // }



    }


    const goToInfo3 = () => {

        let globalError = false;

        if (!nationality) {
            setNationalityError('Required')
            globalError = true
        }
        if (!passportNumber) {
            setpassportNumberError('Required')
            globalError = true
        }
        if (!passportIssueDate) {
            setpassportIssueDateError('Required')
            globalError = true
        }
        if (!passportExpiryDate) {
            setpassportExpiryDateError('Requied')
            globalError = true
        }
        if (!passportPhoto) {
            setpassportPhotoError('Required')
            globalError = true
        }


        if (!globalError) {
            navigation.navigate('MyInformation4', data = { ...data, passportNumber, passportIssueDate, passportExpiryDate, passportPhoto })
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
                    editable={false}
                    value={nationality}
                    title='Nationality'
                    placeHolder='Nationality'
                    borderColor={nationalityBorderColor}
                    error={nationalityError}
                    onChangeText={(text) => setNationality(text)}
                    onFocus={() => {
                        setNationalityError(null)
                        setNationalityBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setNationalityBorderColor(colors.lightGrey)
                        if (!nationality) {
                            setNationalityError('Required')
                        }
                    }}

                />


                <CustomTextInput
                    value={passportNumber}
                    title='Passport Number'
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
                    value={moment(passportIssueDate).format('LL')}
                    title='Issue Date'
                    placeHolder='Enter Issue Date'
                    borderColor={passportIssueDateBorderColor}
                    error={passportIssueDateError}
                    onChangeText={(text) => setpassportIssueDate(text)}
                    onFocus={() => {
                        setpassportIssueDateError(null)
                        setpassportIssueDateBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setpassportIssueDateBorderColor(colors.lightGrey)
                        if (!passportIssueDate) {
                            setpassportIssueDateError('Required')
                        }
                    }}
                    keyboardType='numeric'
                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => setpassportIssueDatePickerOpen(true)} />}

                />



                <CustomTextInput
                    value={moment(passportExpiryDate).format('LL')}
                    title='Expiry Date'
                    placeHolder='Enter Expiry Date'
                    borderColor={passportExpiryDateBorderColor}
                    error={passportExpiryDateError}
                    onChangeText={(text) => setpassportExpiryDate(text)}
                    onFocus={() => {
                        setpassportExpiryDateError(null)
                        setpassportExpiryDateBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setpassportExpiryDateBorderColor(colors.lightGrey)
                        if (!passportExpiryDate) {
                            setpassportExpiryDateError('Required')
                        }
                    }}
                    keyboardType='numeric'
                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => setpassportExpiryDatePickerOpen(true)} />}

                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={textStyles.blackMedium16}>
                        Passport Scan
                    </Text>

                    <View
                        style={styles.faceAuthenticationStyle}
                        onPress={() => {
                            selectFaceAuthPhoto()
                            // setcameraOrGalleryModal(true)
                        }}
                    >
                        {
                            passportPhoto ?
                                <Image source={{ uri: passportPhoto }} style={{ width: '100%', height: '100%', overflow: 'hidden' }} resizeMode='cover' />
                                : <AntDesign onPress={() => selectDriviLicensePhoto()} name='scan1' size={150} color={colors.primary} />
                        }
                    </View>

                    <Text style={{ color: 'red' }}>
                        {passportPhotoError}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => goToInfo3()} style={[styles.buttonStyle, { marginBottom: 50 }]}>
                    <Text style={styles.bigButtonTextStyle}>
                        Continue
                    </Text>
                </TouchableOpacity>


                <DatePicker
                    modal
                    open={passportIssueDatePickerOpen}
                    date={passportIssueDate}
                    onConfirm={(date) => {
                        setpassportIssueDatePickerOpen(false)

                        setpassportIssueDate(date)
                    }}
                    onCancel={() => {
                        setpassportIssueDatePickerOpen(false)
                    }}
                />


                <DatePicker
                    modal
                    open={passportExpiryDatePickerOpen}
                    date={passportExpiryDate}
                    onConfirm={(date) => {
                        setpassportExpiryDatePickerOpen(false)
                        setpassportExpiryDate(date)
                    }}
                    onCancel={() => {
                        setpassportExpiryDatePickerOpen(false)
                    }}
                />




            </KeyboardAwareScrollView>


            <Modal
                visible={cameraOrGalleryModal}
                style={
                    {
                        position: 'absolute',
                        top: -50,
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height + 60,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        alignSelf: 'center',
                    }
                }

            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => {
                            selectFaceAuthPhoto('camera')
                            setcameraOrGalleryModal(false)

                        }} style={styles.buttonBox}>
                            <MaterialCommunityIcons name='camera' size={60} color={colors.primary} />
                            <Text style={styles.optionText}>Camera</Text>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => {
                            selectFaceAuthPhoto('gallery')
                            setcameraOrGalleryModal(false)

                        }} style={styles.buttonBox}>
                            <MaterialCommunityIcons name='camera-image' size={60} color={colors.primary} />
                            <Text style={styles.optionText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default MyInformation3

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
        marginTop: 10
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
