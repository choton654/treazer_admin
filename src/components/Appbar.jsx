import React from 'react'
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"

const Navbar = () => {

    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ top: 0 }}>
            <Appbar.Content title='Admin' titleStyle={{ color: "#fff" }} />
            <Appbar.Action icon='keyboard-backspace'
                onPress={() => navigation.goBack()} />
        </Appbar.Header>
    )
}

export default Navbar