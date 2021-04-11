import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import Posts from "../components/Post";
import { create, get } from "../controllers/post";
import { logout, useAuth } from "../controllers/user";
import useAsync from "../helpers/process";

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
};

function Dashboard({ navigation }) {
  const [post, newPost] = useState("");
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const status = useAuth();
  const [publishProcess, setPublish] = useAsync();

  async function publish() {
    setPublish(async () => {
      await create(post);
    });
  }

  useEffect(() => {
    if (status.current == "error") navigation.navigate("welcome");
    else if (status.user && !user) setUser(status.user);
  }, [status]);
  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <View style={styles.logoSpace}>
          <Text style={styles.baseText}>Linked</Text>
          <View style={styles.logoSquare}>
            <Text style={styles.logoText}>Fate</Text>
          </View>
        </View>
        <View>
          <Button
            style={{
              backgroundColor: "#2867B2",
              color: "#fff",
              marginTop: 30,
              marginLeft: 110,
              borderRadius: 5,
            }}
            onPress={() => {
              logout().finally(() => {
                navigation.navigate("welcome");
              });
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
        </View>
      </View>
      <View style={styles.avatarContainer}>
        <View style={{ paddingLeft: 5 }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchBar}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#fff",
            display: "inline",
            width: 100,
            marginLeft: 5,
          }}
          onPress={() => {
            navigation.navigate("search", { search: search });
          }}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </Button>
      </View>

      <View>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#fff",
            marginTop: 30,
            marginLeft: "5%",
            width: "90%",
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("profile");
          }}
        >
          <Text style={styles.logoutText}>Your Profile</Text>
        </Button>
      </View>

      <View style={styles.square}>
        <View style={{ position: "relative" }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderBottomColor: "#000000",
              borderBottomWidth: "1%",
              padding: "5%",
              margin: "5%",
              width: "90%",
              borderColor: "#fff",
            }}
          >
            <UselessTextInput
              multiline
              numberOfLines={8}
              onChangeText={(text) => newPost(text)}
              placeholder={
                user && user.role && user.role == "employee"
                  ? "Post for a new job..."
                  : "Post new job request of your business"
              }
              style={{ borderRadius: 5 }}
            />
          </View>
          <View
            style={{
              position: "relative",
              display: "block",
              width: "30%",
              marginLeft: "5%",
              marginBottom: "5%",
            }}
          >
            <Button
              style={{
                backgroundColor: "#2867B2",
                color: "#ffffff",
                width: 100,
                marginLeft: 180,
              }}
              onPress={() => {
                if (!publishProcess.isLoading) {
                  publish();
                }
              }}
            >
              <Text style={{ color: "#fff" }}>
                {publishProcess.isLoading
                  ? "Loading..."
                  : publishProcess.error
                  ? `Error! ${publishProcess.error.message}`
                  : "Publish"}
              </Text>
            </Button>
          </View>
        </View>
      </View>

      <Posts user={user} />
    </View>
  );
}
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "block",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#888",
  },
  avatarContainer: {
    paddingLeft: 8,
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 45,
    width: 223,
    color: "#000",
    paddingLeft: 18,
    display: "inline",
    borderColor: "#fff",
    borderWidth: 1,
  },
  square: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    height: 300,
    left: "5%",
    alignSelf: "center",
  },
  avatarPost: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#888",
    marginTop: 15,
    marginLeft: 15,
  },
  logoutContainer: {
    marginLeft: 10,
    width: 60,
    flexDirection: "row",
  },
  usernameText: {},
  logoSpace: {
    marginTop: 35,
    flexDirection: "row",
    paddingLeft: 10,
  },
  logoSquare: {
    width: 47,
    height: 24,
    backgroundColor: "#2867B2",
    borderRadius: 5,
    paddingLeft: 3,
  },
  logoText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  baseText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#2867B2",
    fontWeight: "bold",
  },
  logoutText: {
    fontFamily: "sans-serif",
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
