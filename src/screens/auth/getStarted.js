import React, { useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import { colors, images } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

const GetStarted = () => {
    const navigation = useNavigation()


    // useEffect(() => {
    //     if (auth().currentUser) {
    //         navigation.replace('App')
    //     }
    // }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            <View style={styles.logoContainer}>
                <Image source={images.getStartedLogo} style={styles.logoStyles} />
                <Text style={{ fontSize: 30, fontWeight: '900' }}>Ticket Booking</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.buttonStyle}>
                <Text style={styles.textStyle}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',

    },
    logoStyles: {
        width: 200,
        height: 200,
        marginTop: '40%'
    },
    buttonStyle: {
        width: '80%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        // marginTop: Platform.OS === 'ios' ? '85%' : '75%',
        position: 'absolute',
        bottom: 40,



    },
    textStyle: {
        fontSize: 20,
        // fontWeight: '600',
        color: colors.white,
        letterSpacing: 2
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
