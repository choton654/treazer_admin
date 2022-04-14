import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, ActivityIndicator, Divider, useTheme } from "react-native-paper";

const SingleOrder = ({ order, verifyOrder, mutationIsLoading }) => {

    const { colors } = useTheme()

    return (
        <View
            style={{
                paddingHorizontal: 10,
                marginTop: 10,
            }}>
            <View
                style={{
                    height: "100%",
                    backgroundColor: "#fff",
                    shadowColor: "#bdbdbd",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1, shadowRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.primary
                }}>
                <Text
                    style={{
                        marginVertical: 5,
                        marginLeft: 10,
                        fontWeight: "400",
                        fontSize: 15,
                        letterSpacing: 1,
                        color: "#424242",
                    }}>
                    Order Id: <Text
                        style={{
                            marginHorizontal: 5,
                            fontWeight: "700",
                            fontSize: 15,
                            color: "#424242",
                            letterSpacing: 1,
                        }}>{order._id}
                    </Text>
                </Text>
                <Text
                    style={{
                        marginVertical: 5,
                        marginLeft: 10,
                        fontWeight: "400",
                        fontSize: 15,
                        letterSpacing: 1,
                        color: "#424242",
                    }}>
                    Buyer Name: <Text
                        style={{
                            marginHorizontal: 5,
                            fontWeight: "700",
                            fontSize: 15,
                            color: "#424242",
                            letterSpacing: 1,
                        }}>
                        {order.userId && order.userId.userId}
                    </Text>
                </Text>
                <Text
                    style={{
                        marginVertical: 5,
                        marginLeft: 10,
                        fontWeight: "400",
                        fontSize: 15,
                        letterSpacing: 1,
                        color: "#424242",
                    }}>
                    Ph: <Text
                        style={{
                            marginHorizontal: 5,
                            fontWeight: "700",
                            fontSize: 15,
                            color: "#424242",
                            letterSpacing: 1,
                        }}>{order.userId && order.userId.mobile_no}
                    </Text>
                </Text>
                <Text
                    style={{
                        marginVertical: 5,
                        marginLeft: 10,
                        fontWeight: "400",
                        fontSize: 15,
                        letterSpacing: 1,
                        color: "#424242",
                    }}>
                    Order Time:
                    <Text
                        style={{
                            marginHorizontal: 5,
                            fontWeight: "700",
                            fontSize: 15,
                            color: "#424242",
                            letterSpacing: 1,
                        }}>
                        {new Date(order.createdAt).toDateString()}
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
                            Rs.{order.totalPrice + order.resturantId?.deliveryPrice}
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
                            marginVertical: 5,
                            marginLeft: 10,
                            fontWeight: "400",
                            fontSize: 15,
                            letterSpacing: 1,
                            color: "#424242",
                        }}>
                        Store Name: <Text
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
                    </Text>

                    <Text
                        style={{
                            marginVertical: 5,
                            marginLeft: 10,
                            fontWeight: "400",
                            fontSize: 15,
                            letterSpacing: 1,
                            color: "#424242",
                        }}>
                        Ph:  <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 10,
                                fontWeight: "600",
                                fontSize: 15,
                                color: "#424242",
                                letterSpacing: 1,
                            }}>{order.resturantId && order.resturantId.phone}
                        </Text>
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

                {!mutationIsLoading ? (
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
    )
}

export default SingleOrder