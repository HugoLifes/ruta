import React,{Component} from 'react';
import {View,Text,StyleSheet, ActivityIndicator, Button,TouchableHighlight} from 'react-native';
import Colors from "../../styles/colors";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class GoogleButton extends Component{
   
    render (){
    const { text,backgroundColor,color,handleOnPress,icon } = this.props;
    const bkColor = backgroundColor || 'transparent';
    const colors = color || Colors.white
        return (
            <TouchableHighlight onPress={handleOnPress} style={[{backgroundColor: bkColor},styles.idnnow]}>
            <View style={styles.buttonTextWrapper}>
                {icon}
            <Text style={[ {color:colors}, styles.buttonText] }>{ text }</Text>
            </View>
            </TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create ({
    idnnow:{
        display: 'flex',
        padding: 17,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.white,
        marginBottom: 15,
        alignItems: 'center'
    },
    buttonTextWrapper:{
        flexDirection:'row',
        justifyContent:'flex-end',
  
    },
    buttonText:{
      fontSize: 19,
      width: '100%',
      textAlign:'center'
  
    },
}) ;


