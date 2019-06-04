
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background_image.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions';

class AuthScreen extends Component{
    state = {
        // EFFICIENT WAY
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount(){
        // when Dimensions.addEventListeners are used they MUST be removed when not in use
        Dimensions.removeEventListener('change', this.updateStyles)
    }
    updateStyles = dims => (
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    );
    handleLogin = () => {
        let authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            confirmPassword: this.state.controls.confirmPassword.value
        }
        this.props.onLogin(authData)
        startMainTabs();
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
    };

    updateInputState = (key, val) => {
        let connectedValue = {};
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if(key === 'password'){
            connectedValue = {
                ...connectedValue,
                equalTo: val
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ?
                            validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    };
    render(){
        let headingText = null;
        let confirmPasswordControl = null;
        if(this.state.authMode === 'signup'){
            confirmPasswordControl = (
                <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordItem : styles.landscapePasswordItem}><DefaultInput placeholder="Confirm Password" valid={this.state.controls.confirmPassword.valid} touched={this.state.controls.confirmPassword.touched} style={styles.input} value={this.state.controls.confirmPassword.value} onChangeText={(val) => this.updateInputState('confirmPassword', val)} autoCorrect={false} autoCapitalize="none" secureTextEntry /></View>
            );
        }
        if(Dimensions.get('window').height > 500){
            headingText = (
                <MainText>
                    <HeadingText>Please Log in</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch to {this.state.authMode === 'login' ? "Sign Up" : "Login" }</ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput placeholder="Enter E-Mail ID" valid={this.state.controls.email.valid} touched={this.state.controls.email.touched} style={styles.input} value={this.state.controls.email.value} onChangeText={(val) => this.updateInputState("email", val)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
                            <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitPasswordItem : styles.landscapePasswordItem}><DefaultInput placeholder="Password" valid={this.state.controls.password.valid} touched={this.state.controls.password.touched} style={styles.input} value={this.state.controls.password.value} onChangeText={(val) => this.updateInputState('password', val)} autoCapitalize="none" autoCorrect={false} secureTextEntry/></View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <ButtonWithBackground disabled={!this.state.controls.email.valid || !this.state.controls.password.valid || !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'} color="#29aaf4" onPress={this.handleLogin}>Submit</ButtonWithBackground>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // to take all the available height for the view
        justifyContent: "center", // sets position of element in flex direction default column
        alignItems: "center" // sets position of elements in perpendicular direction (default left to right)
    },
    inputContainer: {
        width: "80%"
    },
    backgroundImage: {
        flex: 1,
        width: "100%"
    },
    // if we are using defaultInput style to style our textInput and only in this 
    // component we want textinput to have style like backgroundColor,
    // we can pass this style as prop to defaultInput and merge both style property
    input: {
        borderColor: "#bbb",
        backgroundColor: "#eee"
    },
    // Better method is to create 2 styles one for landscape mode another for portrait mode
    // render styles according to a state set in addEventListener
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordItem: {
        width: "45%"
    },
    portraitPasswordItem: {
        width: "100%"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    }
};

export default connect(null, mapDispatchToProps)(AuthScreen);