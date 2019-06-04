import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }
    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an image"}, res => {
            if(res.didCancel)
                console.log('cancelled image pick')
            else if(res.error)
                console.log(res.error,'error in image pick')
            else{
                this.setState({
                    pickedImage: { uri: res.uri }
                })
                this.props.onImagePicked({uri: res.uri});
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler}/>
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
    placeholder: {
        borderWidth: 1,
        borderColor: "#000",
        width: "80%",
        height: 150,
        backgroundColor: "#eee"
    },
    button: {
        margin: 8,
        padding: 5
    },
    previewImage: {
        width: "100%",
        height: "100%"       
    }
});

export default PickImage;