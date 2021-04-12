import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { RadioButton } from "react-native-paper";
import { register, sendCode } from "../controllers/user";
import useAsync from "../helpers/process";

function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [surnames, setSurnames] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("employee");

  const [registerProcess, setRegister] = useAsync();

  async function signUp() {
    setRegister(async () => {
      if (password !== confirm) throw new Error("Password mismatch.");
      await register(email, password, names, surnames, phone, role);
      await sendCode(email);
      navigation.navigate("confirm", { email: email });
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
        <Text style={styles.signInText}>Register</Text>
      </View>

      {registerProcess.error && (
        <View style={styles.btnSpace}>
          <View style={styles.flashError}>
            <Text style={styles.flashText}>
              {registerProcess.error.message}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.column}>
        {role === "employee" && (
          <>
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
          </>
        )}
        {role === "business" && (
          <>
            <View style={{ paddingBottom: 8 }}>
              <TextInput
                placeholder="Business Name"
                onChangeText={(firstN) => setNames(firstN)}
                value={names}
                style={styles.inputText}
              />
            </View>
          </>
        )}
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
        <View style={{ paddingBottom: 8, paddingLeft: 50, paddingRight: 50 }}>
          <View>
            <Text style={{ position: "absolute", left: 50, top: 10 }}>
              Employee
            </Text>
            <RadioButton
              value="employee"
              status={role === "employee" ? "checked" : "unchecked"}
              onPress={() => setRole("employee")}
            />
          </View>
          <View>
            <Text style={{ position: "absolute", left: 50, top: 10 }}>
              Business
            </Text>
            <RadioButton
              style={styles.radio}
              value="business"
              status={role === "business" ? "checked" : "unchecked"}
              onPress={() => setRole("business")}
            />
          </View>
        </View>
      </View>

      <View style={styles.btnSpace}>
        {!registerProcess.isLoading && (
          <TouchableOpacity style={styles.loginBtn} onPress={() => signUp()}>
            <Text style={styles.logoText}>Register</Text>
          </TouchableOpacity>
        )}
        {registerProcess.isLoading && (
          <ActivityIndicator animating size="large" color="#0000ff" />
        )}
      </View>
    </View>
  );
}
export default Register;

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
