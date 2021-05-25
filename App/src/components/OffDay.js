import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt';

export default ({date, description}) => {
    date = moment(date).locale('pt').format('LL')
    return (
        <View style = {styles.container}>              
            <Text style = {styles.textDate}>{date}</Text> 
            <Text style = {styles.textDescription}>{description}</Text>               
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,        
        borderColor: '#AAA',
        borderBottomWidth: 1
    },
    textDate: {
        fontSize: 18
    },
    textDescription: {
        fontSize: 15
    }
});