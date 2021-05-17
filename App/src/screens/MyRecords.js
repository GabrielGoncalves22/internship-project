import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt';

import { server, showError, showSuccess} from '../common';
import Record from '../components/Record';

const initialState = {
    listAttendance: [],
    initialDate: new Date(),
    finalDate: new Date(),
    showDatePickerInitialDate: false,
    showDatePickerFinalDate: false
};

export default class MyRecords extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        this.getAttendance()
    };

    getAttendance =  async () => {
        try {
            const res = await axios.get(`${server}/attendance`)
            this.setState({listAttendance: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getDateAttendance =  async () => {
        try {
            const initialDate = moment(this.state.initialDate).format('YYYY-MM-DD 00:00:00')
            const finalDate = moment(this.state.finalDate).format('YYYY-MM-DD 23:59:59')

            const res = await axios.get(`${server}/attendance/date?initialDate=${initialDate}&finalDate=${finalDate}`)
            this.setState({listAttendance: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getDatePickerInitialDate = () => {
        let datePicker = <DateTimePicker style = {styles.text} value = {this.state.initialDate} activeOpacity = {0.9}
            onChange = {(event, date) => this.setState({initialDate: date || this.state.initialDate, showDatePickerInitialDate: false})}
            mode = 'date'/>

        if (Platform.OS === 'android') {
            datePicker = (
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.text}>Data Inicial: </Text>
                    <TouchableOpacity onPress = {() => this.setState({showDatePickerInitialDate: true})}>
                        <Text style = {styles.text}>
                            {moment(this.state.initialDate).format('L')}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePickerInitialDate && datePicker}
                </View>
            )
        }

        return datePicker
    };

    getDatePickerFinalDate = () => {
        let datePicker = <DateTimePicker style = {styles.text} value = {this.state.finalDate} activeOpacity = {0.9}
            onChange = {(event, date) => this.setState({finalDate: date || this.state.finalDate, showDatePickerFinalDate: false})}
            mode = 'date'/>

        if (Platform.OS === 'android') {
            datePicker = (
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.text}>Data Final: </Text>
                    <TouchableOpacity onPress = {() => this.setState({showDatePickerFinalDate: true})}>
                        <Text style = {styles.text}>
                            {moment(this.state.finalDate).format('L')}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePickerFinalDate && datePicker}
                </View>
            )
        }

        return datePicker
    };

    render () {
        return (
            <View style = {styles.container}>
                <View style = {styles.filterContainer}>
                    <View style = {styles.dateContainer}>
                        <View>
                            {this.getDatePickerInitialDate()}{this.getDatePickerFinalDate()}
                        </View>
                        <TouchableOpacity style = {styles.button} onPress = {this.getDateAttendance} activeOpacity = {0.8}>
                            <Icon name = 'filter' size = {25} color = '#FFF'></Icon>
                            <Text style = {styles.text}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>                
                    <TouchableOpacity style = {styles.button} onPress = {this.getAttendance}  activeOpacity = {0.8}> 
                        <Text style = {styles.text}>Mostrar Todos</Text>
                    </TouchableOpacity>
                </View>
                <View>        
                    <FlatList
                        data = {this.state.listAttendance}
                        keyExtractor = {item => item.attendanceId}                        
                        renderItem = {({item}) => <Record {...item}/>}
                    />
                </View>   
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0FFFF'
    },
    filterContainer: {
        padding: 25,
        backgroundColor: '#005580'
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 9,
        padding: 10
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    }
});