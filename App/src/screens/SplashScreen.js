import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Header from '../components/Header';

export default class LoginOrHome extends Component {
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        
        setTimeout(() => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `bearer ${token}`            
                this.props.navigation.navigate('Home')          
            } else {            
                this.props.navigation.navigate('Login')              
            }
        }, 2000);
    }

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0FFFF'
    },
    activityIndicator: {
        flex: 1,
        marginTop: -500        
    }
});