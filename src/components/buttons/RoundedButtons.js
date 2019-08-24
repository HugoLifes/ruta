import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from "../../styles/colors";

export default class RoundedButtons extends Component{
  render(){
    const { text,backgroundColor,color,handleOnPress,icon } = this.props;
    const bkColor = backgroundColor || 'transparent';
    const colors = color || Colors.white;
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress} style={[{backgroundColor: bkColor},styles.idnnow]}>
      <View style={styles.buttonTextWrapper}>
        {icon}
        <Text style={[ {color:colors}, styles.buttonText] }>{ text }</Text>
      </View>
      </TouchableOpacity>
    );
  }
}

RoundedButtons.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    icon: PropTypes.object,
    handleOnPress: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
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
});
