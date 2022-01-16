import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, Image, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import { colors } from '../../utils';

import { useSelector } from 'react-redux';
import MyInformation1 from './myInformation1'







const MyBooking = ({ navigation }) => {

    const [initializing, setInitializing] = useState(true)
    const userInfo = useSelector(state => state.userReducer.user)

    useEffect(() => {
        setTimeout(() => {
            setInitializing(false)
        }, 1000)
    }, [navigation])

    // useEffect(() => {

    //     if (!userInfo?.info) {
    //         navigation.navigate('MyInformation1')
    //     }

    // }, [navigation])


    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={colors.primary} size='large' />
            </View>
        )
    }

    if (!userInfo?.info) {
        return (
            <MyInformation1 />
        )
    }

    if (userInfo?.info) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
                <View style={styles.header}>
                    <SimpleLineIcons onPress={() => navigation?.navigate('Profile')} name='menu' size={25} color={colors.black} />
                    <Text style={{ fontSize: 20, fontWeight: '300', color: colors.black }}>
                        My Information
                    </Text>

                    <FontAwesome onPress={() => {
                        navigation.navigate('MyInformation1')

                    }} name='edit' size={25} color={colors.black} />
                </View>

                <ScrollView>

                    <View style={{ flex: 1, paddingHorizontal: 40 }}>
                        <Image source={{ uri: userInfo?.info?.faceImage }} style={{ width: 150, height: 150, marginTop: 20, alignSelf: 'center', borderRadius: 100, resizeMode: 'cover' }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10 }}>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Full Name</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{userInfo?.info?.fullName}</Text>
                            </View>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Nationality</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{userInfo?.info?.nationality}</Text>
                            </View>
                        </View>

                        <View><Text style={{ color: colors.grey, fontSize: 16 }}>Passport Number</Text>
                            <Text style={{ fontSize: 18, marginVertical: 20 }}>{userInfo?.info?.passportNumber}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10 }}>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Issue Date</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{moment(userInfo?.info?.passportIssueDate).format('LL')}</Text>
                            </View>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Expiry Date</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{moment(userInfo?.info?.passportExpiryDate).format('LL')}</Text>
                            </View>
                        </View>




                        <View><Text style={{ color: colors.grey, fontSize: 16 }}>CPR Number</Text>
                            <Text style={{ fontSize: 18, marginVertical: 20 }}>{userInfo?.info?.cprNumber}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10 }}>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Issue Date</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{moment(userInfo?.info?.cprIssueDate).format('LL')}</Text>
                            </View>
                            <View><Text style={{ color: colors.grey, fontSize: 16 }}>Expiry Date</Text>
                                <Text style={{ fontSize: 18, marginVertical: 20 }}>{moment(userInfo?.info?.cprExpiryDate).format('LL')}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }

}

export default MyBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.silver,
        // paddingTop: getStatusBarHeight(),


    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        paddingBottom: 15,
        paddingTop: getStatusBarHeight() + 15

    },
})
