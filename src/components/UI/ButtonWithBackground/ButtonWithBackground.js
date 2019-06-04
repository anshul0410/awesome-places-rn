import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';
// Platform is an API provided by react-native, which tells us the platform we are using 
// in real time
// this can be used to style or use component different for ios and android.
// as here in android we use TouchableNativeFeedback which works only for android.
const buttonWithBackground = props => {
    console.log(Platform,'Platform')
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null ]}>
            <Text style={props.disabledText ? styles.disabledText : null }>{props.children}</Text>
        </View>
    );
    if(props.disabled)
        return content;
    if(Platform.OS === "android"){
        <TouchableNativeFeedback onPress={props.onPress}>{content}</TouchableNativeFeedback>
    }
    return(
        <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 5,
        padding:8,
        margin: 5
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disabledText: {
        color: "#aaa"
    }
});

export default buttonWithBackground;