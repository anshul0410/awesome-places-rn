import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

import ListItem from '../ListItem/ListItem'

const placeList = (props) => {
    // const placeOutputs = props.places.map((place,i) => 
    //     <ListItem key={i} placeName={place} 
    //     onItemPressed={() => props.onItemDeleted(i)}
    //     />

        //onItemPressed props tells which item is pressed in ListItem
        // for deleting item on click we pass index of the item clicked back to app.js
    // )
    return (
        <FlatList style={styles.placeOutputController} 
        data={props.places}
        renderItem={(info) => (
            <ListItem 
            placeName={info.item.name}
            placeImage={info.item.image}
            onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}
        />
    );
    // in ItemList we have View wrapping list name but it is not scrollable 
    // to make the list scrollable we use "ScrollView" component 
    // but ScrollView is inefficient when huge list of item is to be rendered
    // as it renders all item at once


    // ** BEST way to handle list data <FlatList>
    // FlatList requires data attribute which must be passed data which is array of object
    // with a unique key/id in object
    // it has renderItem attribute-> with "info" params which has info about every object 
    // of the data , which can be used as=> info.item.value to pass value to another component
};

const styles = StyleSheet.create({
    placeOutputController: {
        width: '100%'
    }
});

export default placeList;