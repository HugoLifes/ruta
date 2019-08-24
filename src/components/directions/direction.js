import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyBbnWnYeWbJ1-hZHGxD7TZHqRgChZUtjCU"
        strokeWidth={3}
        strokeColor="#222"
    />
    );

export default Directions;