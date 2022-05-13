import { SafeAreaView } from 'react-native'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import React from 'react'
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import Rootnavigation from './navigation/Rootnavigation'
import ProiderWrapper from "./globalcontext"
import { api } from "./query/queryServices"

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
                    <ApiProvider api={api}>
                        <Rootnavigation />
                    </ApiProvider>
                </ProiderWrapper>
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Main