import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import RegisterPoint from './screens/RegisterPoint';
import MyRecords from './screens/MyRecords';
import MyOffDays from './screens/MyOffDays';
import Settings from './screens/Settings';
import InsertPin from './screens/InsertPin';
import Biometric from './screens/Biometric';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const activeTintLabelColor = '#FFF';
    const inactiveTintLabelColor = '#B8B8B8';

    return (
        <Tab.Navigator initialRouteName = "AttendanceRegister" 
        tabBarOptions={{
            labelStyle: {
                fontSize: 13,
            },
            activeTintColor: activeTintLabelColor,
            inactiveTintColor: inactiveTintLabelColor,
            style: {
                paddingBottom: 3,
                paddingTop: 3,
                backgroundColor: '#005580',
            }
         }}>
            <Tab.Screen name = "RegisterPoint" component = {RegisterPoint}
                options = {{ 
                    tabBarLabel: 'Registar Ponto',               
                    tabBarIcon: ({ focused }) => 
                        <Icon name = 'pushpino' size = {25} color = {focused ? activeTintLabelColor : inactiveTintLabelColor}/> }} 
            />
            <Tab.Screen name = "MyRecords" component = {MyRecords}
                options = {{
                    tabBarLabel: 'Meus Registos',
                    tabBarIcon : ({ focused }) =>
                        <Icon name = 'clockcircleo' size = {25} color = {focused ? activeTintLabelColor : inactiveTintLabelColor}/> }}
            />
            <Tab.Screen name = 'MyOffDays' component = {MyOffDays}
                options = {{
                    tabBarLabel: 'Minhas Folgas',
                    tabBarIcon : ({ focused }) =>
                        <Icon name = 'calendar' size = {25} color = {focused ? activeTintLabelColor : inactiveTintLabelColor}/> }}
            />
            <Tab.Screen name = "Settings" component = {Settings}
                options = {{                    
                    tabBarLabel: 'Defini????es',
                    tabBarIcon : ({ focused }) =>
                        <Icon name = 'setting' size = {25} color = {focused ? activeTintLabelColor : inactiveTintLabelColor}/> }}
            />
        </Tab.Navigator>
    )
};

const LoginNavigator = () => {
    return (
        <Stack.Navigator screenOptions = {{ headerShown: false }} initialRouteName = "SplashScreen">
            <Stack.Screen name = "SplashScreen" component = {SplashScreen}/>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "InsertPin" component = {InsertPin}/>
            <Stack.Screen name = "Biometric" component = {Biometric}/>
            <Stack.Screen name = "Home" component = {TabNavigator}/>
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