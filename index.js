/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {TabNavigator} from 'react-navigation';

import App from './App';
import {name as appName} from './app.json';
import Dasboard from './src/screens/Dashboard';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import {Home,profile,settings} from './ScreenNames'

//let routeConfigs = {
    //Home: {
      //  screen: Dasboard,
    //},
    //profile:{
    //    screen: Profile,
    //},
    //settings:{
     //   screen: Settings,
    //}
//};

//let tabNavigatorConfigs = {
  //  tabBarPosition: 'bottom',
    //animationEnabled: true,
    //swipeEnabled: true,
//}

//const App = TabNavigator(routeConfigs, tabNavigatorConfigs);
AppRegistry.registerComponent(appName, () => App);
