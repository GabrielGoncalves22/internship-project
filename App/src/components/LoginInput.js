import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {    
    return (
        <View style = {styles.container}>
            <Icon style = {styles.icon} name = {props.icon} size = {20}/>
            <TextInput style = {styles.input} {...props}/>
            {props.password 
            ? <TouchableOpacity style = {styles.iconPassword} activeOpacity = {0.8} onPress = {() => props.onChangeSecureTextEntry()}>
                    <Icon name = {props.secureTextEntry === true ? 'eye-slash' : 'eye'} size = {20}/>
              </TouchableOpacity>
            : null
            }            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 45,
        backgroundColor: '#FFF',
        borderRadius: 10, 
        borderWidth: 1,  
        borderColor: '#014A6E',
        marginBottom: 10
    },
    icon: {
        color: '#333',
        marginLeft: 15
    },
    input: {
        fontSize: 18,        
        width: '80%',
        marginLeft: 15        
    }
});