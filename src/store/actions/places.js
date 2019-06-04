// import action_types
import {ADD_PLACE, DELETE_PLACE} from './actionTypes'

// actions to perform add, delete, select, deselect
export const addPlace = (placeName,location,image) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        location: location,
        image: image
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
};
