import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt';

const initialState = {
    initialDate: new Date(),
    finalDate: new Date(),
    showDatePickerInitialDate: false,
    showDatePickerFinalDate: false
};

export default class FilterRecords extends Component {
    state = {
        ...initialState
    };

    getDatePickerInitialDate = () => {
        let datePicker = <DateTimePicker value = {this.state.initialDate} activeOpacity = {0.9}
            onChange = {(event, date) => this.setState({initialDate: date || this.state.initialDate, showDatePickerInitialDate: false})}
            mode = 'date'/>

        if (Platform.OS === 'android') {
            datePicker = (
                <View style = {{flexDirection: 'row'}}>
                    <Text style ={[styles.date, {fontWeight: 'bold'}]}>Data Inicial: </Text>
                    <TouchableOpacity onPress = {() => this.setState({showDatePickerInitialDate: true})}>
                        <Text style = {styles.date}>
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
        let datePicker = <DateTimePicker value = {this.state.finalDate} activeOpacity = {0.9}
            onChange = {(event, date) => this.setState({finalDate: date || this.state.finalDate, showDatePickerFinalDate: false})}
            mode = 'date'/>

        if (Platform.OS === 'android') {
            datePicker = (
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style = {[styles.date, {fontWeight: 'bold'}]}>Data Final: </Text>
                    <TouchableOpacity onPress = {() => this.setState({showDatePickerFinalDate: true})}>
                        <Text style = {styles.date}>
                            {moment(this.state.finalDate).format('L')}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePickerFinalDate && datePicker}
                </View>
            )
        }

        return datePicker
    };

    filter = () => {
        if (this.state.initialDate > this.state.finalDate) {
            Alert.alert('Datas inválidas', 'A data inicial não pode ser superior à data final!')
        } else {
            this.props.filter && this.props.filter(this.state.initialDate, this.state.finalDate)
        }        
    };

    render() {
        return (
            <Modal transparent = {true} visible = {this.props.isVisible}
                onRequestClose = {this.props.onCancel}
                animationType = 'fade'>
                <TouchableWithoutFeedback onPress = {this.props.onCancel}>
                    <View style = {styles.background}/>
                </TouchableWithoutFeedback>
                <View style = {styles.container}>
                    <Text style = {styles.header}>Filtragem por datas</Text>
                    <View style = {styles.form}>
                        {this.getDatePickerInitialDate()}{this.getDatePickerFinalDate()}
                    </View>
                    <View style = {styles.buttons}>
                        <TouchableOpacity onPress = {this.props.onCancel} activeOpacity = {0.5}>
                            <Text style = {styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.filter} activeOpacity = {0.5}>
                            <Text style = {styles.textButton}>Filtrar</Text>
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
    form: {
        padding: 15
    },
    date: {
        fontSize: 18,
        marginLeft: 5,
        padding: 5
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