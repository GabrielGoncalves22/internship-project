import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt';

import { server, showError, showSuccess } from '../common';
import OffDay from '../components/OffDay';

const initialState = {
    listOffDays: [],
    listClosedDays: []        
};

const initialDate = moment().format('YYYY-MM-DD 00:00:00');
const finalDate = moment().add(365, 'days').format('YYYY-MM-DD 23:59:59');

export default class MyOffDays extends Component {

    state = { 
        ...initialState
    };   

    componentDidMount = async () => {
        this.focusListener = this.props.navigation.addListener("focus", () => {      
            this.getOffDays()
            this.getClosedDays()    
        })       
    };

    getOffDays = async () => {
        try {
            const res = await axios.get(`${server}/offday/date?initialDate=${initialDate}&finalDate=${finalDate}`)
            this.setState({listOffDays: res.data})
        } catch (error) {
            showError(error)
        }
    };

    getClosedDays = async () => {
        try {
            const res = await axios.get(`${server}/closedday/date?initialDate=${initialDate}&finalDate=${finalDate}`)
            this.setState({listClosedDays: res.data})
        } catch (error) {
            showError(error)
        }
    };

    render () {
        return (
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <Icon name = 'calendar' size = {25} color = '#FFF'/>
                    <Text style = {styles.textHeader}>Minhas Folgas</Text>                    
                </View>
                <View style = {styles.offDaysContainer}>
                    <Text style = {styles.subHeader}>Próximas Folgas/Férias</Text>
                    {this.state.listOffDays.length > 0 
                        ? <FlatList
                            data = {this.state.listOffDays}
                            keyExtractor = {item => item.offDayId}
                            renderItem = {({item}) => <OffDay {...item}/>}
                        />
                        : <Text style = {styles.textList}>Não existem folgas/férias registadas!</Text>
                    }
                </View>
                <View style = {styles.offDaysContainer}>
                    <Text style = {styles.subHeader}>Próximos Feriados/Dias Fechados</Text>
                    {this.state.listClosedDays.length > 0
                        ? <FlatList
                            data = {this.state.listClosedDays}
                            keyExtractor = {item => item.closedDayId}
                            renderItem = {({item}) => <OffDay {...item}/>}
                        />
                        : <Text style = {styles.textList}> Não existem feriados/dias fechados registados!</Text>
                    }
                </View>
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
        flex: 0.2, 
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
    offDaysContainer: {
        flex: 1
    },
    subHeader: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#014A6E',
        color: '#FFF'
    },
    textList: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 25
    }
});