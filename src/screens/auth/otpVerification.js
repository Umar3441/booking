import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, Platform, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, textStyles } from '../../utils';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/actions/user';

const OtpVerification = ({ route }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const data = route.params
    console.log(data)



    const [loading, setLoading] = useState(false)

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    const [error, seterror] = useState('')

    async function signInWithPhoneNumber(phoneNumber) {

        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
            console.log(confirmation)
            setConfirm(confirmation);
        } catch (error) {
            console.log(error)
        }

    }

    async function confirmCode() {
        setLoading(true)
        confirm.confirm(code).then(
            () => {

                if (data.email && data.fullName) {

                    auth().currentUser.updateProfile({

                        email: data?.email,
                        displayName: data?.fullName,
                        password: data?.password,

                    }).then(
                        () => {
                            console.log('Updated profile')
                            firestore()
                                .collection('users')
                                .doc(data?.phoneNumber.toString())
                                .set({
                                    name: data?.fullName,
                                    email: data?.email,
                                }).then(
                                    () => {
                                        console.log('user Added')

                                        dispatch(addUser({
                                            name: data?.fullName,
                                            email: data?.email,
                                        }))
                                        setLoading(false)
                                        // navigation.replace('App')
                                    }
                                )

                        })
                }
                else {

                    firestore()
                        .collection('users')
                        .doc(data?.phoneNumber.toString())
                        .get().then(
                            (documentSnapshot) => {

                                console.log("Document Snapshot", documentSnapshot.data())

                                const data = documentSnapshot.data()
                                setLoading(false)
                                if (data) {
                                    dispatch(addUser(documentSnapshot.data()))
                                    // navigation.replace('App')
                                } else {
                                    // navigation.replace('App')
                                }


                            }
                        ).catch(
                            err => {
                                setLoading(false)
                                console.log('error', err)
                            }
                        )

                    // navigation.replace('App')
                }
            }
        ).catch(
            err => {
                setLoading(false)
                seterror('ERROR')
                console.log('error', err)
            }
        )
    }



    useEffect(() => {
        signInWithPhoneNumber(data?.phoneNumber)
    }, [])


    return (
        <View style={styles.container}>
            <View>
                <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 20 }} name="arrowleft" size={25} />
                <Text style={textStyles.bigBoldBlack}>OTP Verification</Text>

                <View style={{ marginVertical: 15 }}>
                    <Text style={[textStyles.greyNormal16]}>
                        Enter OTP Code that was sent to
                    </Text>
                    <Text style={[textStyles.greyNormal16]}>
                        {data?.phoneNumber}
                    </Text>
                </View>

                <OTPInputView
                    style={{ width: '100%', height: 62, marginTop: 60, alignSelf: 'center' }}
                    pinCount={6}
                    code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => setCode(code)}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.codeInputFieldStyle}
                    codeInputHighlightStyle={styles.codeInputHighlightStyle}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />

                <Text style={{ alignSelf: 'center', marginTop: 10, color: 'red' }}>{error}</Text>

                <View style={styles.notRecievedCodeStyle}>
                    <Text style={{ fontWeight: '300' }}>Didn't recieve OTP Code?</Text>
                    <TouchableOpacity onPress={() => signInWithPhoneNumber(data?.phoneNumber)}>
                        <Text style={{ fontWeight: '400', color: colors.primary }}>Resend Code</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <KeyboardAvoidingView
                style={{ justifyContent: "flex-end" }}
                keyboardVerticalOffset={60}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableOpacity onPress={() => confirmCode()} style={styles.buttonStyle}>
                    {loading ?
                        <ActivityIndicator size='small' color={colors.white} />
                        : <Text style={styles.bigButtonTextStyle}>
                            Send Verification Code
                        </Text>
                    }
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    )
}

export default OtpVerification

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
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

    codeInputFieldStyle: {
        borderColor: colors.lightGrey,
        borderRadius: 10,
        height: Platform.OS === 'ios' ? 60 : 55,
        width: Platform.OS === 'ios' ? 55 : 50,
        borderWidth: 2,
        color: colors.black,
        fontSize: 25
    },
    codeInputHighlightStyle: {
        borderColor: colors.primary,
        borderRadius: 10,
        height: Platform.OS === 'ios' ? 60 : 55,
        width: Platform.OS === 'ios' ? 55 : 50,
        borderWidth: 1,
        color: colors.black,
        fontSize: 25
    },

    notRecievedCodeStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    }

})
