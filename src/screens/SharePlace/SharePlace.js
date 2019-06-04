import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/places';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

// For drawer to open we use setOnNavigatorEvent -> where we specify method to execute
// whenever a navigation event occurs
class SharePlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                validationRules: {
                    notEmpty: true
                },
                touched: false
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }
    onNavigatorEvent = event => {
        // event shows what event occured in navigation
        // event type ScreenChangedEvent, NavBarButtonPress etc
        // ScreenChangedEvent type event have id "willAppear" and "didAppear"
        // like component life cycle
        // we need to give id to leftButtons so that we know which button is pressed
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                //we call this.props.navigator.toggleDrawer function required to open/close
                this.props.navigator.toggleDrawer({
                    side: "left"   //required for android and ios
                });
            }
        }
    };

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return{
                ...prevState,
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, null, null),
                        touched: true
                    }
                }
            }
        })
    };

    placeAddedHandler = () => {
        this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value, this.state.controls.image.value);
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    render() {
        return (
            <ScrollView>
                {/* contentContainerStyle - prop for scrollView does not work in android */}
                <View style={styles.container}>
                    <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
                    <PickImage onImagePicked={this.imagePickedHandler}/> 
                    <PickLocation onLocationPick={this.locationPickedHandler}/>
                    <PlaceInput placeData={this.state.controls.placeName} onChangeText={this.placeNameChangedHandler} />
                    <View style={!this.state.controls.placeName.valid && this.state.controls.placeName.touched ? styles.disabled : styles.button}>
                        <Button title="Share place" onPress={this.placeAddedHandler} disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    button: {
        margin: 8,
        padding: 5
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

export default connect(null, mapDispatchToProps)(SharePlace);