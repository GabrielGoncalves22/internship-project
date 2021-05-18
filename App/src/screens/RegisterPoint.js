import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt';

import { server, showError, showSuccess} from '../common';

const initialState = {
    lastAttendance: []
};

export default class App extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        this.lastAttendance()
    };

    lastAttendance = async () => {
        try {
            const res = await axios.get(`${server}/attendance`)
            this.setState({lastAttendance: res.data[0]})    
        } catch (error) {
            showError (error)
        }
    };

    postAttendance = async () => {
        try {
            const res = await axios.post(`${server}/attendance`)
            showSuccess(res.data)
            this.lastAttendance()
        } catch (error) {
            showError (error)
        }
    };

    render () {
        const dateLastAttendance = moment(this.state.lastAttendance.dateAttendance).locale('pt').format('LL')
        const hourLastAttendance = moment(this.state.lastAttendance.dateAttendance).locale('pt').format('LT')

        return (
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <IconAntDesign name = 'pushpino' size = {25} color = '#FFF'/>
                    <Text style = {styles.textHeader}>Registar Ponto</Text>                    
                </View>
                <View style = {styles.formContainer}>
                    <Text style = {styles.titleForm}>
                        Último Registo
                    </Text>
                    <Text style = {styles.textForm}>
                        {this.state.lastAttendance.typeAttendance}
                    </Text>
                    <Text style = {styles.textForm}>
                        {`${dateLastAttendance} às ${hourLastAttendance}`}
                    </Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style = {styles.button} onPress = {this.postAttendance} activeOpacity = {0.8}>
                        <Icon style = {styles.iconButton}
                            name = {this.state.lastAttendance.typeAttendance === 'Entrada' ? 'door-closed' : 'door-open'} 
                            color = {this.state.lastAttendance.typeAttendance === 'Entrada' ? '#FF0000' : '#008000'}
                            size = {75}/>
                        <Text style = {styles.textButton}>{this.state.lastAttendance.typeAttendance === 'Entrada' ? 'Registar Saída' : 'Registar Entrada'}</Text>
                    </TouchableOpacity>
                </View>
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
    headerContainer: {
        flex: 0.2, 
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
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',                
        width: '100%',
        borderColor: '#014A6E',
        borderBottomWidth: 1
    },
    titleForm: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#005580'
    },
    textForm: {
        fontSize: 25
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',          
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 50,
        width: '100%'
    },
    textButton: {        
        fontSize: 25,
        fontWeight: 'bold',        
        marginLeft: 30,
        color: '#005580',
    },
    iconButton: {
        marginLeft: 30
    }
});