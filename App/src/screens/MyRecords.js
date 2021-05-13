import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

import { server, showError, showSuccess} from '../common';
import Record from '../components/Record';

const initialState = {
    listAttendance: []
};

export default class MyRecords extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        this.getAttendance()
    };

    componentDidUpdate = async () => {
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

    render () {
        return (
            <View>
                <FlatList
                    data = {this.state.listAttendance}
                    keyExtractor = {item => item.attendanceId}
                    renderItem = {({item}) => <Record {...item}/>}
                />
            </View>
        )
    };
};

const style = StyleSheet.create({

});