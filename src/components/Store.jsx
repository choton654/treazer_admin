import { View, InteractionManager, FlatList, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Avatar, Button, Card, useTheme, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { GlobalContext } from '../globalcontext'
import Loader from './Loader'
import { useGetAllResturantQuery, useVerifyRestaurantMutation } from "../query/restaurant"

const { height, width } = Dimensions.get("window")

const Store = () => {

    const { colors } = useTheme()

    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const [didAnimationFinish, setdidAnimationFinish] = useState(false)

    const { data, isLoading, isFetching } = useGetAllResturantQuery()
    const [verify, { isLoading: mutationIsLoading }] = useVerifyRestaurantMutation()

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                if (data) {
                    globalDispatch({ type: "GET_ALL_STORES", payload: data.resturants })
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
        <Card style={{
            width: "90%", marginHorizontal: "auto", marginTop: 20,
            shadowColor: "#bdbdbd", shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7, shadowRadius: 10, borderWidth: 1,
            borderColor: colors.primary
        }}>
            <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
                <Avatar.Image size={30} source={{ uri: item.owner?.photo }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ textAlign: "left" }}>
                        {item.resturant_name}
                    </Text>
                    <Text style={{ textAlign: "left", marginVertical: 5, width: width * 0.75 }}>
                        {item.address}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                        Phone No. {item.phone}
                    </Text>
                </View>
            </View>
            <Card.Cover source={{ uri: item.coverPic }} />
            <Card.Actions>
                {item.isVerified === undefined || !item.isVerified ?
                    <View style={{ flexDirection: "row" }}>
                        <Button mode="contained"
                            labelStyle={{ color: "#fff" }}
                            style={{ marginRight: 10 }}
                            loading={mutationIsLoading}
                            onPress={() => verifyRestaurant(item._id)}>
                            Verify
                        </Button>
                        <Button mode="contained" loading={mutationIsLoading}
                            labelStyle={{ color: "#fff" }}
                        >Claim
                        </Button>
                    </View>
                    :
                    <View style={{ flexDirection: "row" }}>
                        <Button mode="contained"
                            labelStyle={{ color: "#fff" }}
                            style={{ marginRight: 10, backgroundColor: "#fcd34d" }}
                            loading={mutationIsLoading}>
                            Warning
                        </Button>
                        <Button mode="contained"
                            loading={mutationIsLoading}
                            labelStyle={{ color: "#fff" }}
                            style={{ backgroundColor: "#ef4444" }}
                        >Bann
                        </Button>
                    </View>
                }
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