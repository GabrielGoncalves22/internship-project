import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Header from '../components/Header';
import LoginInput from '../components/LoginInput';
import { server, showError, showSuccess } from '../common';

const initialState = {
    email: '',
    password: '',
    securePassword: true,
    remember: false    
};

export default class App extends Component {
    state = {
       ...initialState 
    };

    login = async () => {
        try {
            const res = await axios.post(`${server}/login`,{
                email: this.state.email,
                password: this.state.password
            })

            if (this.state.remember) {
                AsyncStorage.setItem('token', res.data.token)
            } 

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')           

        } catch (error) {
            showError(error)
        }
    };

    render () {
        const validForm = this.state.email && this.state.password && this.state.email.includes('@')
        return (
            <View style = {styles.container}>
                <Header/>
                <View style = {styles.form}>
                    <LoginInput icon = 'at' placeholder = 'Email'
                        value = {this.state.email}
                        onChangeText = {email => this.setState({email})} 
                    />
                    <LoginInput icon = 'lock' placeholder = 'Palavra-passe' 
                        password onChangeSecureTextEntry = {() => this.setState({securePassword: !this.state.securePassword})}
                        secureTextEntry = {this.state.securePassword}
                        value = {this.state.password}                    
                        onChangeText = {password => this.setState({password})}
                    />                
                    <View style = {styles.containerCheckBox}>
                        <CheckBox
                            value = {this.state.remember}
                            onValueChange = {remember => this.setState({remember})}
                        />
                        <Text style = {styles.textCheckbox}>Lembrar</Text>
                    </View>
                    <TouchableOpacity onPress = {this.login}
                        disabled = {!validForm} activeOpacity = {0.8}>
                        <View style = {[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style = {styles.buttonText}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    form: {
        flex: 1,
        padding: 25
    },
    button: {
        backgroundColor: '#005580',
        height: 45,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    containerCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10 
    },
    textCheckbox: {
        fontSize: 18
    }
});