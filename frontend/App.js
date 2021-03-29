import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Welcome from "./src/pages/welcome";

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { BrowserRouter } from "react-router-dom";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistory } from "react-router/esm/react-router";

function SimpleDashboard() {
  return "that is a dashboard.";
}

function Auth({ children }) {
  const history = useHistory();

  const [token, setToken] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("@storage_token")
      .then((token) => {
        if (token) setToken(token);
      })
      .finally(() => setLoaded(true));
  }, []);

  if (isLoaded && !token) history.push("/login");
  if (isLoaded && token) return children;
  return <ActivityIndicator animating={true} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/welcome" component={Welcome}></Route>
      <Route exact path="/" component={Welcome}></Route>

      <Route
        exact
        path="/dashboard"
        render={() => (
          <Auth>
            <SimpleDashboard />
          </Auth>
        )}
      />
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
