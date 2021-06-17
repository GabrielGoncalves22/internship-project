import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { server, showError, showSuccess} from '../common';
import ChangePassword from './ChangePassword';

const initialState = {
    entity: [],
    employee: [],
    schedule: [],
    showChangePassword: false
};

export default class Settings extends Component {

    state = { 
        ...initialState 
    };

    componentDidMount = () => {
        this.getEntity()
        this.getEmployee() 
        this.getSchedule()       
    };

    logout = () => {        
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('pin')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    };

    getEntity = async () => {
        try {
            const res = await axios.get(`${server}/entity`)
            this.setState({entity: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getEmployee = async () => {
        try {
            const res = await axios.get(`${server}/employee`)
            this.setState({employee: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getSchedule = async () => {
        try {
            const res = await axios.get(`${server}/schedule`)
            this.setState({schedule: res.data})   
        } catch (error) {
            showError(error)
        }
    };

    viewEmployee = () => {
        let infoEmployee

        for (employee of this.state.employee) {
            infoEmployee = (
                <View style = {styles.employeeContainer}>
                    <Icon name = 'user-o' size = {75} color = '#014A6E'/>
                    <Text style = {styles.subTitle}>{employee.name}</Text>
                </View>
            )
        }

        return infoEmployee
    };

    viewEntity = () => {
        let infoEntity

        for (entity of this.state.entity) {
            infoEntity = (
                <View>
                    <Text style = {styles.secondaryText}>{entity.Name}</Text>
                    <Text style = {styles.secondaryText}>{entity.Address}</Text>
                    <Text style = {styles.secondaryText}>{entity.PostalCode} {entity.Locality}</Text>
                </View>
            )
        }

        return infoEntity
    };

    viewSchedule = () => {
        let infoSchedule

        for (schedule of this.state.schedule) {
            infoSchedule = (
                <View>
                    {infoSchedule}                                        
                    {schedule.description
                    ? <Text style = {styles.mainText}>{schedule.description} </Text>
                    : null} 
                    <Text style = {styles.secondaryText}>{schedule.startTime} - {schedule.endTime}</Text>                    
                </View>                
            )                            
        }

        return infoSchedule
    };

    render () {
        return (
            <View style = {styles.container}>
                <ChangePassword isVisible = {this.state.showChangePassword}
                    onCancel = {() => this.setState({showChangePassword: false})} />
                <View style = {styles.headerContainer}>
                    <IconAntDesign name = 'setting' size = {25} color = '#FFF'/>
                    <Text style = {styles.textHeader}>Definições</Text>                    
                </View>
                <View style = {styles.subContainer}>
                    {this.viewEmployee()}
                </View>                
                <View style = {styles.subContainer}>
                    <Text style = {styles.subTitle}>Empresa</Text>
                    {this.viewEntity()}
                </View>
                <View style = {styles.subContainer}>
                    <Text style = {styles.subTitle}>Meu Horário</Text>
                    {this.viewSchedule()}
                </View>
                <TouchableOpacity onPress = {() => this.setState({showChangePassword: true})}  activeOpacity = {0.8}>
                    <View style = {styles.optionsContainer}>
                        <Icon name = 'lock' size = {30} color = '#005580'></Icon>
                        <Text style = {styles.optionsText}>Alterar Palavra-Passe</Text>
                    </View>
                </TouchableOpacity>                
                <TouchableOpacity onPress = {this.logout} activeOpacity = {0.8}>
                    <View style = {styles.optionsContainer}>
                        <Icon name = 'sign-out' size = {30} color = '#005580'/>
                        <Text style = {styles.optionsText}>Terminar Sessão</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
    subContainer: {
        flex: 2.5,
        borderColor: '#AAA',
        borderBottomWidth: 1
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005580',
        margin: 10
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15
    },
    secondaryText: {
        fontSize: 15,
        marginLeft: 15,
        marginBottom: 5        
    },
    employeeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50
    },
    optionsContainer: {
        flexDirection: 'row',        
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderColor: '#AAA'  ,
        borderBottomWidth: 1   
    },
    optionsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005580',
        marginLeft: 10
    }
});