import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,ImageBackground,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../styles/colors';


class Profile extends Component {
    static navigationOptions ={
        title:'Profile',
        headerRight: <View/>
    }
    state = {currentUser: null } 
    render (){
        const {currentUser} = this.state
        return(
            <View style={styles.wrapper}>
                <Image style={styles.EditHeader} source={{uri:'https://i.pinimg.com/564x/8d/2d/22/8d2d2265b0585838497f4bca9e79165f.jpg'}}/>
                <Image style={styles.avatar} source={{uri:'https://i.pinimg.com/564x/34/46/c9/3446c9c0005649e8bc7b08da65395b09.jpg'}}/>
                <View  style={styles.guat}>
                    <View style={styles.guatContent}>
                        <Text style={styles.name}>Alex Salchichon</Text>
                        <Text style={styles.info}> TocinoMax123 </Text>
                        <Text style={styles.info}>Estudiante / Universidad</Text>
                        <Text style={styles.info}> Mail123@mail.com </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Profile;

const styles = StyleSheet.create({
    EditHeader: {
        height: 200,
    },
    guat:{
        marginTop:40,
    },
    guatContent:{
        flex:1,
        alignItems:'center',    
        padding: 30
    },
    name:{ 
        fontSize:28,
        color: colors.black,
        fontWeight: "600"

    },
    avatar:{
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
    },
    info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
    },
})