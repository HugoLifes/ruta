import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {View,Image,Text,ScrollView,StyleSheet,KeyboardAvoidingView,ImageBackground} from 'react-native';
import Colors from '../styles/colors';
import InputField from '../components/form/InputField';
import Notification from '../components/Notification';
import NextButton from '../components/buttons/NextButton';
import Loader from '../components/Loader';
import firebase from 'react-native-firebase';
import Dashboard from './Dashboard' 

export default class LogIn extends Component{
    static navigationOptions={
        title:'LogIn',
        headerRight: <View/>
    }

    constructor(props){
        super(props);
        this.state = {
            formValid: true,
            validEmail: '',
            emailAddress: '',
            validPassword: '',
            loadingVisible: false,
            errorMessage: null,
            validMark: false
        }
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    }

   

    handleLogin = () => {
        const { validEmail,validPassword } = this.state
        firebase
          .auth()
          .signInWithEmailAndPassword(validEmail, validPassword)
          .then(() => this.props.navigation.navigate('Dashboard'))
          .catch(function(error){
                alert(error)
          });
      }

    handleCloseNotification(){
        this.setState({formValid: true });
    }

    
     toggleNextButtonState(){
         const {validEmail, validPassword} = this.setState;
         if(validEmail && validPassword){
             return false;
         } 
         return true;
     }   


    render(){
        const {formValid, loadingVisible, validEmail, validPassword, validMark} = this.state;
        const showNotification = formValid ? false: true;
        const background = formValid ? Colors.blue : Colors.red;
        const notificationMarginTop = showNotification ? 10 : 0;
        return(
            
            <KeyboardAvoidingView style = {[{backgroundColor: background},styles.wrapper]} behavior = "padding" enabled>
                <View style = {styles.ScrollViewWrapper}>
                <Text style = {styles.loginheader}>Inicia Sesión</Text>
                    <ScrollView style = {styles.ScrollView}>
                        
                        <InputField
                            labelText = "CORREO ELECTRONICO"
                            labelTextSize = {16}
                            labelColor = {Colors.white}
                            textColor = {Colors.white}
                            borderBottomColor = {Colors.white}
                            inputType = "email"
                            customStyle = {{marginBottom:34}}
                            onChangeText = {validEmail => this.setState({validEmail})}
                            showCheckMark = {validMark}
                            autoFocus={true}
                        />
                        <InputField
                            labelText = "CONTRASEÑA"
                            labelTextSize = {16}
                            labelColor = {Colors.white}
                            textColor = {Colors.white}
                            borderBottomColor = {Colors.white}
                            inputType = "password"
                            customStyle = {{marginBottom:34}}
                            onChangeText = {validPassword => this.setState({validPassword})}
                            showCheckMark = {validMark}
                        />
                    
                    
                    </ScrollView>
                   <View style={styles.button}>
                        <NextButton
                            handleNextButton = {this.handleLogin}
                            disable = {this.toggleNextButtonState()}
                        />
                    </View>
                </View>
                    <Loader
                        visible = {loadingVisible}
                        animationType = "fade"
                    />
                <View style = {[styles.notificatioWrapper, {marginTop: notificationMarginTop}]}>
                    
                <Notification
                 showNotification = {showNotification}
                 handleCloseNotification = {this.handleCloseNotification}
                 type = "Error"
                 firstLine = "Esas credenciales no se ven bien."
                 secondLine = "Porfavor intente de nuevo."
                />
                </View>
            </KeyboardAvoidingView>   
        );

    }

}

const styles = StyleSheet.create({
back:{
    flex: 1,
    display:'flex',
    width: '100%',
    height: '100%'
},
wrapper:{
    display:'flex',
    flex: 1,
    
},
ScrollViewWrapper:{
    display: 'flex',
    marginTop: 20,
    flex: 1,
    position: 'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
},
ScrollView:{
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    flex:1
},
loginheader:{
    fontSize:36,
    color:Colors.white,
    fontWeight: "500",
    marginBottom: 10,
    left:38
},
notificatioWrapper:{
    position: 'absolute',
    bottom: 0,
    
},
button:{
    right: 15,
    
},
})

