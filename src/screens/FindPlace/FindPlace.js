import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import PlaceList from '../../components/PlaceList/PlaceList';
import { connect } from 'react-redux';

class FindPlace extends Component{
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    state = {
        placesListLoaded: false,
        removeAnim: new Animated.Value(1)
    }
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }
    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }
    };

    placesLoadedHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({placesListLoaded: true})
            this.placesLoadedHandler();
        });
    };

    itemSelectedHandler = key => {
        // we use this.props.navigator.push screen api of react-native-navigation
        // see doc. -> which helps to push a new screen in screen navigation stack
        // it requires unique screen name, title , passProps -> used to pass required props 
        // to the screen page
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace 
            }
        })
    };
    render(){
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Fetch Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.placesListLoaded){
            content = (
                <Animated.View style={{
                    opacity: this.state.removeAnim
                }}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
                </Animated.View>
            );
        }
        return(
            <View style={this.state.placesListLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderWidth: 3,
        borderColor: "orange",
        padding: 20,
        borderRadius: 50
    },
    searchButtonText: {
        fontSize: 26,
        color: "orange",
        fontWeight: "bold"
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlace);
