import React, { useState, useRef } from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CustomTextInput from '../../components/customTextInput'
import { colors, textStyles, tokens } from '../../utils';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'

import moment from 'moment'
import QRCode from 'react-native-qrcode-svg';



const QRcode = ({ route }) => {

    const navigation = useNavigation();
    const offer = route.params;

    console.log(offer)


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 10, left: 5 }} color={colors.white} name="arrowleft" size={25} />
            <View style={{ flex: 1, marginTop: 50, marginHorizontal: 10, alignItems: 'center' }}>
                <Text style={{ color: colors.lightGrey, fontSize: 16 }}>Full Name</Text>
                <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{offer.fullname}</Text>
                <Text style={{ color: colors.white, fontWeight: '500' }}>------------------------------------------------</Text>


                <Text style={{ color: colors.lightGrey, fontSize: 16 }}>Date</Text>
                <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{moment(offer.date).format('LL')}</Text>
                <Text style={{ color: colors.white, fontWeight: '500' }}>------------------------------------------------</Text>

                <View style={{ width: 300, height: 300, marginTop: 20 }}>
                    <QRCode
                        value={`{ticketId:${offer.offerId} , passport:${offer.passportNumber}}`}

                        size={300}
                    />
                </View>

            </View>
        </View>
    )
}




export default QRcode

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
    },

})
