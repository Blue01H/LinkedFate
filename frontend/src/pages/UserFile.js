import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import Posts from "../components/Post";
import { get } from "../controllers/post";
import { getById, useAuth } from "../controllers/user";
import useAsync from "../helpers/process";

function UserFile({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    if (!id && auth.current === "logged") {
      setData(auth.user);
    }
  }, [auth]);

  useEffect(() => {
    if (id) {
      getById(id)
        .then((user) => {
          setData(user);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={styles.logoSpace}
        onPress={() => navigation.navigate("dashboard")}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={styles.baseText}
              onPress={() => navigation.navigate("dashboard")}
            >
              Linked
            </Text>
            <View style={styles.square}>
              <Text
                style={styles.logoText}
                onPress={() => navigation.navigate("dashboard")}
              >
                Fate
              </Text>
            </View>
          </View>
          {!data && <ActivityIndicator animating />}
          {data && (
            <>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.circle}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.usernameText}>
                    {data.role == "employee"
                      ? `${data.names} ${data.surnames}`
                      : data.names}
                  </Text>
                  <Text style={styles.workText}>{data.role}</Text>
                </View>
              </View>
              <Text style={styles.usernameText}>
                {data.role == "employee"
                  ? "Job Applications"
                  : "Available jobs"}
              </Text>
              <Posts user={data} byUser={id || data.id} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}
export default UserFile;

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
    width: "100%",
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
    height: 23,
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
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: "#f0f0f0",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 8,
  },
  usernameText: {
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  workText: {
    paddingLeft: 6,
    fontSize: 15,
  },
});
