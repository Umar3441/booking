import React, { useState, useRef } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import CustomTextInput from '../../components/customTextInput';
import { colors, textStyles } from '../../utils';
import PhoneInput from "react-native-phone-number-input";

import CheckBox from 'react-native-check-box'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


function ValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const SignUp = () => {

    const navigation = useNavigation()

    /////////////Full Name states ////////////////
    const [fullName, setFullName] = useState(null)
    const [fullNameError, setFullNameError] = useState(null)
    const [fullNameBorderColor, setFullNameBorderColor] = useState(colors.lightGrey)
    /////////////Phone Number Input States////////////////

    const phoneNumberRef = useRef(null)
    const [phoneNumber, setphoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState(null)
    const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState(colors.lightGrey)

    ////////////Email States////////////

    const [email, setEmail] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [emailBorderColor, setEmailBorderColor] = useState(colors.lightGrey)

    ////////////Password States////////////

    const [password, setPassword] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordBorderColor, setPasswordBorderColor] = useState(colors.lightGrey)
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    ///////////Terms states////////////////////////////////

    const [termsAndConditions, setTermsAndConditions] = useState(false)
    const [termsAndConditionsError, setTermsAndConditionsError] = useState(null)

    ////////global error ///////////


    const signupFunction = () => {


        let GlobalError = false

        if (!fullName) {
            setFullNameError('Required')
            GlobalError = true
        }
        if (!phoneNumber) {
            setPhoneNumberError('Required')

            GlobalError = true
        }
        if (!email) {
            setEmailError('Required')
            GlobalError = true
        } else {
            if (ValidateEmail(email)) {
                setEmailError(null)

            } else {
                setEmailError('Invalid email')
                GlobalError = true
            }
        }
        if (!password) {
            setPasswordError('Required')
            GlobalError = true
        } else {
            if (password.length < 6) {
                GlobalError = true
                setPasswordError('Password must be of atleast 6 charachters')
            } else {
                setPasswordError(null)

            }
        }

        if (!termsAndConditions) {
            GlobalError = true
            setTermsAndConditionsError('You must agree with terms and conditions')
        }


        if (!GlobalError) {
            navigation.navigate('OtpScreen', data = { fullName: fullName, phoneNumber: phoneNumber, email: email, password: password })
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                <Text style={textStyles.bigBoldBlack}>Sign Up</Text>

                <View style={{ marginVertical: 15 }}>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 1 }]}>
                        Create account with easy and fast
                    </Text>
                    <Text style={[textStyles.greyNormal16, { letterSpacing: 1 }]}>
                        methods
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


                <CustomTextInput
                    title='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeHolder='Enter Email'
                    borderColor={emailBorderColor}
                    error={emailError}
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => {
                        setEmailError(null)
                        setEmailBorderColor(colors.primary)
                    }}
                    onBlur={() => {

                        setEmailBorderColor(colors.lightGrey)
                        if (!email) {
                            setEmailError('Required')
                        } else {
                            if (ValidateEmail(email)) {
                                setEmailError(null)
                            } else {
                                setEmailError('Invalid email')
                            }
                        }
                    }}
                />

                <CustomTextInput
                    title='Password'
                    placeHolder='Enter Password'
                    borderColor={passwordBorderColor}
                    error={passwordError}
                    onChangeText={(text) => setPassword(text)}
                    onFocus={() => {
                        setPasswordError(null)
                        setPasswordBorderColor(colors.primary)
                    }
                    }
                    onBlur={() => {
                        setPasswordBorderColor(colors.lightGrey)

                        if (!password) {
                            setPasswordError('Required')
                        } else {
                            if (password.length < 6) {
                                setPasswordError('Password must be of atleast 6 charachters')
                            } else {
                                setPasswordError(null)
                            }
                        }
                    }}
                    password={true}
                    secureTextEntry={secureTextEntry}
                    showPasswordPressHandler={() => setSecureTextEntry(!secureTextEntry)}
                    showPassword={secureTextEntry}
                />

                <CheckBox
                    onClick={() => setTermsAndConditions(!termsAndConditions)}
                    isChecked={termsAndConditions}
                    rightText={"I agree with terms and conditions and privacy policy"}
                    checkBoxColor={colors.primary}

                    rightTextStyle={
                        {
                            ...textStyles.greyNormal16,
                            marginTop: 15, letterSpacing: 1, lineHeight: 25
                        }
                    }


                />

                {!termsAndConditions ? <Text style={{ color: 'red', marginLeft: 30 }}>
                    {termsAndConditionsError}
                </Text> : null}

                <TouchableOpacity onPress={() => signupFunction()} style={styles.buttonStyle}>
                    <Text style={styles.bigButtonTextStyle}>
                        SignUp
                    </Text>
                </TouchableOpacity>

                <View style={styles.alreadyMemberView}>
                    <Text style={textStyles.greyNormal16}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: colors.primary, fontSize: 16 }}>Login</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
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
        letterSpacing: 2
    },
    alreadyMemberView: {

        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 20
    }
})
