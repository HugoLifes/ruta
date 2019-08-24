import React, {Component} from 'react';
import {Platform,Navigator,StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import LoggedOut from './src/screens/LoggedOut'
import LogIn from './src/screens/LogIn';
import ForgotPassword from './src/screens/ForgotPassword';
import {TabNavigator, createAppContainer,createStackNavigator} from 'react-navigation'
import LoadingScreen from './src/screens/LoadingScreen';
import Dashboard from './src/screens/Dashboard';
import Create from './src/screens/CreateAccount';
import {db} from './src/config/db';
import { YellowBox } from 'react-native';
import Color from './src/styles/colors/index';
import { GoogleSignin,statusCodes } from 'react-native-google-signin';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import {Home,profile,settings} from './ScreenNames'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

firebase.initializeApp(db);

class App extends Component{
  
  render() {
    return(
      <AppNavigator/>
    );
  }
}
export default App;


const AppSwitchNavigator = createStackNavigator({
    LoadingScreen: LoadingScreen,
    LoggedOut:LoggedOut,
    LogIn:LogIn,
    Create:Create,
    Dashboard:Dashboard
},
{
  initialRouteName:'LoggedOut',
  defaultNavigationOptions:{
    headerStyle:{
          backgroundColor: Color.blue
      },
      headerTintColor: Color.white,
      headerTitleStyle:{
        textAlign:'center',
        flex:1
      }

  }

}
);

const AppNavigator = createAppContainer(AppSwitchNavigator);