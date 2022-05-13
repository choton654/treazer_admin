import React from "react";
import { View } from "react-native";
import Navbar from "../components/Appbar";
import TabNavigation from "./TabNavigation";
import StackNavigation from "./StackNavigation";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()

const Rootnavigation = () => {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Navbar />
        <Stack.Navigator initialRouteName="Tab"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tab" component={TabNavigation} />
          <Stack.Screen name="Stack" component={StackNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
};

export default Rootnavigation;




  // const [number, setChangeNumber] = useState("");
  // const [error, setError] = useState("");
  // const [pass, setPassword] = useState(null);

  // useEffect(() => {
  //   const password = localStorage.getItem("password");
  //   setPassword(password)
  // }, [localStorage])

  // const login = () => {
  //   setChangeNumber("");
  //   if (number !== null && number !== "info_admin_treazer") {
  //     setError("Admin resources! Access denied");
  //   } else if (number !== null && number === "info_admin_treazer") {
  //     setPassword(number);
  //     localStorage.setItem("password", JSON.stringify(number));
  //   } else if (number === null) {
  //     setError("Admin resources! Access denied");
  //   }
  // }


// {!pass && (
//   <SafeAreaView>
//     <TextInput
//       style={styles.input}
//       onChangeText={(text) => {
//         setChangeNumber(text);
//         setError("");
//       }}
//       value={number}
//       secureTextEntry={true}
//       placeholder='Password'
//     />
//     {error && (
//       <Text
//         style={{
//           fontSize: 15,
//           fontWeight: "600",
//           color: "red",
//           marginVertical: 10,
//           marginHorizontal: "auto",
//           textAlign: "center",
//         }}>
//         {error}
//       </Text>
//     )}
//     <Button
//       mode='contained'
//       onPress={login}
//       style={{
//         marginVertical: 10,
//         width: "40%",
//         height: 30,
//         backgroundColor: "#4fc3f7",
//         boxShadow: "0px 2px 5px 2px #bdbdbd",
//         marginHorizontal: "auto",
//       }}
//       labelStyle={{
//         color: "#ffffff",
//         fontWeight: "700",
//         fontSize: 12,
//       }}>
//       Submit
//     </Button>
//   </SafeAreaView>
// )}
// {pass && (
//   <View style={{ height: height * 0.9 }}>
//     <Allorders />
//   </View>
// )}