import { View, Dimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator } from "react-native-paper";

const { height } = Dimensions.get('window')

const Loader = () => {
    return (
        <View style={{
            height: height - 100,
            backgroundColor: "#ffffff",
            justifyContent: "center",
        }}>
            <ActivityIndicator animating={true} color='#82b1ff' size='large' />
        </View>
    )
}

export default Loader