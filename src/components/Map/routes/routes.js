import Geojson from 'react-native-geojson';
import GeoJSON from 'geojson';
//import jsonData from 'ula.json'

const json = jsonData

const hola = GeoJSON.parse(json, {
    Point: ['latitude','longitude'],
}); 
export default hola;