import React, { useCallback } from 'react'
import { Text, View } from "react-native"
import { Appbar, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import { useState } from 'react';
import { useOpenRestaurantMutation, useCloseRestaurantMutation } from '../query/queryServices';

const Navbar = () => {

    const navigation = useNavigation();
    const [storeOpen, setStoreOpen] = useState(false)
    const [openStore] = useOpenRestaurantMutation()
    const [closeStore] = useCloseRestaurantMutation()
    const handleChange = useCallback((bool) => {
        if (storeOpen) {
            closeStore()
        } else {
            openStore()
        }
        setStoreOpen(bool)
    }, [useOpenRestaurantMutation, useCloseRestaurantMutation, storeOpen])


    return (
        <Appbar.Header style={{ top: 0 }}>
            <Appbar.Content title='Admin' titleStyle={{ color: "#fff" }} />
            <View style={{ marginTop: 5, marginRight: 15, justifyContent: "center", alignItems: "center" }}>
                <Switch value={storeOpen} onValueChange={handleChange} />
                <Text>{storeOpen ? 'Open' : 'Close'}</Text>
            </View>
            <Appbar.Action icon='keyboard-backspace'
                onPress={() => navigation.goBack()} />
        </Appbar.Header>
    )
}

export default Navbar