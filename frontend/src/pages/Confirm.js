import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { verify } from "../controllers/user";
import useAsync from "../helpers/process";

function Confirm({ route, navigation }) {
  const [code, setCode] = useState("");
  const [verifyProcess, setVerify] = useAsync();
  const { email } = route.params;

  async function check() {
    setVerify(async () => {
      if (!email) throw new Error("No email provided.");
      await verify(email, code);
      navigation.navigate("login");
    });
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.logoSpace}
        onTouchStart={() => navigation.navigate("welcome")}
      >
        <Text style={styles.baseText}>Linked</Text>
        <View style={styles.square}>
          <Text style={styles.logoText}>Fate</Text>
        </View>
      </View>

      <View>
        <Text style={styles.signInText}>Verify</Text>
      </View>

      {verifyProcess.error && (
        <View style={styles.btnSpace}>
          <View style={styles.flashError}>
            <Text style={styles.flashText}>{verifyProcess.error.message}</Text>
          </View>
        </View>
      )}
      <View style={styles.column}>
        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="Verification Code"
            onChangeText={(code) => setCode(code)}
            value={code}
            style={styles.inputText}
          />
        </View>
      </View>

      <View style={styles.btnSpace}>
        {!verifyProcess.isLoading && (
          <TouchableOpacity style={styles.loginBtn} onPress={() => check()}>
            <Text style={styles.logoText}>Verify</Text>
          </TouchableOpacity>
        )}
        {verifyProcess.isLoading && (
          <ActivityIndicator animating size="large" color="#0000ff" />
        )}
      </View>
    </View>
  );
}
export default Confirm;

const styles = StyleSheet.create({
  radio: {
    backgroundColor: "#000000",
    color: "#000000",
    left: "10%",
    position: "relative",
    width: "80%",
  },
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
  signInText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 40,
  },
  inputText: {
    backgroundColor: "#4A494A",
    width: "80%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
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
  column: {
    flexDirection: "column",
  },
  flashError: {
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  flashText: {
    fontFamily: "sans-serif",
    fontSize: 10,
    color: "#ff0000",
    fontWeight: "bold",
  },
});
