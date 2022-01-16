import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../../utils';
import moment from 'moment'


const DateSelector = ({ navigation }) => {

    const [selectedDate, setSelectedDate] = useState(null)

    return (
        <View style={styles.container}>
            <StatusBar translucent />
            <CalendarPicker

                selectedDayColor={colors.primary}
                selectedDayTextColor={colors.white}
                // previousComponent={() => null}
                // nextComponent={() => null}
                // scrollable={true}
                // horizontal={false}
                onDateChange={(date) => {
                    setSelectedDate(date)
                }}
            />
            <TouchableOpacity onPress={() => {
                if (moment(selectedDate).isBefore(moment().subtract(1, 'days'))) {
                    alert('Please Select future date')
                } else {
                    navigation.navigate('BookingDetails', data = { selectedDate })
                }
            }
            } style={styles.buttonStyle}>

                <Text style={styles.bigButtonTextStyle}>
                    CONTINUE
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default DateSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),

    },
    buttonStyle: {
        // width: '90%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 15,
        marginTop: 40,
        position: 'absolute',
        right: 10,
        left: 10,
        bottom: 40
    },
    bigButtonTextStyle: {
        fontSize: 20,
        color: colors.white,
        // letterSpacing: 2
    },
})
