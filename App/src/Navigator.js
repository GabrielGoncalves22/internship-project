import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen'
import Login from './screens/Login';
import AttendanceRegister from './screens/AttendanceRegister';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator screenOptions = {{ headerShown: false }} initialRouteName = "SplashScreen">
            <Stack.Screen name = "SplashScreen" component = {SplashScreen}/>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "Home" component = {AttendanceRegister}/>
        </Stack.Navigator>
    )
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <LoginNavigator/>
        </NavigationContainer>
    )
};

export default Navigator;