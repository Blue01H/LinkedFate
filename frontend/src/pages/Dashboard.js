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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

function Dashboard({ navigation }) {
  const [post, newPost] = useState("");
  const [user, setUser] = useState(null);

  const status = useAuth();
  const [publishProcess, setPublish] = useAsync();
  const [postProcess, setPost] = useAsync();
  const [page, setPage] = useState([]);
  const [actualPage, setActualPage] = useState(-1);
  const [count, setCount] = useState(0);

  async function publish() {
    setPublish(async () => {
      await create(post);
    });
  }

  useEffect(() => {
    if (actualPage >= 0) {
      setPost(async () => {
        const posts = await get(actualPage);
        return posts;
      });
    }
  }, [actualPage]);

  function next() {
    if (page.length <= count) setActualPage(actualPage + 1);
  }

  useEffect(() => {
    if (page.length == 0 && postProcess.status == "unitialized") {
      next();
    }
    if (
      postProcess.status == "end" &&
      !postProcess.error &&
      postProcess.result
    ) {
      const { result } = postProcess;
      setCount(result.count);
      const pages = [...page, ...result.rows];
      setPage(pages);
    }
  }, [postProcess]);

  useEffect(() => {
    if (status.current == "error") navigation.navigate("welcome");
    else if (status.user && !user) setUser(status.user);
  }, [status]);
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        console.log(nativeEvent);
        if (isCloseToBottom(nativeEvent)) {
          next();
        }
      }}
      scrollEventThrottle={400}
      style={styles.container}
    >
      <View style={styles.logoutContainer}>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#ffffff",
            display: "flex",
          }}
          onPress={() => {
            logout().finally(() => {
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
          onPress={() => {}}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
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
                width: "30%",
                marginLeft: "5%",
                marginBottom: "5%",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#2867B2",
                  color: "#ffffff",
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
          )}
        </View>
      </View>
      {postProcess.isLoading && <ActivityIndicator animating={true} />}
      {!postProcess.isLoading &&
        page.map((page) => (
          <View style={styles.square} key={`page-${page.id}`}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  textAlign: "center",
                  padding: "2%",
                  display: "block",
                }}
              >
                <Text style={{ display: "block" }}>
                  {user && user.role && user.role == "employee"
                    ? "New job offer!"
                    : "Possible employee for your job!"}
                </Text>
                <Text style={{ display: "block" }}>
                  From: {`${page.user.names} ${page.user.surnames}`}
                </Text>
              </View>
              <View
                style={{
                  position: "relative",
                  width: "96%",
                  textAlign: "justify",
                  padding: "2%",
                  margin: "2%",
                  display: "block",
                  backgroundColor: "#fff",
                }}
              >
                <Text>{page.content}</Text>
              </View>
              <View
                style={{
                  position: "relative",
                  width: "30%",
                  marginLeft: "5%",
                  marginBottom: "5%",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#2867B2",
                    color: "#ffffff",
                  }}
                  onTouchStart={() => {}}
                >
                  <Text style={{ color: "#fff" }}>Send Email</Text>
                </Button>
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
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
