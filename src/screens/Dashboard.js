import React,{Component} from 'react';
import {StyleSheet,Text,View} from 'react-native'
import firebase from 'react-native-firebase';
import Map from '../components/Map';
import Map2 from '../components/Map/guat';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import Profile from './Profile';
import Settings from './Settings';


export class Dashboard extends Component{
    static navigationOptions={
        title:'Home',
        headerRight: <View/>
    }
    render(){
        return( <Map/>); 
    }
}    
export default createAppContainer(createBottomTabNavigator(
    {
        Home:{screen:Dashboard},
        Profile:{screen:Profile},
        Settings:{screen:Settings}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon:({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if(routeName === 'Home'){
                    iconName = `location-arrow${focused ? '' : ''}`;
                } else if (routeName === 'Settings'){
                    iconName = `cog${focused ? '' : ''}`;
                } else if (routeName === 'Profile'){
                    iconName = `user-circle${focused ? '' : ''}`;
                }
                return <Icon name={iconName} size={25} color={tintColor} />
            }
        }),
        tabBarOptions:{
            activeTintColor: colors.blue,
            inactiveTintColor: 'gray'
        },
    },
));




const styles = StyleSheet.create ({
    wrapper:{
        flex:1,
        backgroundColor: colors.blue,
        alignItems: "center",
        justifyContent: 'center'    

    },
    Icon: {
        width:26,
        height: 26,

    }
})


