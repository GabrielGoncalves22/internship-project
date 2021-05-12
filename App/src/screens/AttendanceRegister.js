import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt';

import { server, showError, showSuccess} from '../common';
import Header from '../components/Header';

const initialState = {
    lastAttendance: []
};

export default class App extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        this.lastAttendace()
    };

    lastAttendace = async () => {
        try {
            const res = await axios.get(`${server}/attendance`)
            this.setState({lastAttendance: res.data[0]})    
        } catch (error) {
            showError (error)
        }
    };

    postAttendace = async () => {
        try {
            const res = await axios.post(`${server}/attendance`)
            showSuccess(res.data)
            this.lastAttendace()
        } catch (error) {
            showError (error)
        }
    };

    render () {
        const dateLastAttendance = moment(this.state.lastAttendance.dateAttendance).locale('pt').format('LL')
        const hourLastAttendance = moment(this.state.lastAttendance.dateAttendance).locale('pt').format('LT')

        return (
            <View style = {styles.container}>
                <Header style = {styles.header}/>
                <View style = {styles.form}>
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
                <TouchableOpacity style = {styles.button} onPress = {this.postAttendace} activeOpacity = {0.8}>
                    <Icon style = {styles.iconButton}
                        name = {this.state.lastAttendance.typeAttendance === 'Entrada' ? 'door-closed' : 'door-open'} 
                        color = {this.state.lastAttendance.typeAttendance === 'Entrada' ? '#FF0000' : '#008000'}
                        size = {75}/>
                    <Text style = {styles.textButton}>{this.state.lastAttendance.typeAttendance === 'Entrada' ? 'Registar Saída' : 'Registar Entrada'}</Text>
                </TouchableOpacity>
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
    header: {
        
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',        
        width: '100%'
    },
    titleForm: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textForm: {
        fontSize: 25
    },
    button: {
        flex: 1,        
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',       
        padding: 25,
        width: '100%'   
    },
    textButton: {        
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 30
    },
    iconButton: {
        marginLeft: 30
    }
});