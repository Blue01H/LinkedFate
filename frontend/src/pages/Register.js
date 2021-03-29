import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useHistory } from "react-router/esm/react-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [surnames, setSurnames] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function register() {
    setLoading(true);
    try {
      if (password !== confirm) {
        throw new Error("Password mismatch.");
      }
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          names: names,
          surnames: surnames,
          phone: phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        const token = await response.text();
        await AsyncStorage.setItem("@storage_token", token);
        history.push("/dashboard");
      } else {
        const text = await response.text();
        throw new Error(text);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoSpace}>
        <Text style={styles.baseText}>Linked</Text>
        <View style={styles.square}>
          <Text style={styles.logoText}>Fate</Text>
        </View>
      </View>

      <View>
        <Text style={styles.signInText}>Register</Text>
      </View>

      {error && (
        <View style={styles.btnSpace}>
          <View style={styles.flashError}>
            <Text style={styles.flashText}>{error.message}</Text>
          </View>
        </View>
      )}
      <View style={styles.column}>
        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="First Name"
            onChangeText={(firstN) => setNames(firstN)}
            value={names}
            style={styles.inputText}
          />
        </View>
        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="Last Name"
            onChangeText={(lastN) => setSurnames(lastN)}
            value={surnames}
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
        <View style={{ paddingBottom: 8 }}>
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(cPassword) => setConfirm(cPassword)}
            value={confirm}
            style={styles.inputText}
            secureTextEntry={true}
          />
        </View>
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
            placeholder="Phone Number"
            onChangeText={(phoneNumber) => setPhone(phoneNumber)}
            value={phone}
            style={styles.inputText}
          />
        </View>
      </View>

      <View style={styles.btnSpace}>
        {!loading && (
          <TouchableOpacity style={styles.loginBtn} onPress={() => register()}>
            <Text style={styles.logoText}>Register</Text>
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator animating={true} />}
      </View>
    </View>
  );
}
export default Register;

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
