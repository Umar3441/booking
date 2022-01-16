import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textStyles } from '../../utils'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import CustomTextInput from '../../components/customTextInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const MyInformation1 = () => {

    const navigation = useNavigation()
    /////////////Full Name states ////////////////
    const [fullName, setFullName] = useState(null)
    const [fullNameError, setFullNameError] = useState(null)
    const [fullNameBorderColor, setFullNameBorderColor] = useState(colors.lightGrey)


    /////////////CPR number states ////////////////
    const [cprNumber, setcprNumber] = useState(null)
    const [cprNumberError, setcprNumberError] = useState(null)
    const [cprNumberBorderColor, setcprNumberBorderColor] = useState(colors.lightGrey)

    /////////////Passport number states ////////////////
    const [passportNumber, setPassportNumber] = useState(null)
    const [passportNumberError, setPassportNumberError] = useState(null)
    const [passportNumberBorderColor, setPassportNumberBorderColor] = useState(colors.lightGrey)

    /////////////faceAuthentication states/////////

    const [faceImage, setfaceImage] = useState(null)
    const [faceImageError, setfaceImageError] = useState(null)
    const [cameraOrGalleryModal, setcameraOrGalleryModal] = useState(false)


    function selectFaceAuthPhoto(mode) {


        launchImageLibrary({
            mediaType: 'photo',
        }, (data) => {
            if (data.assets) {
                setfaceImage(data?.assets[0]?.uri)
            }
        })

        // if (mode === 'camera') {

        //     launchCamera({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setfaceImage(data?.assets[0]?.uri)
        //         }
        //     })
        // } else {
        //     launchImageLibrary({
        //         mediaType: 'photo',
        //     }, (data) => {
        //         if (data.assets) {
        //             setfaceImage(data?.assets[0]?.uri)
        //         }
        //     })
        // }



    }


    const goToInfo2 = () => {

        let globalError = false;

        if (!fullName) {
            setFullNameError('Required')
            globalError = true
        }
        if (!cprNumber) {
            setcprNumberError('Required')
            globalError = true
        }
        if (!passportNumber) {
            setPassportNumberError('Required')
            globalError = true
        }
        if (!faceImage) {
            setfaceImageError('Required')
            globalError = true
        }

        if (!globalError) {
            navigation.navigate('MyInformation2', data = { fullName, cprNumber, passportNumber, faceImage })
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
                        if (!fullName) {
                            setcprNumberError('Required')
                        }
                    }}
                    keyboardType='numeric'

                    Icon={() => <MaterialCommunityIcons name='credit-card-scan-outline' size={20} color={cprNumberBorderColor} onPress={() => console.log('scan')} />}
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

                <View style={{ marginVertical: 10 }}>
                    <Text style={textStyles.blackMedium16}>
                        Face Authentication
                    </Text>

                    <TouchableOpacity
                        style={styles.faceAuthenticationStyle}
                        onPress={() => {
                            selectFaceAuthPhoto()
                            // setcameraOrGalleryModal(true)
                        }}
                    >
                        {
                            faceImage ?
                                <Image source={{ uri: faceImage }} style={{ width: '100%', height: '100%', overflow: 'hidden' }} resizeMode='cover' />
                                : <Entypo name='camera' size={250} />
                        }
                    </TouchableOpacity>

                    <Text style={{ color: 'red' }}>
                        {faceImageError}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => goToInfo2()} style={[styles.buttonStyle, { marginBottom: 50 }]}>
                    <Text style={styles.bigButtonTextStyle}>
                        Continue
                    </Text>
                </TouchableOpacity>
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

export default MyInformation1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: getStatusBarHeight(),
        paddingHorizontal: 10
    },
    faceAuthenticationStyle: {
        borderWidth: 1,
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
