import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./src/pages/welcome";

import Welcome from "./src/pages/welcome";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Dashboard from "./src/pages/Dashboard";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@storage_token")
      .then((token) => {
        if (token) setToken(token);
      })
      .finally(() => setLoaded(true));
  }, []);

  const protectedStack = (
    <>
      <Stack.Screen name="dashboard" component={Dashboard} />
    </>
  );

  const isLoggedIn = isLoaded && token;
  if (!isLoaded) {
    return <ActivityIndicator animating={true} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        {isLoggedIn && protectedStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
