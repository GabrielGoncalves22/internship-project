import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import TouchId from 'react-native-touch-id';

const optionalConfigObject = {
    title: 'Conexão Biométrica',
    sensorDescription: 'Toque no sensor de impressão digital',
    sensorErrorDescription: 'Não reconhecida',
    cancelText: 'Cancelar'
};

export default class Biometric extends Component {
    
    componentDidMount = () => {
            TouchId.authenticate('', optionalConfigObject).then(() => {
                this.props.navigation.navigate('Home')
            }).catch(() => {
                this.cancel()
            }) 
    };

    cancel = () => {        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    };

    render () {
        return (
            <View>
            </View>
        )
    }
};