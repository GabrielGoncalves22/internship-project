import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import LoginInput from '../components/LoginInput';
import { server, showError, showSuccess } from '../common';

const initialState = {
    email: '',
    password: '',
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

            if (remember) {
                AsyncStorage.setItem('token', res.data.token)
            }
            
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`

            this.props.navigation.navigate('AttendanceRegister')            

        } catch (error) {
            showError(error)
        }
    };

    render () {
        const validForm = this.state.email && this.state.password && this.state.email.includes('@')
        return (
            <View style = {styles.container}>
                <View style = {styles.form}>
                    <LoginInput icon = 'at' placeholder = 'Email'
                        value = {this.state.email}
                        onChangeText = {email => this.setState({email})} 
                    />
                    <LoginInput icon = 'at' placeholder = 'Palavra-passe' 
                        secureTextEntry = {true}
                        value = {this.state.password}                    
                        onChangeText = {password => this.setState({password})}
                    />
                </View>
                <View style = {styles.containerCheckBox}>
                    <CheckBox
                        value = {this.state.remember}
                        onValueChange = {remember => this.setState({remember})}
                    />
                    <Text>Lembrar</Text>
                </View>
                <TouchableOpacity onPress = {this.login}
                    disabled = {!validForm}>
                    <View style = {[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                        <Text style = {styles.buttonText}>Entrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        padding: 20,
        width: '90%'
    },
    button: {
        backgroundColor: '#005580',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15
    },
    containerCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});