import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
    state={
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        locationChoosen: false
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChoosen: true
            }
        })
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordsEvent)   
        },
        err => {
            console.log(err)
            alert('Fetching the postition failed, please pick one manually!')
        })
    }

    render() {
        let marker = null;

        if(this.state.locationChoosen){
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }
        return (
            <View style={styles.container}>
                <MapView ref={ref => this.map = ref} initialRegion={this.state.focusedLocation} style={styles.map} onPress={this.pickLocationHandler}>{marker}</MapView>
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={this.getLocationHandler} />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 8,
        padding: 5
    }
})

export default PickLocation;