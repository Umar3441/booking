import React, { useRef, useState } from 'react'
import { StyleSheet, StatusBar, Platform, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, textStyles } from '../../utils';
import PhoneInput from "react-native-phone-number-input";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation()

    const phoneNumberRef = useRef(null)
    const [phoneNumber, setphoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState(null)
    const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState(colors.lightGrey)


    const loginFunction = () => {
        if (!phoneNumber) {
            setPhoneNumberError('required')
            return
        }


        navigation.navigate('OtpScreen', data = { phoneNumber: phoneNumber })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View>
                <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 20 }} name="arrowleft" size={25} />
                <Text style={textStyles.bigBoldBlack}>Login</Text>

                <View style={{ marginVertical: 15 }}>
                    <Text style={[textStyles.greyNormal16]}>
                        Enter your Phone number to Access
                    </Text>
                    <Text style={[textStyles.greyNormal16]}>
                        your account
                    </Text>
                </View>


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

                {phoneNumberError ? <Text style={{ color: 'red', marginLeft: '30%', marginTop: 5 }}>
                    {phoneNumberError}
                </Text> : null}
            </View>
            <KeyboardAvoidingView
                style={{ justifyContent: "flex-end" }}
                keyboardVerticalOffset={60}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableOpacity onPress={() => loginFunction()} style={styles.buttonStyle}>
                    <Text style={styles.bigButtonTextStyle}>
                        Login
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 20,
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        marginTop: 30
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.white,
        letterSpacing: 2
    },
})
