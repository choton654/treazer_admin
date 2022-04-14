import { View, Text, InteractionManager } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useGetSingleResturantQuery } from '../query/restaurant'
import Loader from '../components/Loader'
import { GlobalContext } from '../globalcontext'

const SingleStore = () => {

    const { params: { storeid } } = useRoute()
    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const { data } = useGetSingleResturantQuery(storeid)
    const [didAnimationFinish, setDidANimationFinish] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                if (data) { globalDispatch({ type: "SET_SINGLE_STORE", payload: data.resturant }) }
                setDidANimationFinish(true)
            })
            return () => task.cancel()
        }, [])
    )

    if (!didAnimationFinish) { return <Loader /> }

    return (
        <View style={{ flex: 1 }}>
            {globalState.singleStore?.allProducts &&
                <Text>SingleStore</Text>
            }
        </View>
    )
}

export default SingleStore