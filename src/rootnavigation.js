import React from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import { Appbar } from "react-native-paper";
import Allorders from "./Allorders";
const { height } = Dimensions.get("window");
const Rootnavigation = () => {
  return (
    <View>
      <Appbar.Header style={{ top: 0 }}>
        <Appbar.Content title='Admin' subtitle={"Pannel"} />
        <Appbar.Action icon='magnify' onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <View style={{ height: height * 0.9 }}>
        <Allorders />
      </View>
    </View>
  );
};

export default Rootnavigation;

const styles = StyleSheet.create({});
