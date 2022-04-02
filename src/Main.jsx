import { SafeAreaView } from 'react-native'
import React from 'react'
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import Rootnavigation from './navigation/Rootnavigation'
import { NavigationContainer } from "@react-navigation/native"
import ProiderWrapper from "./globalcontext"

const Main = () => {

    const theme = {
        ...DefaultTheme,
        colors: {
            primary: "#38bdf8"
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <ProiderWrapper>
                    <NavigationContainer>
                        <Rootnavigation />
                    </NavigationContainer>
                </ProiderWrapper>
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Main