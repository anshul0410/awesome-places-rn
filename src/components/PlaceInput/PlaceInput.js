// component to create place input 
import React from 'react';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (
    <DefaultInput placeholder="place name" value={props.placeData.value} onChangeText={props.onChangeText} valid={props.placeData.valid} touched={props.placeData.touched}/>
);

export default placeInput;
