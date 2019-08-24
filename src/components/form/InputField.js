import React,{ Component } from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Colors from '../../styles/colors';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,  
    Easing,
    Animated

}from 'react-native';


export default class InputField extends Component{
    constructor(props){
        super(props);
        this.state = {
            secureInput: props.inputType === 'text' || props.inputType === 'email' ? false : true,
            scaleCheckMarkValue: new Animated.Value(0),
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.scaleCheckMark = this.scaleCheckMark.bind(this);
    }
    
    scaleCheckMark(value){
        Animated.timing(
            this.state.scaleCheckMarkValue,
            {
                toValue: value,
                duration: 400,
                easing: Easing.easeOutBack,

            }
        ).start();
    }

    toggleShowPassword(){
        this.setState({secureInput: ! this.state.secureInput});
    }
    render(){
        const {
            labelText,
            labelTextSize,
            labelColor,
            textColor,
            borderBottomColor,
            inputType,
            customStyle,
            onChangeText,
            showCheckMark,
            autoFocus,
            autoCapitalize
        } = this.props;
        
        // tamaño de la letra 
        const fontSize = labelTextSize || 20;

        const {secureInput,scaleCheckMarkValue}= this.state;
        // color de la linea
        const color = labelColor || Colors.white
        //color de la letra de entrada
        const inputColor = textColor || Colors.white
        // linea inferior del input
        const  bottomLine = borderBottomColor || 'transparent'; 
        const keyboardType = inputType === 'email' ? 'email-address' : 'default';
        const iconScale =  scaleCheckMarkValue.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[0.01,1.6,1],
        });

        const scaleValue = showCheckMark ? 1:0 ;
        this.scaleCheckMark(scaleValue); 

        return(
            <View style = {[customStyle,styles.wrapper]}>
                <Text style = {[{color,fontSize},styles.label]}>{labelText}</Text>
                {inputType === 'password' ? 
                    <TouchableOpacity
                    style = {styles.showButton}
                    onPress = {this.toggleShowPassword}
                    >
                        <Text style = {styles.showButtonText} >{secureInput ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                 : null 
                }
                
                <Animated.View style = {[{transform: [{scale: iconScale}] },styles.checkWrapper]}>
                <Icon
                    name ='check'
                    color = {Colors.white}
                    size = {20}
                />
                </Animated.View>
                <TextInput
                    autoCorrect = {false}
                    style = {[{
                        color: inputColor, 
                        borderBottomColor: bottomLine,
                    },
                        styles.inputField,
                    ]}
                    secureTextEntry = {secureInput}
                    onChangeText = {onChangeText}
                    keyboardType = {keyboardType}
                    autoFocus = {autoFocus}
                    autoCapitalize = {autoCapitalize}
                    autoCorrect={false}
                />
            </View>
        );
    }
}

InputField.propTypes = {
    labelText: PropTypes.string.isRequired, 
    labelTextSize: PropTypes.number,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    customStyle:PropTypes.object,
    onChangeText: PropTypes.func,
    showCheckMark: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    autoCapitalize: PropTypes.bool,
};

const styles = StyleSheet.create({
    wrapper:{
        display:'flex',

    },
    label:{
        fontWeight:'700',
        marginBottom: 20,

    },
    inputField:{
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,

    },
    showButton:{
        position: 'absolute',
        right:0
    },
    showButtonText:{
        color: Colors.white,
        fontWeight: '800',
    },  
    checkWrapper:{
        position: 'absolute',
        right: 0,
        bottom: 15,

    },

});

