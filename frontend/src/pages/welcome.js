import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useHistory } from "react-router/esm/react-router";
import Slider from "./utility/Slider";

const images = [
  "https://github.com/Blue01H/LinkedFate/blob/main/src/img/IMG%201.jpeg?raw=true",
  "https://github.com/Blue01H/LinkedFate/blob/main/src/img/IMG%202.jpeg?raw=true",
  "https://github.com/Blue01H/LinkedFate/blob/main/src/img/MG%203.jpeg?raw=true",
];

function Welcome() {
  const history = useHistory();
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
          onPress={() => history.push("/login")}
        >
          <Text style={styles.logoText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn}>
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
