import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { textStyles } from '../utils'

import Entypo from 'react-native-vector-icons/Entypo'



const CustomTextInput = ({ title, placeHolder, borderColor, error, password, showPasswordPressHandler, showPassword, ...otherProps }) => {
    return (
        <View style={styles.container}>
            <Text style={textStyles.blackMedium16}>{title}</Text>

            <View style={[styles.textInputStyle, { borderColor: borderColor }]}>
                <TextInput

                    placeholder={placeHolder}
                    {...otherProps}
                    style={{ flex: 1, }}

                />

                {
                    password ?
                        (showPassword ?
                            <Entypo name='eye' size={20} color={borderColor} onPress={showPasswordPressHandler} /> :
                            <Entypo name='eye-with-line' size={20} color={borderColor} onPress={showPasswordPressHandler} />
                        )
                        : null
                }

            </View>

            {error ?
                <Text style={styles.errorTextStyle}>
                    {error}
                </Text>
                : null}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 15,

    },
    textInputStyle: {
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingVertical: Platform.OS === 'ios' ? 20 : 5,
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20
    },
    errorTextStyle: {
        color: 'red',
        marginLeft: 10
    }
})
