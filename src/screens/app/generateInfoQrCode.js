import React, { useState, useRef } from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Dimensions, Platform, TextInput, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CustomTextInput from '../../components/customTextInput'
import { colors, textStyles, tokens } from '../../utils';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';


import moment from 'moment'
import QRCode from 'react-native-qrcode-svg';



const GenerateInfoQrCode = ({ route }) => {
    const navigation = useNavigation();

    let data = route.params;





    const saveInfo = async () => {

        let prevData = null
        try {
            const dataSnapshot = await firestore().collection('users')
                .doc(auth().currentUser.phoneNumber + "")
                .get();

            if (dataSnapshot.data()) {
                prevData = dataSnapshot.data();
            }


        } catch (error) {
            console.log('erro', error)
        }
        console.log('--> prevData', prevData)



        if (prevData) {
            await firestore().collection('users')
                .doc(auth().currentUser.phoneNumber + "")
                .update(
                    {
                        ...prevData,
                        info: { ...data, cprIssueDate: data.cprIssueDate.toISOString(), cprExpiryDate: data.cprExpiryDate.toISOString(), passportIssueDate: data.passportIssueDate.toISOString(), passportExpiryDate: data.passportExpiryDate.toISOString() }
                    }
                );

            setTimeout(() => {
                navigation.replace('TabNavigator')
            }, 1000);
        } else {
            await firestore().collection('users')
                .doc(auth().currentUser.phoneNumber + "")
                .set(
                    {
                        info: { ...data, cprIssueDate: data.cprIssueDate.toISOString(), cprExpiryDate: data.cprExpiryDate.toISOString(), passportIssueDate: data.passportIssueDate.toISOString(), passportExpiryDate: data.passportExpiryDate.toISOString() }
                    }
                );

            setTimeout(() => {
                navigation.replace('TabNavigator')
            }, 1000);
        }
    }



    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
            <AntDesign onPress={() => navigation.goBack()} style={{ marginBottom: 10, left: 5 }} color={colors.white} name="arrowleft" size={25} />
            <MaterialIcons onPress={() => saveInfo()} style={{ position: 'absolute', right: 20, top: getStatusBarHeight() }} color={colors.white} name="done" size={30} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginTop: 50, marginHorizontal: 10, alignItems: 'center' }}>
                    <Text style={{ color: colors.lightGrey, fontSize: 16 }}>Full Name</Text>
                    <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{data.fullName}</Text>
                    <Text style={{ color: colors.white, fontWeight: '500' }}>------------------------------------------------</Text>


                    <Text style={{ color: colors.lightGrey, fontSize: 18, marginBottom: 0 }}>Passport</Text>
                    <Text style={{ color: colors.white, fontSize: 18, marginVertical: 5 }}>{data.passportNumber}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View><Text style={{ color: colors.lightGrey, fontSize: 16 }}>Issue Date</Text>
                            <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{moment(data.passportIssueDate).format('LL')}</Text>
                        </View>
                        <View><Text style={{ color: colors.lightGrey, fontSize: 16 }}>Expiry Date</Text>
                            <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{moment(data.passportExpiryDate).format('LL')}</Text>
                        </View>
                    </View>



                    <Text style={{ color: colors.white, fontWeight: '500' }}>------------------------------------------------</Text>


                    <Text style={{ color: colors.lightGrey, fontSize: 18, marginBottom: 0 }}>CPR</Text>
                    <Text style={{ color: colors.white, fontSize: 18, marginVertical: 5 }}>{data.cprNumber}</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View><Text style={{ color: colors.lightGrey, fontSize: 16 }}>Issue Date</Text>
                            <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{moment(data.cprIsuueDate).format('LL')}</Text>
                        </View>
                        <View><Text style={{ color: colors.lightGrey, fontSize: 16 }}>Expiry Date</Text>
                            <Text style={{ color: colors.white, fontSize: 18, marginVertical: 20 }}>{moment(data.cprExpiryDate).format('LL')}</Text>
                        </View>
                    </View>

                    <Text style={{ color: colors.white, fontWeight: '500' }}>------------------------------------------------</Text>
                    <Text style={{ color: colors.lightGrey, fontSize: 18, marginBottom: 0 }}>Nationality</Text>
                    <Text style={{ color: colors.white, fontSize: 18, marginVertical: 5 }}>{data.nationality}</Text>


                    <View style={{ width: 300, height: 300, marginTop: 20, marginBottom: 70 }}>
                        <QRCode
                            value={`cprNumber : ${data.cprNumber} , cprIssueDate :${data.cprIssueDate} , cprExpiryDate: ${data.cprExpiryDate} , passportNumber : ${data.passportNumber} , passportIssueDate : ${data.passportIssueDate} , passportExpiryDate : ${data.passportExpiryDate} , Nationality : ${data.nationality} , fullName : ${data.fullName}`}
                            size={300}

                        />
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}




export default GenerateInfoQrCode

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
    },

})
