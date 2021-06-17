import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Header from '../components/Header';
import { isNetworkAvailable, showError } from '../common';

export default class LoginOrHome extends Component {
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        const pin = await AsyncStorage.getItem('pin')

        if (await isNetworkAvailable()) {
        
            setTimeout(() => {
                if (token && pin) {
                    axios.defaults.headers.common['Authorization'] = `bearer ${token}`            
                    this.props.navigation.navigate('InsertPin')          
                } else {            
                    this.props.navigation.navigate('Login')              
                }
            }, 2000);

        } else {
            showError('Sem conexão à internet. Certifique-se de que o wi-fi ou os dados móveis estão ligados e inicie novamente a aplicação!')
        }

    };

    render() {
        return (
            <View style = {styles.container}>
                    <Header/>
                    <ActivityIndicator  style = {styles.activityIndicator} size = 'large' color = "#005580"/>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
        backgroundColor: '#FFF'
    },
    activityIndicator: {
        flex: 1,
        marginTop: -500        
    }
});