// This is the root reducer file
// import actionTypes
import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes'

const initialState={
    places: []
}

// here any reducer returns a new state and the previous state is not modified
// this is immutability property of redux
// so in return we use spread operator (...state) which copies current state
// and we then modify whatever prop we want to update

const reducer = (state= initialState, action) => {
    switch(action.type){
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: action.image.uri
                    },
                    location: action.location
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            };
        default:
            return state;
    }
};

export default reducer;