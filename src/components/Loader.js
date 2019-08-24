import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Colors from '../styles/colors'
import{
    View,
    Image,
    Modal,
    StyleSheet,
    Text,

}from 'react-native';

export default class Loader extends Component{
    render(){
        const {animationType, visible} = this.props;
        return(
            <Modal
            animationType={animationType} 
            transparent={true}
            visible={visible}
                >
            <View style={styles.wrapper}>
                <View style={styles.loaderContainer}>
                <Image 
                    style={styles.loaderImage}
                    source={require('../img/loading.gif')}
                    />
                </View>
            </View>
            </Modal>

        );
    }
}

Loader.propTypes={
    animationType: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,

}

const styles = StyleSheet.create({
    wrapper:{
        zIndex: 9 ,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,


    },
    loaderImage:{
        width: 90,
        height: 90,
        
    },
    loaderContainer:{
        width:90,
        height:90,
        position: 'absolute',
        left:'50%',
        top:'50%',
        marginLeft:-45,
        marginTop:-45,

    },
})