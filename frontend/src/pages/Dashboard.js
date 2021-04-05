import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import config from "../config";
import {
  deleteToken,
  getData,
  getHeaders,
  getToken,
} from "../controllers/user";

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
  const [user, setUser] = useState(null);
  const [post, newPost] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);

  async function publish() {
    setPublishLoading(true);
    try {
      const headers = await getHeaders();
      headers.set("Content-Type", "application/json");
      const response = await fetch(`${config.API_URL}/post`, {
        method: "POST",
        body: JSON.stringify({
          content: post,
        }),
        headers: headers,
      });
      if (response.status == 200) {
        navigation.navigate("dashboard");
      } else {
        const text = await response.text();
        throw new Error(text);
      }
    } catch (e) {
      console.log(e);
      setPublishError(e);
    } finally {
      setPublishLoading(false);
    }
  }

  useEffect(() => {
    getData()
      .then((user) => {
        if (!user) navigation.navigate("welcome");
        else {
          setUser(user);
          console.log(user);
        }
      })
      .catch(() => navigation.navigate("welcome"));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#ffffff",
            display: "flex",
          }}
          onTouchStart={() => {
            deleteToken().finally(() => {
              navigation.navigate("welcome");
            });
          }}
        >
          <Text style={{ color: "#fff" }}>Logout</Text>
        </Button>
      </View>
      <View style={styles.avatarContainer}>
        <View style={{ paddingLeft: 5 }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchBar}
          />
        </View>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#ffffff",
            display: "inline",
            width: 100,
            marginLeft: 5,
          }}
          onTouchStart={() => {}}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </Button>
      </View>

      <View style={styles.square}>
        <View style={{ position: "relative", flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderBottomColor: "#000000",
              borderBottomWidth: 1,
              padding: 10,
              margin: 10,
              width: "90%",
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
            />
          </View>
          {post !== "" && (
            <View
              style={{
                position: "relative",
                display: "block",
                flexDirection: "row",

                top: "100%",
                left: "-90%",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#2867B2",
                  color: "#ffffff",
                }}
                onTouchStart={() => {
                  if (!publishLoading) {
                    publish();
                  }
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {publishLoading
                    ? "Loading..."
                    : publishError
                    ? "Error!"
                    : "Publish"}
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    width: 200,
    color: "#000",
    paddingLeft: 18,
    display: "inline",
  },
  square: {
    width: 47,
    height: 28,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    height: "30%",
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
    margin: 10,
    width: 100,
  },
  usernameText: {},
});
