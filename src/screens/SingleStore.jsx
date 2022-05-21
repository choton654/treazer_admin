import { View, InteractionManager, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useGetSingleResturantQuery, useDeleteProductMutation } from '../query/queryServices'
import Loader from '../components/Loader'
import { GlobalContext } from '../globalcontext'
import { Text, Card } from 'react-native-paper'

const SingleStore = () => {

    const { params: { storeid } } = useRoute()
    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const { data } = useGetSingleResturantQuery(storeid)
    const [deleteProduct, { isLoading }] = useDeleteProductMutation()
    const [didAnimationFinish, setDidANimationFinish] = useState(false)

    const deleteProd = useCallback(
        (id) => deleteProduct({ id, storeid })
        , [useDeleteProductMutation])

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                if (data) { globalDispatch({ type: "SET_SINGLE_STORE", payload: data.resturant }) }
                setDidANimationFinish(true)
            })
            return () => task.cancel()
        }, [data])
    )

    const renderItem = ({ item }) => (
        <Card style={{ marginBottom: 10 }}>
            <Card.Title title={`${item.name}    -- ${item.price}`} />
            <Card.Cover source={{ uri: item.photo }} />
            <Card.Actions>
                <TouchableOpacity style={{ borderWidth: 1 }}
                    onPress={() => deleteProd(item._id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
    )

    if (!didAnimationFinish) { return <Loader /> }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {globalState.singleStore?.allProducts.length > 0 ?
                <FlatList
                    data={globalState.singleStore.allProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
                :
                <View style={{ flex: 1 }}>
                    <Text>No product in this store</Text>
                </View>
            }
        </View>
    )
}

export default SingleStore