// here we configure our store
// combineReducers is req to combine all our reducers as createStore requires only single 
// source of reducers

// we import all reducers (in this case on places reducer)
import { createStore, combineReducers, compose } from 'redux'; 
// compose is used to add multiple enhancers to our store
import placesReducer from './reducers/places';

// in PROD env -> composeEnhancers is the the content obtained from compose function of redux
let composeEnhancers = compose;

// __DEV__ -> is a global variable provided by RN, which is true only in dev env
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  -> is used to connect store to dev tool react-native-debugger
}

// rootReducer has combined reducers used in project
const rootReducer = combineReducers({
    places: placesReducer
});

// configureStore function is used to configure our store after createStore is called with 
// combined reducers

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers())
};
// we add composeEnhancers to createStore so that it can be used in debugging tool react-native-debugger. 
// once we have some middleware in project we will pass it to composeEnhancers()

export default configureStore;
