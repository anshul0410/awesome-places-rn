// ListItem.js is created as functional component
// no use of class
// created to render placeName list by applying some custom style, 
// which is not possible/effective only by using Text
// Text is not as stylable as View component

import React from 'react';  // needed to use JSX
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'; 
// styling done on View, Text, StyleSheet

const listItem = (props) => (   // functional component 
    // we pass props from app.js to make placeName available here
    
    // ** we cannot use onPress directly on View, Text
    // we use Touchable wrapper to wrap elements we want to create a onPress scenario
    // Touchables wrapper used are
    // 1. TouchableWithoutFeedback -> does not give any feedback. Must have a 
    //single child inside it
    // 2. TouchableHighlight -> while clicked elm wrapped inside gets highlighted
    // 3. TouchableOpacity -> while clicked elm wrapped opacity changes
    // 4. TouchableNativeFeedback -> Gives ripple effect, not supported in ios 
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image source={props.placeImage} resizeMode="cover" style={styles.placeImage}/>
            <Text>{props.placeName}</Text>   
        </View>
    </TouchableOpacity>
);

// Image component to render images- source attribute used to render image

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',   // required to keep image and text next to each other
        alignItems: 'center'
    },
    placeImage: {
        width: 30,
        height: 30,
        marginRight: 8
    }
})

export default listItem;

