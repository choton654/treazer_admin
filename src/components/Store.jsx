import { View, InteractionManager, FlatList, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Avatar, Button, Card, useTheme, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import BASE_URL from '../utils/api'
import { GlobalContext } from '../globalcontext'
import Loader from './Loader'

const { height } = Dimensions.get("window")

const Store = () => {

    const { colors } = useTheme()

    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const [didAnimationFinish, setdidAnimationFinish] = useState(false)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(async () => {
                const { data: { resturants } } = await axios.get(`${BASE_URL}/api/resturant/getAllResturant`)
                globalDispatch({ type: "GET_ALL_STORES", payload: resturants })
                setdidAnimationFinish(true)
            })
            return () => task.cancel()
        }, [])
    )

    // useEffect(() => { if (storeId) { verifyRestaurant() } }, [storeId])
    const verifyRestaurant =
        // useCallback(() => {
        async (id) => {
            try {
                setLoading(true)
                const { data: { message } } = await axios.post(`${BASE_URL}/api/resturant/${id}/verify`)
                globalDispatch({ type: "VERIFY_STORES", payload: id })
                setLoading(false)
                alert(message)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
    // }, [storeId])

    const renderItem = ({ item }) => (
        <Card style={{
            width: "90%", marginHorizontal: "auto", marginTop: 20,
            shadowColor: "#bdbdbd", shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7, shadowRadius: 10, borderWidth: 1,
            borderColor: colors.primary
        }}>
            <Card.Title title={item.resturant_name} subtitle={item.address}
                left={({ size }) =>
                    <Avatar.Image size={size} source={{ uri: item.owner?.photo }} />} />

            <Card.Cover source={{ uri: item.coverPic }} />
            <Card.Actions>
                {item.isVerified === undefined || !item.isVerified &&
                    <Button mode="contained"
                        labelStyle={{ color: "#fff" }}
                        style={{ marginRight: 10 }}
                        loading={loading}
                        onPress={() => verifyRestaurant(item._id)}>Verify</Button>
                }
                <Button mode="contained" loading={loading}
                    labelStyle={{ color: "#fff" }}
                >Claim</Button>
                {item.exploredBy &&
                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                        <Text style={{ textAlign: "center" }}>ExploredBy</Text>
                        <Avatar.Image size={20} source={{ uri: item.exploredBy?.photo }}
                            style={{ marginLeft: 10 }} />
                    </View>
                }
            </Card.Actions>
        </Card>
    )

    if (!didAnimationFinish) { return <Loader /> }

    return (
        <View style={{ height: height - 100 }}>
            <FlatList
                data={globalState.stores}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ backgroundColor: "#fff", paddingBottom: 20 }}
            />
        </View>
    )
}

export default Store