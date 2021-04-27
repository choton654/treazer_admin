import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, ActivityIndicator, Divider } from "react-native-paper";
import axios from "axios";
import BASE_URL from "./api";
import { orderContext } from "./orderContext";

const Allorders = () => {
  const { state: odrState, dispatch: orderDispatch } = orderContext();
  useEffect(() => {
    getAllOrders();
  }, []);

  const [acceptOrderReq, setacceptOrderReq] = useState(true);

  const getAllOrders = () => {
    if (odrState.orders === null) {
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

  const verifyOrder = (orderId) => {
    setacceptOrderReq(false);
    axios
      .post(`${BASE_URL}/api/order/adminverifyorder`, { orderId })
      .then((res) => {
        const { msg, order } = res.data;
        console.log(msg, order);
        orderDispatch({ type: "VERIFY_ORDER", payload: order });
        setacceptOrderReq(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        backgroundColor: "#ffffff",
      }}>
      {odrState && odrState.orders ? (
        odrState.orders.length > 0 ? (
          odrState.orders.map((order, idx) => (
            <View
              key={idx}
              style={{
                height: height * 0.7,
                paddingHorizontal: 10,
                marginTop: 10,
              }}>
              <View
                style={{
                  height: "100%",
                  borderColor: "#455a64",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontWeight: "600",
                    fontSize: 15,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  Order Id:{order._id}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontWeight: "600",
                    fontSize: 15,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  Buyer info
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontWeight: "600",
                    fontSize: 15,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  {order.userId && order.userId.username}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontWeight: "600",
                    fontSize: 15,
                    color: "#424242",
                    letterSpacing: 1,
                  }}>
                  Ph:{order.userId && order.userId.mobile_no}
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 10,
                    fontWeight: "400",
                    fontSize: 12,
                    letterSpacing: 1,
                    color: "#424242",
                  }}>
                  Order Time:
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontWeight: "700",
                      fontSize: 12,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.createdAt}
                  </Text>
                </Text>
                <View
                  style={{
                    height: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: "#455a64",
                    borderStyle: "solid",
                    borderBottomWidth: 1,
                    borderBottomColor: "#455a64",
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      width: "50%",
                      borderRightColor: "#455a64",
                      borderRightWidth: 1,
                      borderStyle: "solid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // padding: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#9e9e9e",
                        letterSpacing: 1,
                      }}>
                      Order Amount
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontWeight: "800",
                        fontSize: 15,
                        color: "#424242",
                        letterSpacing: 1,
                      }}>
                      Rs.{order.totalPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#9e9e9e",
                        letterSpacing: 1,
                      }}>
                      Payment Type
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontWeight: "800",
                        fontSize: 15,
                        color: "#424242",
                        letterSpacing: 1,
                      }}>
                      Pre-paid
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                  }}>
                  <Ionicons
                    name='location-sharp'
                    size={20}
                    color='#4fc3f7'
                    style={{ marginLeft: 10 }}
                  />
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontWeight: "600",
                      fontSize: 12,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.shippingaddress &&
                      order.shippingaddress.formattedAddress}
                  </Text>
                </View>
                <Divider />
                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    Store info
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    {order.resturantId && order.resturantId.resturant_name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                      color: "#424242",
                      letterSpacing: 1,
                    }}>
                    Ph:{order.resturantId && order.resturantId.phone}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                    }}>
                    <Ionicons
                      name='location-sharp'
                      size={20}
                      color='#4fc3f7'
                      style={{ marginLeft: 10 }}
                    />
                    <Text
                      style={{
                        marginHorizontal: 5,
                        fontWeight: "600",
                        fontSize: 12,
                        color: "#424242",
                        letterSpacing: 1,
                      }}>
                      {order.resturantId &&
                        order.resturantId.location.formattedAddress}
                    </Text>
                  </View>
                </View>

                {acceptOrderReq ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 5,
                    }}>
                    {order && order.isAdminVerify ? (
                      <Button
                        mode='contained'
                        style={{
                          marginVertical: 10,
                          width: "20%",
                          height: 30,
                          backgroundColor: "#4fc3f7",
                          boxShadow: "0px 2px 5px 2px #bdbdbd",
                        }}
                        labelStyle={{
                          color: "#ffffff",
                          fontWeight: "700",
                          fontSize: 12,
                          marginHorizontal: "none",
                        }}>
                        Done
                      </Button>
                    ) : (
                      <Button
                        mode='contained'
                        onPress={() => verifyOrder(order._id)}
                        style={{
                          marginVertical: 10,
                          width: "40%",
                          height: 30,
                          backgroundColor: "#4fc3f7",
                          boxShadow: "0px 2px 5px 2px #bdbdbd",
                        }}
                        labelStyle={{
                          color: "#ffffff",
                          fontWeight: "700",
                          fontSize: 12,
                          marginHorizontal: "none",
                        }}>
                        Verify order
                      </Button>
                    )}
                  </View>
                ) : (
                  <View
                    style={{
                      marginHorizontal: "auto",
                      backgroundColor: "#ffffff",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60%",
                      height: 40,
                    }}>
                    <ActivityIndicator
                      animating={true}
                      color='#82b1ff'
                      size='small'
                      style={{ marginVertical: 10 }}
                    />
                  </View>
                )}
              </View>
            </View>
          ))
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
        )
      ) : (
        <View
          style={{
            height: height * 0.7,
            backgroundColor: "#ffffff",
            justifyContent: "center",
          }}>
          <ActivityIndicator animating={true} color='#82b1ff' size='large' />
        </View>
      )}
    </ScrollView>
  );
};

export default Allorders;

const styles = StyleSheet.create({});
