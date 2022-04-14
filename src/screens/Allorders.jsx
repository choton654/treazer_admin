import React, { useCallback, useState } from "react";
import {
  Text, View, FlatList,
  Dimensions, InteractionManager
} from "react-native";
import { GlobalContext } from "../globalcontext";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../components/Loader";
import { useGetAllOrderQuery, useVerifyOrderMutation } from "../query/order";
import SingleOrder from "../components/SingleOrder";

const { height } = Dimensions.get("window");

const Allorders = () => {

  const { state: globalState, dispatch: globalDispatch } = GlobalContext();

  const { data, isLoading, isFetching, error } = useGetAllOrderQuery()
  const [verify, { isLoading: mutationIsLoading }] = useVerifyOrderMutation()
  const [didAnimationFinish, setdidAnimationFinish] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(async () => {
        if (data) {
          globalDispatch({ type: "GET_ALL_ORDERS", payload: data.order })
          setdidAnimationFinish(true)
        }
        return () => task.cancel()
      })
    }, [data])
  )

  const verifyOrder = useCallback(
    (orderId) => verify(orderId),
    [useVerifyOrderMutation])

  const renderItem = ({ item }) => (
    <SingleOrder order={item} verifyOrder={verifyOrder} mutationIsLoading={mutationIsLoading} />
  )

  if (!didAnimationFinish) { return (<Loader />) }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {globalState.orders.length > 0 ? (
        <FlatList
          data={globalState.orders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ backgroundColor: "#fff", paddingBottom: 20 }}
        />
      ) : (
        <View
          style={{
            height: height * 0.7,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            padding: 20,
          }}>
          <Text
            style={{
              textAlign: "Center",
              fontSize: 20,
              letterSpacing: 3,
              fontWeight: "700",
              fontFamily: "Open Sans",
              color: "#bdbdbd",
            }}>
            There is no new orders for you right now
          </Text>
        </View>
      )}
    </View>
  );
};

export default Allorders