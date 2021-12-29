import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View, StatusBar, Platform } from 'react-native'


import { useNavigation } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { colors } from '../../utils'


const Home = () => {


    const navigation = useNavigation()



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
            <Button title='Enable Location' />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
