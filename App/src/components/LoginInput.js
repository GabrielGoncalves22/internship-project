import React from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons'

export default props => {
    return (
        <View>
            <Icon name = {props.icon}/>
            <TextInput {...props}/>
        </View>
    )
}