import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Store from '../screens/Store'
import Allorders from '../screens/Allorders'

const TopTab = createMaterialTopTabNavigator()

const TabNavigation = () => {
    return (
        <TopTab.Navigator initialRouteName='Store'>
            <TopTab.Screen name="Store" component={Store} />
            <TopTab.Screen name="Orders" component={Allorders} />
        </TopTab.Navigator>
    )
}

export default TabNavigation