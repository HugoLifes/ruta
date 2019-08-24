import React, {Component} from 'react'
import {withScriptjs,withGoogleMap, InfoWindow ,GoogleMap,Marker,KmlLayer} from 'react-google-maps'
import {compose,withProps} from 'recompose';
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native';
import Geocode from 'react-geocode'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import Autocomplete from 'react-google-autocomplete';

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
    <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
      {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )
class Map extends Component{
    state = {
        isMarkerShown: false,
      }
    
      componentDidMount() {
        this.delayedShowMarker()
      }
    
      delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
      }
    
      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }
    
    render(){


        return(
            <View style={styles.container}>
            <MyMapComponent
                isMarkerShown = {this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
            </View>
        );
    }
}

export default Map;

const styles = StyleSheet.create ({
    container:{
        flex: 1,
    },
    marker:{

    }
}) 