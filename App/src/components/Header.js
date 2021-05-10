import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default props => {
    return (
        <View style = {styles.container}>
            <Icon name = {'clock'} size = {100} color = '#005580'/>
            <Text style = {styles.text}>Registo de Assiduidade</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 20,
        fontSize: 35,
        color: '#005580'
    }
});