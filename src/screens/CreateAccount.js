import React, { Component} from 'react';
import {View, Text, StyleSheet, AppRegistry,KeyboardAvoidingView,ScrollView,Alert, ActivityIndicator } from 'react-native';
import Loader from '../components/Loader';
import InputField from '../components/form/InputField';
import Notification from '../components/Notification';
import NextButton from '../components/buttons/NextButton';
import colors from '../styles/colors';
import firebase from 'react-native-firebase';
import Dashboard from './Dashboard'

class Create extends Component {
    static navigationOptions={
        title:'Create account',
        headerRight: <View/>
        
    }
    
    constructor(props){
        super(props)
        this.state={
            error:'',
            UserEmail:'',
            UserPassword:'',
            loading:false,
            validEmail:false,
            validPass:false
        }
    }



    onSignUpPress = () => {
        const{UserEmail,UserPassword} =  this.state;
        firebase
          .auth()
          .createUserWithEmailAndPassword(UserEmail, UserPassword)
          .then(() => this.props.navigation.navigate('Dashboard'))
          .catch(error => this.setState({ errorMessage: error.message }))
      }
    
    

    render() {
        const {validName,validEmail,validLastName,validPass} = this.state;
        return (
            <KeyboardAvoidingView style={styles.wrapper}>
            <View style={styles.container}>
            <Text style={styles.loginheader}>Crea tu Cuenta</Text>
            <ScrollView style={styles.ScrollView}>
                <InputField
                    labelText = "CORREO ELECTRONICO"
                    labelTextSize = {16}
                    labelColor = {colors.white}
                    textColor= {colors.white}
                    borderBottomColor = {colors.white}
                    inputType = "email"
                    customStyle = {{marginBottom:30}}
                    onChangeText = {UserEmail => this.setState({UserEmail})}
                    showCheckMark = {validEmail}
                    autoFocus = {true}
                    value = {this.state.UserEmail}
                />
                <InputField
                    labelText = "CONTRASEÑA"
                    labelTextSize = {16}
                    labelColor = {colors.white}
                    textColor = {colors.white}
                    borderBottomColor = {colors.white}
                    inputType = "password"
                    customStyle = {{marginBottom:30}}
                    onChangeText = {UserPassword => this.setState({UserPassword})}
                    showCheckMark = {validPass}
                    autoFocus = {true}
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                    value = {this.state.UserPassword}
                />
            </ScrollView>
            <View style={styles.button}>
            <NextButton
                handleNextButton = {this.onSignUpPress}
            />
            </View>
            </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Create;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        marginTop:20,
        flex: 1,
    },
    wrapper:{
        display:'flex',
        flex: 1,
        backgroundColor: colors.blue,
    },
    loginheader:{
        fontSize:36,
        color:colors.white,
        fontWeight: "500",
        marginBottom:10,
        left: 40
    }, 
    ScrollView:{
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        flex:1
    },
    button:{
        right: 15,
    }, 
    TextInputStyleClass: {
 
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
         borderColor: colors.white,
         
         // Set border Radius.
         borderRadius: 10 ,
         
        // Set border Radius.
         //borderRadius: 10 ,
        }
}) 