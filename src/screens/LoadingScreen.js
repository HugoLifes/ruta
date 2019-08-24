import React,{Component} from 'react';
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';



class LoadingScreen extends Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Dashboard' : 'LoggedOut')
          })
    }
    
    render (){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
}) 