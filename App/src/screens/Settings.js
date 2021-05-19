import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Settings extends Component {

    logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('token')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    };

    render () {
        return (
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <IconAntDesign name = 'setting' size = {25} color = '#FFF'/>
                    <Text style = {styles.textHeader}>Definições</Text>                    
                </View>
                <View style = {styles.perfilContainer}>

                </View>
                <TouchableOpacity onPress = {this.logout} activeOpacity = {0.8}>
                    <View style = {styles.logoutContainer}>
                        <Icon name = 'sign-out' size = {30} color = '#005580'/>
                        <Text style = {styles.textLogout}>Terminar Sessão</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#005580',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 20
    },
    perfilContainer: {
        flex: 9.5
    },
    logoutContainer: {
        flexDirection: 'row',        
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderColor: '#AAA',
        borderTopWidth: 1        
    },
    textLogout: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005580',
        marginLeft: 10
    }
});