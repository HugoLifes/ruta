import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Colors from '../styles/colors';
import InputField from '../components/form/InputField';
import Notification from '../components/Notification';
import NextButton from '../components/buttons/NextButton';
import Loader from '../components/Loader';




export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            formValid: true,
            loadingVisible: false,
            validEmail: false,
            emailAddress: '',

        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }
    
    handleEmailChange(email){
        const emailCheckRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {validEmail} = this.state;
        this.setState({emailAddres: email});

        if(!validEmail){
            if(emailCheckRegex.test(email)){
                this.setState({validEmail: true})
            }
        }else{
            if(!emailCheckRegex.test(email)){
                this.setState({validEmail: false})
            }
        }
    }
    goToNextStep(){
        const {emailAddress} = this.state;
        this.setState({loadingVisible: true});
        setTimeout(() => {
          if(emailAddress === 'wrong@email.com'){
            this.setState({
                loadingVisible: false,
                formValid: true,
            });

          } else {
              this.setState({
                loadingVisible: false,
                formValid: false,
              });
          }  
        }, 2000);
    }

    handleCloseNotification(){
        this.setState({formValid: true });
    }

    render(){
        const {loadingVisible, formValid, validEmail} = this.state;
        const background = formValid ? Colors.blue : Colors.red;
        const showNotification = formValid ? false : true;
        const notificationMarginTop = showNotification ? 10 : 0;
        return(
            <KeyboardAvoidingView
                style={[{backgroundColor: background},styles.wrapper]}
                behavior="padding"
            >
        
            <View style={styles.passwordWrapper}>
            <ScrollView style={styles.ScrollView}>
            <Text style={styles.forgotPasswordHead}>Olvidaste tu contraseña?</Text>
            <Text style={styles.forgotPasswordSubHeading}>Introduce tu email para encontrarte</Text>
            <InputField
                labelText="CORREO ELECTRONICO"
                labelTextSize = {16}
                labelColor = {Colors.white}
                textColor = {Colors.white}
                borderBottomColor = {Colors.white}
                inputType = "email"
                customStyle = {{marginBottom:34}}
                onChangeText = {this.handleEmailChange}
                showCheckMark = {validEmail}
                autoFocus={true}
                
            />
            </ScrollView>
                <NextButton
                    handleNextButton={this.goToNextStep}
                    disabled={!validEmail}
                />
           
            <View style={[styles.NotificationWrapper, {marginTop: notificationMarginTop}]}>
                <Notification
                    showNotification={showNotification}
                    handleCloseNotification = {this.handleCloseNotification}
                    type = 'Error'
                    firstLine = "El email introducido no existe"
                    secondLine = "Porfavor introduzca un email valido"
                />
            </View>
            </View>
            <Loader
                visible={loadingVisible}
                animationType = "fade"
            />
            
           
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flex: 1,        
    },
    forgotPasswordHead:{
        fontSize: 29,
        color: Colors.white,
        fontWeight: "300",
    },  
    passwordWrapper:{
        flex: 1,
        marginTop: 98,
        paddingLeft: 19,
        paddingRight: 20,
    },
    forgotPasswordSubHeading:{
        fontSize: 15,
        color: Colors.white,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 60,
        
    },
    NotificationWrapper:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
    },
    ScrollView:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        flex:1
    }
});