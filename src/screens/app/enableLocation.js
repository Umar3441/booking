import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, StatusBar, Platform, Image } from 'react-native'

import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { colors, images, textStyles } from '../../utils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



const EnableLocation = () => {


    const navigation = useNavigation()
    const requestPermissionFunction = () => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            // …
            console.log(result)

            navigation.goBack()

        });
    }




    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 20, position: 'absolute', top: getStatusBarHeight() + 5, left: 5 }} name="arrowleft" size={25} />

            <View style={styles.contentContainer}>
                <Image source={images.whatsNearByLogo} style={styles.imageStyles} />
                <Text style={[textStyles.bigBoldBlack, { fontSize: 22, color: colors.primary, marginTop: 20 }]}>What's nearby?</Text>

                <Text style={[textStyles.greyNormal16, { marginTop: 20 }]}>
                    To provide you the nearby
                </Text>
                <Text style={[textStyles.greyNormal16,]}>
                    events Tasttlig needs to access
                </Text>
                <Text style={[textStyles.greyNormal16,]}>
                    your current location.
                </Text>

            </View>

            <TouchableOpacity onPress={() => requestPermissionFunction()} style={styles.buttonStyle}>
                <FontAwesome5 name="location-arrow" size={18} color={colors.white} style={{ marginRight: 10 }} />
                <Text style={styles.bigButtonTextStyle}>
                    Use Current Location
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default EnableLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        alignItems: 'center'

    },
    contentContainer: {
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80

    },
    imageStyles: {
        width: 320,
        height: 320,

    },
    buttonStyle: {
        width: '100%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        marginTop: 30,
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.white,
        // letterSpacing: 2
    },

})
