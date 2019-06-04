import React from 'react';
import {Text, StyleSheet} from 'react-native';
// used for cascading css so that it is wrapped on other text and provide some 
// default property to text like fontFamily or color


const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText: {
        color: "black",
        backgroundColor: "transparent"
    }
})

export default mainText;