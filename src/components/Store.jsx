import { View, InteractionManager, FlatList, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Avatar, Button, Card, useTheme, Text } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { GlobalContext } from '../globalcontext'
import Loader from './Loader'
import { useGetAllResturantQuery, useGetSingleResturantQuery, useVerifyRestaurantMutation } from "../query/restaurant"

const { height, width } = Dimensions.get("window")

const Store = () => {

    const { colors } = useTheme()
    const navigation = useNavigation()
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

        <View style={{
            justifyContent: "center", alignItems: "center",
            marginTop: 15
        }}>
            <View style={{
                backgroundColor: "#eeeeee", borderWidth: 1, justifyContent: "center",
                alignItems: "center", width: 80, height: 30, borderRadius: 10,
            }}>
                <Text style={{ fontWeight: "700" }}>{item.date}</Text>
            </View>
            {item.stores.map((store, idx) =>
                <Card key={idx} style={{
                    width: "90%", marginHorizontal: "auto", marginTop: 5,
                    shadowColor: "#bdbdbd", shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7, shadowRadius: 10, borderWidth: 1,
                    borderColor: colors.primary
                }}
                    onPress={() => navigation.navigate("Stack",
                        { screen: "SingleStore", params: { storeid: store._id } })}
                >
                    <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
                        <Avatar.Image size={30} source={{ uri: store.owner?.photo }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ textAlign: "left" }}>
                                {store.resturant_name}
                            </Text>
                            <Text style={{ textAlign: "left", marginVertical: 5, width: width * 0.75 }}>
                                {store.address}
                            </Text>
                            <Text style={{ textAlign: "left" }}>
                                Phone No. {store.phone}
                            </Text>
                            {store.owner &&
                                <Text style={{ textAlign: "left" }}>
                                    Owner Name. {store.owner.userId}
                                </Text>
                            }
                        </View>
                    </View>
                    <Card.Actions>
                        {store.isVerified === undefined || !store.isVerified ?
                            <View style={{ flexDirection: "row" }}>
                                <Button mode="contained"
                                    labelStyle={{ color: "#fff" }}
                                    style={{ marginRight: 10 }}
                                    loading={mutationIsLoading}
                                    onPress={() => verifyRestaurant(store._id)}>
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
                        {store.exploredBy &&
                            <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                                <Text style={{ textAlign: "center" }}>ExploredBy</Text>
                                <Avatar.Image size={20} source={{ uri: store.exploredBy?.photo }}
                                    style={{ marginLeft: 10 }} />
                            </View>
                        }
                    </Card.Actions>
                </Card>
            )}

        </View>
    )

    if (!didAnimationFinish) { return <Loader /> }

    return (
        <View style={{ height: height - 100 }}>
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