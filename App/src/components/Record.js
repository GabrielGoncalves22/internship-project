import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/pt';

export default ({ dateAttendance, typeAttendance }) => {
    dateAttendance = moment(dateAttendance).locale('pt').format('LLLL')
    return (
        <View style = {styles.container}>
                <Icon 
                    style = {styles.icon}
                    name = {typeAttendance === 'Entrada' ? 'door-open' : 'door-closed'} 
                    color = {typeAttendance === 'Entrada' ? '#008000' : '#FF0000'}
                    size = {20}
                />
            <View style = {styles.containerText}>
                <Text style = {styles.textTypeAttendance}>{typeAttendance}</Text>
                <Text style = {styles.textDateAttendance}>{dateAttendance}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderColor: '#AAA',
        borderBottomWidth: 1,        
        backgroundColor: '#E0FFFF'
    },
    icon: {
        marginLeft: 10
    },
    containerText: {
        marginLeft: 25
    },
    textTypeAttendance: {
        fontSize: 18
    },
    textDateAttendance: {
        fontSize: 15
    }
});