import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/pt';

import { server, showError, showSuccess} from '../common';
import Record from '../components/Record';
import FilterRecords from './FilterRecords';

const initialState = {
    listAttendance: [],
    showFilterRecords: false
};

export default class MyRecords extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        this.focusListener = this.props.navigation.addListener("focus", () => {      
            this.getAllAttendances()    
        })
    };

    getAllAttendances =  async () => {
        try {
            const res = await axios.get(`${server}/attendance`)
            this.setState({listAttendance: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getDateAttendances =  async (initialDate, finalDate) => {
        try {
            initialDate = moment(initialDate).format('YYYY-MM-DD 00:00:00')
            finalDate = moment(finalDate).format('YYYY-MM-DD 23:59:59')

            const res = await axios.get(`${server}/attendance/date?initialDate=${initialDate}&finalDate=${finalDate}`)
            this.setState({listAttendance: res.data, showFilterRecords: false})
        } catch (error) {
            showError(error)
        }
    };

    render () {
        return (
            <View style = {styles.container}>
                <FilterRecords isVisible = {this.state.showFilterRecords}
                    onCancel = {() => this.setState({showFilterRecords: false})}
                    filter = {this.getDateAttendances}/>
                <View style = {styles.headerContainer}>
                    <Icon name = 'clockcircleo' size = {25} color = '#FFF'/>
                    <Text style = {styles.textHeader}>Meus Registos</Text>                    
                </View>
                <View style = {styles.filterContainer}>
                    <TouchableOpacity style = {styles.button} onPress = {() => this.setState({showFilterRecords: true})} activeOpacity = {0.8}>
                        <Icon name = 'filter' size = {20} color = '#FFF'/>
                        <Text style = {styles.text}>Filtrar Registos</Text>
                    </TouchableOpacity>             
                    <TouchableOpacity style = {styles.button} onPress = {this.getAllAttendances}  activeOpacity = {0.8}> 
                        <Icon name = 'reload1' size = {20} color = '#FFF'></Icon>
                        <Text style = {styles.text}>Mostrar Todos</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.listAttendanceContainer}>
                    {this.state.listAttendance.length > 0
                    ? <FlatList
                        data = {this.state.listAttendance}
                        keyExtractor = {item => item.attendanceId}                        
                        renderItem = {({item}) => <Record {...item}/>}
                    />
                    : <Text style = {styles.textListAttendance}>Não existem registos!</Text>}
                </View>   
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    headerContainer: {
        flex: 0.8, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005580',
        width: '100%',        
    },
    textHeader: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'        
    },
    filterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#005580'
    },
    button: {        
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',       
        borderRadius: 9,
        padding: 10,
        margin: 5,
        marginBottom: 10,        
        backgroundColor: '#014A6E'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#FFF'
    },
    listAttendanceContainer: {
        flex: 8
    },
    textListAttendance: {        
        fontSize: 18,
        fontWeight: 'bold',
        margin: 100,
    }
});