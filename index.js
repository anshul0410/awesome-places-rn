import React from 'react';  // imported to use JSX required for wrapping App with Provider
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore'
// import configureStore
// Provider wraps the App component to connect react with redux and provide store

// create store by calling configure store
const store = configureStore()

//here we wrap App with Provider and pass store thus making our state available in project

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('rncourse', () => RNRedux);

// AppRegistry.registerComponent('rncourse', () => App);
// here App was a function which returned JSX and thus it is correct

// WRONG -> as in RNRedux we are directly passing JSX which is not accepted 
// by registerComponent

// const RNRedux = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// ); 
// AppRegistry.registerComponent('rncourse', () => RNRedux);

// CORRECT -> as in RNRedux -> JSX is returned from a function which is how  
// registerComponent requires Component

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// ); 
// AppRegistry.registerComponent('rncourse', () => RNRedux);

