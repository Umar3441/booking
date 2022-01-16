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
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

const MyInformation2 = ({ navigation, route }) => {


    let data = route.params

    /////////////Full Name states ////////////////
    const [nationality, setNationality] = useState(null)
    const [nationalityError, setNationalityError] = useState(null)
    const [nationalityBorderColor, setNationalityBorderColor] = useState(colors.lightGrey)


    /////////////CPR number states ////////////////
    const [cprNumber, setcprNumber] = useState(data.cprNumber)
    const [cprNumberError, setcprNumberError] = useState(null)
    const [cprNumberBorderColor, setcprNumberBorderColor] = useState(colors.lightGrey)

    /////////////issue date states ////////////////
    const [cprIssueDate, setcprIssueDate] = useState(new Date())
    const [cprIssueDateError, setcprIssueDateError] = useState(null)
    const [cprIssueDateBorderColor, setcprIssueDateBorderColor] = useState(colors.lightGrey)
    // const [cprIssueDatePicker, setcprIssueDatePicker] = useState(new Date())
    const [cprIssueDatePickerOpen, setcprIssueDatePickerOpen] = useState(false)


    /////////////expiry date states ////////////////
    const [cprExpiryDate, setcprExpiryDate] = useState(new Date())
    const [cprExpiryDateError, setcprExpiryDateError] = useState(null)
    const [cprExpiryDateBorderColor, setcprExpiryDateBorderColor] = useState(colors.lightGrey)
    const [cprExpiryDatePickerOpen, setcprExpiryDatePickerOpen] = useState(false)



    /////////////faceAuthentication states/////////

    const [drivingLicensePhoto, setdrivingLicensePhoto] = useState(null)
    const [drivingLicensePhotoError, setdrivingLicensePhotoError] = useState(null)
    const [cameraOrGalleryModal, setcameraOrGalleryModal] = useState(false)


    function selectDriviLicensePhoto(mode) {


        launchImageLibrary({
            mediaType: 'photo',
        }, (data) => {
            if (data.assets) {
                setdrivingLicensePhoto(data?.assets[0]?.uri)
            }
        })




        // if (mode === 'camera') {

        //     launchCamera({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setdrivingLicensePhoto(data?.assets[0]?.uri)
        //         }
        //     })
        // } else {
        //     launchImageLibrary({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setdrivingLicensePhoto(data?.assets[0]?.uri)
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
        if (!cprNumber) {
            setcprNumberError('Required')
            globalError = true
        }
        if (!cprIssueDate) {
            setcprIssueDateError('Required')
            globalError = true
        }
        if (!cprExpiryDate) {
            setcprExpiryDateError('Requied')
            globalError = true
        }

        if (!drivingLicensePhoto) {
            setdrivingLicensePhotoError('Requied')
            globalError = true
        }


        if (!globalError) {

            const tempData = { ...data, nationality, cprNumber, cprIssueDate, cprExpiryDate, drivingLicensePhoto }

            // setNationality(null)
            // setcprNumber(null)
            // setcprIssueDate(new Date())
            // setcprExpiryDate(new Date())
            // setdrivingLicensePhoto(null)

            navigation.navigate('MyInformation3', data = tempData)
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
                    value={cprNumber}
                    title='CPR Number'
                    placeHolder='Enter CPR Number'
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
                    keyboardType='numeric'

                    Icon={() => <MaterialCommunityIcons name='credit-card-scan-outline' size={20} color={cprNumberBorderColor} onPress={() => console.log('scan')} />}
                />

                <CustomTextInput
                    value={moment(cprIssueDate.toISOString()).format('LL')}
                    title='Issue Date'
                    placeHolder='Enter Issue Date'
                    borderColor={cprIssueDateBorderColor}
                    error={cprIssueDateError}
                    onChangeText={(text) => setcprIssueDate(text)}
                    editable={false}
                    onFocus={() => {
                        setcprIssueDateError(null)
                        setcprIssueDateBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setcprIssueDateBorderColor(colors.lightGrey)
                        if (!cprIssueDate) {
                            setcprIssueDateError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => setcprIssueDatePickerOpen(true)} />}

                />



                <CustomTextInput
                    value={moment(cprExpiryDate.toISOString()).format('LL')}
                    title='Expiry Date'
                    placeHolder='Enter Expiry Date'
                    borderColor={cprExpiryDateBorderColor}
                    error={cprExpiryDateError}
                    onChangeText={(text) => setcprExpiryDate(text)}
                    onFocus={() => {
                        setcprExpiryDateError(null)
                        setcprExpiryDateBorderColor(colors.primary)
                    }}
                    onBlur={() => {
                        setcprExpiryDateBorderColor(colors.lightGrey)
                        if (!cprExpiryDate) {
                            setcprExpiryDateError('Required')
                        }
                    }}
                    keyboardType='numeric'


                    Icon={() => <FontAwesome name='chevron-down' size={20} color={colors.primary} onPress={() => setcprExpiryDatePickerOpen(true)} />}


                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={textStyles.blackMedium16}>
                        Driving License Scan
                    </Text>

                    <View
                        style={styles.faceAuthenticationStyle}
                        onPress={() => {
                            selectFaceAuthPhoto()
                            // setcameraOrGalleryModal(true)
                        }}
                    >
                        {
                            drivingLicensePhoto ?
                                <Image source={{ uri: drivingLicensePhoto }} style={{ width: '100%', height: '100%', overflow: 'hidden' }} resizeMode='cover' />
                                : <AntDesign onPress={() => selectDriviLicensePhoto()} name='scan1' size={150} color={colors.primary} />
                        }
                    </View>

                    <Text style={{ color: 'red' }}>
                        {drivingLicensePhotoError}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => goToInfo3()} style={[styles.buttonStyle, { marginBottom: 50 }]}>
                    <Text style={styles.bigButtonTextStyle}>
                        Continue
                    </Text>
                </TouchableOpacity>


                <DatePicker
                    modal
                    open={cprIssueDatePickerOpen}
                    date={cprIssueDate}
                    onConfirm={(date) => {
                        setcprIssueDatePickerOpen(false)

                        setcprIssueDate(date)
                    }}
                    onCancel={() => {
                        setcprIssueDatePickerOpen(false)
                    }}
                />


                <DatePicker
                    modal
                    open={cprExpiryDatePickerOpen}
                    date={cprExpiryDate}
                    onConfirm={(date) => {
                        setcprExpiryDatePickerOpen(false)

                        setcprExpiryDate(date)
                    }}
                    onCancel={() => {
                        setcprExpiryDatePickerOpen(false)
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

export default MyInformation2

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
