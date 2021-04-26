import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Allorders from "./Allorders";
const Rootnavigation = () => {
  return (
    <View>
      <Text>from rootnavigation</Text>
      <View>
        <Allorders />
      </View>
    </View>
  );
};

export default Rootnavigation;

const styles = StyleSheet.create({});
