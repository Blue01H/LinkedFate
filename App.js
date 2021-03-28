import React from "react";
import { Route } from "react-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Welcome from "./src/pages/welcome";

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/register" render={() => <Register />}></Route>
      <Route path="/welcome" render={() => <Welcome />}></Route>
      <Route path="/" render={() => <Welcome />}></Route>
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
