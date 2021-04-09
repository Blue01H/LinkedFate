import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from "./utility/Slider";
import Welcome1 from "../img/welcome_1.jpeg";
import Welcome2 from "../img/welcome_2.jpeg";
import Welcome3 from "../img/welcome_3.jpeg";
import { useAuth } from "../controllers/user";

const images = [Welcome1, Welcome2, Welcome3];

function Welcome({ navigation }) {
  const status = useAuth();

  useEffect(() => {
    if (status.current == "logged") navigation.navigate("dashboard");
  }, [status]);
  return (
    <View style={styles.container}>
      <View style={styles.logoSpace}>
        <Text style={styles.baseText}>Linked</Text>
        <View style={styles.square}>
          <Text style={styles.logoText}>Fate</Text>
        </View>
      </View>

      <Slider style={styles.slider} images={images} />

      <View style={styles.btnSpace}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.logoText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={styles.baseText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  baseText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#2867B2",
    fontWeight: "bold",
  },
  logoText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
  },
  logoSpace: {
    marginTop: 35,
    flexDirection: "row",
    paddingLeft: 10,
  },
  square: {
    width: 47,
    height: 28,
    backgroundColor: "#2867B2",
    borderRadius: 5,
    paddingLeft: 3,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2867B2",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  btnSpace: {
    justifyContent: "center",
    alignItems: "center",
  },
});
