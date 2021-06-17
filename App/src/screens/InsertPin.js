import React, { Component } from 'react'
import { Modal, View, Text, TextInput , TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {    
    writtenPin: '',    
    originalPin: ''
};

export default class InsertPin extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        const pin = await AsyncStorage.getItem('pin')
        if (pin) {
            this.setState({originalPin: pin})
        }         
    };

    checkPin = () => {
        if (this.state.writtenPin.length != 6) {
            Alert.alert('Registo de Assiduidade', 'O Pin deve conter 6 digitos!')
        
        } else if (this.state.originalPin) {
            
            if (this.state.originalPin === this.state.writtenPin) {
                this.props.navigation.navigate('Home')                  
            } else {
                Alert.alert('Registo de Assiduidade', 'O Pin encontra-se inválido!')
            }

        } else {
            AsyncStorage.setItem('pin', this.state.writtenPin)
            this.props.navigation.navigate('Home')
        }        
    };

    render () {
        return (
            <Modal transparent = {true} animationType = 'fade'>
                <TouchableWithoutFeedback>
                    <View style = {styles.background}/>
                </TouchableWithoutFeedback>
                <View style = {styles.container}>
                    <Text style = {styles.header}>{this.state.originalPin ? "Insira o Pin" : "Crie Pin"}</Text>
                    <Text style = {styles.subHeader}>{this.state.originalPin ? "Insira o pin para iniciar sessão" : "Crie um pin para futuros inícios de sessões"}</Text>
                    <View styles = {styles.form}>
                        <TextInput
                            style = {styles.textInput}
                            keyboardType = 'numeric'
                            maxLength = {6}
                            secureTextEntry = {true} 
                            placeholder = 'Pin'
                            value = {this.state.writtenPin}
                            onChangeText = {pin => this.setState({writtenPin: pin})}                        
                        />
                    </View>
                    <View style = {styles.button}>
                        <TouchableOpacity onPress = {this.checkPin} activeOpacity = {0.5}>
                            <Text style = {styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback>
                    <View style = {styles.background}/>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
};

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#005580',
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    subHeader: {
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    form: {
        padding: 300,
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005580',
    }
});