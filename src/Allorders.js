import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import BASE_URL from "./api";
import { orderContext } from "./orderContext";

const Allorders = () => {
  const { state: orderState, dispatch: orderDispatch } = orderContext();
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    if (orderState.orders === null) {
      axios
        .get(`${BASE_URL}/api/order/adminallorder`)
        .then((res) => {
          const { order } = res.data;
          console.log(order);
          orderDispatch({ type: "GET_ALL_ORDERS", payload: order });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Allorders;

const styles = StyleSheet.create({});
