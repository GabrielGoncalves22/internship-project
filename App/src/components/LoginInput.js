import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    return (
        <View style = {styles.container}>
            <Icon style = {styles.icon} name = {props.icon} size = {20}/>
            <TextInput style = {styles.input} {...props}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        color: '#333',
        marginLeft: 15
    },
    input: {        
        width: '75%',
        marginLeft: 15,
        fontSize: 18
    }
});