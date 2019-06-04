// Implement Modal in app
// We will remove modal for implementing placedetail with redux and navigator.push screen
import React, {Component} from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {deletePlace} from '../../store/actions/index';
import MapView from 'react-native-maps';

class PlaceDetail extends Component{
    state = {
        viewMode: "portrait"
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener('change', this.updateStyles)
    }
    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }
    deletePlaceHandler = () => {
        this.props.onPlaceDeleted(this.props.selectedPlace.key);
        // this.props.navigator.pop(); -> pops the current screen and takes to previous
        // screen on screen navigation stack
        this.props.navigator.pop();
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyles)
    }
    render(){
        return(
            <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                    </View>
                    <View style={styles.subContainer}>
                        <MapView initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122   
                        }}
                        style={styles.map}
                        ><MapView.Marker coordinate={this.props.selectedPlace.location}/></MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.deletePlaceHandler}>
                            <View style={styles.deleteItem}>
                                <Icon name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red" size={30}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};

// onRequestClose -> is used to handle back button on android device
// it will close modal on back btn press -> onRequestClose calls onModalClose function 

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    placeDetailContainer:{
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
       flexDirection: 'row' 
    },
    placeImage:{
        width: '100%',
        height: "100%"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    placeName:{
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    },
    deleteItem: {
        alignItems: 'center'
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onPlaceDeleted: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);