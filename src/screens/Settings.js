import React,{Component} from 'react';
import {Text,View,StyleSheet,Button} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../styles/colors';
import firebase from 'react-native-firebase';


class Settings extends Component {
    static navigationOptions={
        title:'Settings',
        headerRight: <View/>
    }
    handleSignOut= () =>{
        firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('LoggedOut'))
        .catch(function(error) {   
              alert(error) 
          });
          
    }
    render (){
        return(
            <View style={styles.wrapper}>
                <Text style={styles.some}>Settings</Text>
                <Button title="Sign Out" onPress={this.handleSignOut}/>
            </View>
        )
    }
}

export default Settings;

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent : 'center'
    },
    some:{
        fontWeight: "bold",
        fontSize:22,
        color: colors.white
    },
    Icon: {
        width:26,
        height: 26,

    }
})