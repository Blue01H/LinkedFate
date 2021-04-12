import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "./src/pages/welcome";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Dashboard from "./src/pages/Dashboard";
import UserFile from "./src/pages/UserFile";

import { useAuth } from "./src/controllers/user";
import Confirm from "./src/pages/Confirm";
import Search from "./src/pages/Search";

const Stack = createStackNavigator();

export default function App() {
  const status = useAuth();

  const protectedStack = (
    <>
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={UserFile}
        options={{ headerShown: false }}
        initialParams={{ id: undefined }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerShown: false }}
        initialParams={{ search: "" }}
      />
    </>
  );

  if (status.current === "request") {
    return <ActivityIndicator animating size="large" color="#0000ff" />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={status.current == "logged" ? "dashboard" : "welcome"}
      >
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="confirm"
          component={Confirm}
          options={{ headerShown: false }}
          initialParams={{ email: undefined }}
        />
        {status.current === "logged" && protectedStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
