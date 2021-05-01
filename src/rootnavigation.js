import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  TextInput,
  SafeAreaView,
  Text,
} from "react-native";
const password = localStorage.getItem("password") ? true : false;
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import { Appbar, Button } from "react-native-paper";
import Allorders from "./Allorders";
const { height } = Dimensions.get("window");
const Rootnavigation = () => {
  const [number, setChangeNumber] = useState("");
  const [error, setError] = useState("");
  const [pass, setPassword] = useState(null);
  const login = () => {
    setChangeNumber("");
    if (number !== null && number !== "info_admin_treazer") {
      setError("Admin resources! Access denied");
    } else if (number !== null && number === "info_admin_treazer") {
      setPassword(number);
      localStorage.setItem("password", JSON.stringify(number));
    } else if (number === null) {
      setError("Admin resources! Access denied");
    }
  };
  return (
    <View>
      <Appbar.Header style={{ top: 0 }}>
        <Appbar.Content title='Admin' subtitle={"Pannel"} />
        <Appbar.Action icon='magnify' onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      {!pass && (
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setChangeNumber(text);
              setError("");
            }}
            value={number}
            placeholder='useless placeholder'
            secureTextEntry={true}
            placeholder='Password'
          />
          {error && (
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "red",
                marginVertical: 10,
                marginHorizontal: "auto",
                textAlign: "center",
              }}>
              {error}
            </Text>
          )}
          <Button
            mode='contained'
            onPress={login}
            style={{
              marginVertical: 10,
              width: "40%",
              height: 30,
              backgroundColor: "#4fc3f7",
              boxShadow: "0px 2px 5px 2px #bdbdbd",
              marginHorizontal: "auto",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: 12,
            }}>
            Submit
          </Button>
        </SafeAreaView>
      )}
      {password && pass && (
        <View style={{ height: height * 0.9 }}>
          <Allorders />
        </View>
      )}
    </View>
  );
};

export default Rootnavigation;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
