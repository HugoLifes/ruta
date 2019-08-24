import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Colors  from '../../styles/colors';
import {
    TouchableHighlight,
    StyleSheet,
    View

} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class NextButton extends Component{
    render(){
        const { disabled, handleNextButton } = this.props;
        const opacityStyle = disabled ? 0.2 : 0.6;
        return(
            <View style={styles.nextButton}>
                <TouchableHighlight
                    style={[{opacity: opacityStyle},styles.button]}
                    onPress={handleNextButton}
                    disabled={disabled}
                >
                    <Icon
                        name = "angle-right"
                        color={Colors.blue}
                        size = {33}
                        style={styles.icon}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

NextButton.propTypes = {
    disabled:PropTypes.bool ,
    handleNextButton: PropTypes.func,
};

const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: Colors.white,
        bottom: 25,
        right: 5,
        left: 5
    },
    icon:{
        marginRight: -2,
        marginTop:-3,

    },
    nextButton:{
        alignItems:'flex-end',
        right: 16,
        bottom: 14,
    
    },
});