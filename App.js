// NEW CODE - AFTER REACT NATIVE NAVIGATION

// we will perform navigation here
// Steps to follow:
//   1. import navigation
//   2. registerComponent() -> register screens like AuthScreen. Pass unique id for screen
//   and arrow function returning screen itself to registerComponent
//   3. from docs of react-native-navigation check type of screen u want for a specific screen
//   ex using startSingleScreenApp for AuthScreen 

import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
// To configure our app to redux we will pass registerComponent with Provider and store,
// this will add redux to our screens
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore()

// Register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider)  // awesome-places.AuthScreen is unique id for AuthScreen 
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider)
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider)

// we will create a screen to show detail of place selected
// we do not require store and reducer as we are going to make this screen
// as a push screen -> which means it will apear or will be pushed in view on some action
// that action is clicking on a place
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider)
// screen for a drawer
Navigation.registerComponent("awesome-places.SideDrawerScreen", () => SideDrawerScreen)

// start an app
Navigation.startSingleScreenApp({
  screen:{
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
})



// OLD CODE - BEFORE REACT NATIVE NAVIGATION

// import React from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import ListItem from './src/components/ListItem/ListItem'
// import PlaceList from './src/components/PlaceList/PlaceList'
// import PlaceInput from './src/components/PlaceInput/PlaceInput'
// // import placeImage from './src/assets/beautiful-places.jpg'

// import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

// import {addPlace, deletePlace, selectPlace, deselectPlace} from './src/store/actions/places'
// import { connect } from 'react-redux'; // to connect App with store

// class App extends React.Component {
  
//   placeAddedHandler = (placeName) => {
//     // this.setState(prevState => {                             
//     //   return {
//     //     places: prevState.places.concat({
//     //       key: Math.random(),
//     //       name: placeName,
//     //       // image: placeImage    -> image in asset
//     //       image: {    // for image -> copy image uri
//     //         uri: "https://hips.hearstapps.com/hbu.h-cdn.co/assets/16/13/3200x1600/landscape-1459440369-gettyimages-580734179.jpg?resize=768:*"
//     //       }
//     //     })
//     //   };
//     // });
//     // Follow this way of writing setState
//     // WEB way does not work here
//     // cannot use places.push(prevState.placeName) --  use concat only


//     // AFTER REDUX
//     this.props.onAddPlace(placeName);
//     console.log('Place added: '+placeName);
//   };

//   placeDeletedHandler = () => {  // index is the index of item clicked in list
//     // this.setState(prevState => {
//     //   return {
//     //     places: prevState.places.filter(place => {
//     //       return place.key !== prevState.selectedPlace.key;
//     //     }),
//     //     selectedPlace: null
//     //   };
//     // });
//     // use this method to delete by index
//     // places is updated with place name for which their index i !== index(click elm index)
//     // elm in places which are true for the statement are returned


//     //AFTER REDUX
//     this.props.onDeletePlace()
//   };


//   // to handle click on place selected
//   placeSelectedHandler = (key) => {
//     // this.setState(prevState => {
//     //   return {
//     //     selectedPlace: prevState.places.find(place => {
//     //       return place.key === key;
//     //     })
//     //   }
//     // })

//     // AFTER REDUX
//     this.props.onSelectPlace(key)
//   };

//   modalClosedHandler = () => {
//     // this.setState({
//     //   selectedPlace: null
//     // })

//     // after redux
//     this.props.onDeselectPlace()
//   }

//   render() { 
//     return (
//       <View style={styles.container}>

//         {/* After Code Split */}
//         <PlaceDetail selectedPlace={this.props.selectedPlace}
//         onModalClosed={this.modalClosedHandler}
//         onItemDeleted={this.placeDeletedHandler}
//         />
//         <PlaceInput onPlaceAdded={this.placeAddedHandler} />
//         <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler}/>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 28,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start'
//   }
// });


// // maps props which are required in App.js
// const mapStateToProps = state => {
//   return {
//     places: state.places.places,
//     selectedPlace: state.places.selectedPlace
//   };
// }

// // maps dispatch to props which are required in App.js
// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (name) => dispatch(addPlace(name)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     onSelectPlace: (key) => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deselectPlace())
//   };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(App);