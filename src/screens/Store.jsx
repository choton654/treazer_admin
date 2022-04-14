import { View, InteractionManager, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { GlobalContext } from '../globalcontext'
import Loader from '../components/Loader'
import {
    useGetAllResturantQuery,
    useVerifyRestaurantMutation
} from "../query/restaurant"
import StoreCard from '../components/StoreCard'

const Store = () => {

    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const [didAnimationFinish, setdidAnimationFinish] = useState(false)

    const { data } = useGetAllResturantQuery()
    const [verify, { isLoading: mutationIsLoading }] = useVerifyRestaurantMutation()

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                if (data) {
                    // this gives an object with dates as keys
                    const groups = data.resturants.reduce((groups, store) => {
                        const date = store.createdAt.split('T')[0];
                        if (!groups[date]) {
                            groups[date] = [];
                        }
                        groups[date].push(store);
                        return groups;
                    }, {});

                    // Edit: to add it in the array format instead
                    const groupArrays = Object.keys(groups).map((date) => {
                        return {
                            date,
                            stores: groups[date]
                        };
                    });

                    globalDispatch({ type: "GET_ALL_STORES", payload: groupArrays })
                    setdidAnimationFinish(true)
                }
            })
            return () => task.cancel()
        }, [data])
    )

    const verifyRestaurant = useCallback(
        (id) => verify(id)
        , [useVerifyRestaurantMutation])

    const renderItem = ({ item }) => (
        <StoreCard item={item} verifyRestaurant={verifyRestaurant}
            mutationIsLoading={mutationIsLoading} />
    )

    if (!didAnimationFinish) { return <Loader /> }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <FlatList
                data={globalState.stores}
                renderItem={renderItem}
                keyExtractor={(item) => item.stores[0]._id}
                contentContainerStyle={{ backgroundColor: "#fff", paddingBottom: 20 }}
            />
        </View>
    )
}

export default Store