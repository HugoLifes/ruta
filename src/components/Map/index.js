import React , {Component, Fragment} from 'react';
import {View,Text,StyleSheet, ActivityIndicator,Dimensions} from 'react-native';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Search from '../buttons/search'
import Directions from '../directions/direction';
import {getPixelSize} from '../utils';
import {LocationBox, LocationText} from './style';
import firebase from 'react-native-firebase'
import img from '../../img/marker.png'
import Polyline from '@mapbox/polyline';

var ref = firebase.database().ref("Buses/features/0/geometry/coordinates/0");
const kml_file = "";
class Map extends Component{

    constructor(props){
     super(props);
     this.state = {
        region: null,
        destination: null ,
        arrdata:[]
     };
     this.onKmlReady = this.onKmlReady.bind(this);
    }
    
    
    onKmlReady(){
        this.mapView.fitToElements(true);
    }
       async componentDidMount () {
         navigator.geolocation.getCurrentPosition(
            ({coords:{latitude, longitude}}) => {
            this.setState({
                region:{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,  
                    longitudeDelta: 0.0134,
                    }
           });
        },//success
        (e)=>console.log(e.message),//error
        {
            timeout: 2000,
            enableHighAccuracy: true,
            maximumAge: 1000,
        }
        );
        ref.on('value').then(snapshot => {
            console.log(snapshot.val())
            var buses = [];
            snapshot.forEach((child)=>{
                buses.push({
                    coordinates: child.val().coordinates,
                    geometry: child.val().geometry,
                    properties: child.val().properties,
                    
                      
                });
            });
    
            this.setState({arrdata:buses})
        },        
            (e)=>console.log(e.message),
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
     }
     

     handleLocationSelected = (data,{geometry}) => {
        const {location:{lat:latitude, lng:longitude}} = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text
            }
        })
     }
     
    render(){
        const {region,destination} = this.state;

        return(
            <View style={styles.container}>
            <MapView
            style={{flex:1}}
            region={region}
            showsUserLocation = {true}
            loadingEnabled = {true}
            ref = {el => this.mapView = el}
            followUserLocation = {true}
            kmlSrc = {kml_file}
            onKmlReady = {this.onKmlReady}
            >
            
        {destination && (
            <Fragment>
             <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                    this.mapView.fitToCoordinates(result.coordinates,{
                        edgePadding:{
                            right: getPixelSize(50),
                            left: getPixelSize(50),
                            top: getPixelSize(50),
                            bottom:getPixelSize(50),
                        }
                    });
                }}
             />
             <Marker 
             coordinate={region}
             anchor = {{x:0,y:0}}
             >
                <LocationBox>
                    <LocationText>
                    {destination.title}
                    </LocationText>
                </LocationBox>
             </Marker>
            </Fragment>
        )}
        </MapView>
        <Search
            onLocationSelected={this.handleLocationSelected}
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
}) 
