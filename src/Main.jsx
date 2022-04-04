import { SafeAreaView } from 'react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import React from 'react'
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import Rootnavigation from './navigation/Rootnavigation'
import { NavigationContainer } from "@react-navigation/native"
import ProiderWrapper from "./globalcontext"
import { storeApi } from './query/restaurant'
import { orderApi } from './query/order'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [storeApi.reducerPath]: storeApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([storeApi.middleware, orderApi.middleware])
})


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
                    <Provider store={store}>
                        <NavigationContainer>
                            <Rootnavigation />
                        </NavigationContainer>
                    </Provider>
                </ProiderWrapper>
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Main