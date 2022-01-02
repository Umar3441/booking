import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const DateSelector = () => {

    const [selectedDate, setSelectedDate] = useState(null)

    return (
        <View style={styles.container}>
            <CalendarPicker



                scrollable={true}
                horizontal={false}
                onDateChange={(date) => {

                    setSelectedDate(date)
                }}
            />
        </View>
    )
}

export default DateSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),

    }
})
