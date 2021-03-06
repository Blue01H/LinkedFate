import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react/cjs/react.development";

import { login } from "../controllers/user";
import useAsync from "../helpers/process";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProcess, setLogin] = useAsync();

  async function signIn() {
    setLogin(async () => {
      await login(email, password);
    });
  }

  useEffect(() => {
    if (loginProcess.status === "end") navigation.navigate("dashboard");
  }, [loginProcess]);

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
        <Text style={styles.signInText}>Sign in</Text>
      </View>

      {loginProcess.error && (
        <View style={styles.btnSpace}>
          <View style={styles.flashError}>
            <Text style={styles.flashText}>{loginProcess.error.message}</Text>
          </View>
        </View>
      )}

      <View style={styles.column}>
        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            value={email}
            style={styles.inputText}
          />
        </View>

        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            style={styles.inputText}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={styles.btnSpace}>
        {!loginProcess.isLoading && (
          <TouchableOpacity style={styles.loginBtn} onPress={() => signIn()}>
            <Text style={styles.logoText}>Continue</Text>
          </TouchableOpacity>
        )}
        {loginProcess.isLoading && (
          <ActivityIndicator animating size="large" color="#0000ff" />
        )}
      </View>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginTop: 35,
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
});
