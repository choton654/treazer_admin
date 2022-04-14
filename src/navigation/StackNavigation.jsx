import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import SingleStore from '../screens/SingleStore'

const Stack = createStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SingleStore" component={SingleStore} />
        </Stack.Navigator>
    )
}

export default StackNavigation