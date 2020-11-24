import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';;

import MainScreen from './components/screens/Main';
import SettingsScreen from './components/screens/Settings';
import MapsScreen from './components/screens/Maps';

const Tab = createBottomTabNavigator();

const routes = {
    Home: {
        icon: 'ios-wallet',
        name: 'Home',
        component: MainScreen
    },
    Settings: {
        icon: 'ios-list',
        name: 'Settings',
        component: SettingsScreen
    },
    Maps: {
        icon: 'ios-map',
        name: 'Maps',
        component: MapsScreen
    },
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={routes[route.name].icon} size={size} color={color} />,
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'gray',
                }}
            >
                {Object.values(routes).map(({component, name}) => <Tab.Screen key={name} name={name} component={component} />)}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
