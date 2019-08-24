
import React, {Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight, TouchableOpacity ,ImageBackground, Button,ScrollView} from 'react-native';
import Colors from "../styles/colors";
import firebase from "react-native-firebase";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import RoundedButtons from "../components/buttons/RoundedButtons";
import { GoogleSignin,statusCodes } from 'react-native-google-signin';



GoogleSignin.configure();
//clase principal el main
 class LoggedOut extends Component{
   static navigationOptions={
     header:null
   }
  componentDidMount(){  
    this.getCurrentUserInfo();
    this.isSignedIn();

    GoogleSignin.configure({
      behavior:'web',
      iosClientId:'779754847012-pp2ja99lklsvac49huslitqvv0adfpa1.apps.googleusercontent.com',
      databaseURL: "https://route-7c21c.firebaseio.com",
      scopes: ['profile','email']
    }) 
    
  }

   isUserEqual = async (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  
   onSignIn =  async (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.id_token,
          googleUser.access_token,
          );
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(){
          console.log('user signed in');
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }; 

  // Te devuelve el Usuario que esta iniciado sesion
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        
      } else {
        // some other error
      }
    }
  };

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({ isLoginScreenPresented: !isSignedIn });
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      //Opcion de inicio de sesion con diferentes Usuarios
      const user = await GoogleSignin.getCurrentUserInfo();
      console.log(user);
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
     
  };
   
  //Cerrar Sesion
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  
  

  onCreateAccount(){
    alert('Create Account button pressed');
  }
  onSignUp(){
    alert("SignUp button pressed");
  }

  onMoreOptions(){
    alert('More option button press');
  }
  render() {
    return(
      //*la vista llamada a const style, objeto back
      <ScrollView style={styles.back}>
        <View style={styles.welcome}>
          <View style={styles.logoIcon}> 
            <Icon
            name="bus"
            color= {Colors.white}
            size={60}
            style={styles.icon}
            />
          </View>
            <Text style={styles.some}> Bienvenido</Text>
          
            <RoundedButtons
            text = "Inicia con Google"
            color={Colors.white}
            icon= {<Icon name="google" size={20} color={Colors.white} size ={25} style={styles.move} />}
            handleOnPress={()=> this.signIn()}
            />
            <RoundedButtons
              text="Inicia Sesion"
              color={Colors.white}
              handleOnPress={() => this.props.navigation.navigate('LogIn')}
            />
            <RoundedButtons
              text="Crea una cuenta"
              color={Colors.white}
              handleOnPress={()=> this.props.navigation.navigate('Create')}
            />
            <TouchableOpacity style={styles.moreOp}
              onPress={() => this.signOut()}
              activeOpacity={0.7}
              >
              <Text style={styles.moreOpText}>Cerrar Session</Text>
            </TouchableOpacity>

            <View style={styles.termsAndConds}>
              <Text style={styles.txtTerms}>By tapping Continue, Create Account or More</Text>
              <Text style={styles.txtTerms}> options, </Text>
              <Text style={styles.txtTerms}>I agree to Mi Ruta </Text>

              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.srvc}>Terms of service </Text>
              </TouchableHighlight>
              <Text style={styles.txtTerms}>,</Text>

              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.srvc}>Payments Terms of Service </Text>
              </TouchableHighlight>

              <Text style={styles.txtTerms}>,</Text>

              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.srvc}> Privacy Policy</Text>
              </TouchableHighlight>

              <Text style={styles.txtTerms}>, &</Text>

              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.srvc}>Nondiscrimination Policy. </Text>
              </TouchableHighlight>

          </View>
      </View>
      </ScrollView>
    );
  }
}

export default LoggedOut;

const styles=StyleSheet.create({
  back:{
    flex: 1,
    display:'flex',
    backgroundColor: Colors.blue,

  },
  logo:{
    width:80,
    height:73,
    marginTop:50,
    marginBottom:40,
    
  },
  welcome:{
    flex:1,
    display: "flex",
    marginTop: 45,
    padding: 30,
    
  },
  some:{
    fontSize:35,
    color:Colors.white,
    fontWeight: "500",
    bottom: 50
  },

  googleButtonIcon:{
    color: Colors.white,
    position: 'relative',
    left: 20,
    zIndex: 8,

  },
  moreOp:{
    marginTop:15,

  },
  moreOpText:{
    color : Colors.white,
    fontSize: 15,
  },
  txtTerms:{
    fontSize:13,
    fontWeight:'600',
    color : Colors.white,

  },
  termsAndConds:{
    flexWrap:'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop:30,
  },
  srvc:{
    color: Colors.white,
  },
  linkButton:{
    borderBottomWidth:1,
    borderBottomColor: Colors.white,

  },
  icon:{
    marginLeft: 2,
    marginTop: 3
  },
  logoIcon:{
    display:'flex',
    left: 15,
    top: 10,
    marginBottom:90,
  },
  move:{
  marginLeft:'10%',
  left :23
  }

});
