import React , { Component } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import axios from 'axios';

import { server, showError, showSuccess} from '../common';

const initialState = {    
    currentPassword: "",
    newPassword: "",
    repetitionPassword: ""
};

export default class ChangePassword extends Component {
    state = {
        ...initialState
    };

    putEmployeePassword = async () => {
        if (!this.state.currentPassword || !this.state.newPassword || !this.state.repetitionPassword) {
            showError('Dados Incompletos')
        } else if (this.state.newPassword != this.state.repetitionPassword) {
            showError('A repetição da palavra-passe não coincide!')
        } else {
            try {
                const res = await axios.put(`${server}/employee/password`, {currentPassword: this.state.currentPassword, newPassword: this.state.newPassword })
                showSuccess(res.data)
            } catch (error) {
                showError(error)
            }
            
            this.setState({...initialState})
            this.props.onCancel()            
        }
    };

    render () {
        return (
            <Modal transparent = {true} visible = {this.props.isVisible}
                onRequestClose = {this.props.onCancel}
                animationType = 'fade'>
            <TouchableWithoutFeedback onPress = {this.props.onCancel}>
                <View style = {styles.background}/>
            </TouchableWithoutFeedback>
            <View style = {styles.container}>
                <Text style = {styles.header}>Alterar Palavra-Passe</Text>
                <View style = {styles.form}>
                    <Text style = {styles.labelTextInput}>Palavra-passe atual:</Text>
                    <TextInput style = {styles.textInput}
                        secureTextEntry = {true}
                        value = {this.state.currentPassword}
                        onChangeText = {(currentPassword) => this.setState({currentPassword})}
                    />
                    <Text style = {styles.labelTextInput}>Nova palavra-passe:</Text>
                    <TextInput style = {styles.textInput}
                        secureTextEntry = {true}
                        value = {this.state.newPassword}
                        onChangeText = {(newPassword) => this.setState({newPassword})}
                    />
                    <Text style = {styles.labelTextInput}>Repetir palavra-passe:</Text>
                    <TextInput style = {styles.textInput}
                        secureTextEntry = {true}
                        value = {this.state.repetitionPassword}
                        onChangeText = {(repetitionPassword) => this.setState({repetitionPassword})}
                    />
                </View>
                <View style = {styles.buttons}>
                    <TouchableOpacity onPress = {this.props.onCancel} activeOpacity = {0.5}>
                        <Text style = {styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {this.putEmployeePassword} activeOpacity = {0.5}>
                        <Text style = {styles.textButton}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress = {this.props.onCancel}>
                <View style = {styles.background}/>
            </TouchableWithoutFeedback>
            </Modal>
        )
    };
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    labelTextInput: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15
    },
    textInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#014A6E',
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005580',
        margin: 25,
        marginRight: 30
    }
});