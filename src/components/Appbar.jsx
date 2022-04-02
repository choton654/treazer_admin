import React from 'react'
import { Appbar } from "react-native-paper";

const Navbar = () => {
    return (
        <Appbar.Header style={{ top: 0 }}>
            <Appbar.Content title='Admin' titleStyle={{ color: "#fff" }} />
            <Appbar.Action icon='magnify' onPress={() => { }} />
        </Appbar.Header>
    )
}

export default Navbar