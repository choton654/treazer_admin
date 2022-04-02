import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, Button } from "react-native-paper";

const Navbar = () => {
    return (
        <Appbar.Header style={{ top: 0 }}>
            <Appbar.Content title='Admin' subtitle={"Pannel"} />
            <Appbar.Action icon='magnify' onPress={() => { }} />
            <Appbar.Action icon={"dots-vertical"} onPress={() => { }} />
        </Appbar.Header>
    )
}

export default Navbar