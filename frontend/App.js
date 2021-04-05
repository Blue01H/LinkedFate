import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "./src/pages/welcome";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Dashboard from "./src/pages/Dashboard";

import { getToken } from "./src/controllers/user";

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getToken()
      .then((token) => {
        if (token) setToken(token);
      })
      .finally(() => setLoaded(true));
  }, []);

  const protectedStack = (
    <>
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </>
  );

  const isLoggedIn = isLoaded && token;
  if (!isLoaded) {
    return <ActivityIndicator animating={true} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        {isLoggedIn && protectedStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
