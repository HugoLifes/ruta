import React, { Component } from "react";
import {PropTypes } from 'prop-types';
import Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {View, Text, TouchableOpacity, StyleSheet,Easing,Animated} from 'react-native';

export default class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            positionValue: new Animated.Value(-60),

        };
        this.closeNotification = this.closeNotification.bind(this);
        this.animatedNotification = this.animatedNotification.bind(this);
       
    }
    animatedNotification(value){
        const {positionValue} = this.state
        Animated.timing(
            positionValue,{
                toValue: value,
                duration: 300,
                velocity: 3,
                tension: 2,
                friction: 8,
                easing: Easing.easeOutBack,
            }

        ) .start();
    }
    closeNotification(){
        this.props.handleCloseNotification();
    }
    render(){
        const {type, firstLine, secondLine, showNotification} = this.props;
        const{positionValue} = this.state;
        showNotification ? this.animatedNotification(0) : this.animatedNotification(-60);

        return(
            <Animated.View style={[{marginBottom: positionValue},styles.wrapper]}>
                <View style={styles.notificationContent}>
                <View style={styles.errorMessage}>
                    <Text style={styles.errorText}>{type}</Text>    
                    <Text sytle={styles.errorMessage}>{firstLine}</Text>
                </View>
                    <Text sytle={styles.errorMessage}>{secondLine}</Text>
                </View>
                <TouchableOpacity style={styles.closeButton}
                    onPress={this.closeNotification}
                >
                 <Icon
                    size={20}
                    name="times"
                    color={Colors.lightGray}
                 />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

Notification.propTypes={
    showNotification: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    firstLine: PropTypes.string,
    secondLine: PropTypes.string,
    handleCloseNotification: PropTypes.func,
   

};

const styles = StyleSheet.create({
    wrapper:{   
        backgroundColor: Colors.white,
        height: 60,
        width: '100%',
        padding: 10,
    },
    notificationContent:{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    errorText:{
        color: Colors.red,
        marginRight: 5,
        fontSize: 14,
        marginBottom: 2,
       
        
    },
    errorMessage:{
        flexDirection:'row',
        marginBottom: 2,
        fontSize: 30,
    },  
    errorMessageContainer: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 3,
    },
    closeButton:{
        position:'absolute',
        right: 20,
        top:10,
        zIndex: 999,
    }
    
})