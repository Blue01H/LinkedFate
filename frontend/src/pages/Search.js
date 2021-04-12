import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { logout, searchUsers } from "../controllers/user";
import useAsync from "../helpers/process";

function Search({ route, navigation }) {
  const { search } = route.params;
  const [searchProcess, setSearchProcess] = useAsync();
  const [value, setValue] = useState(search);

  useEffect(() => {
    setSearchProcess(async () => {
      const users = await searchUsers(search);
      return users;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={styles.logoutContainer}
        onTouchStart={() => navigation.navigate("dashboard")}
      >
        <View style={styles.logoSpace}>
          <Text style={styles.baseText}>Linked</Text>
          <View style={styles.logoSquare}>
            <Text style={styles.logoText}>Fate</Text>
          </View>
        </View>
        <View style={{ width: 200 }}>
          <Button
            style={{
              backgroundColor: "#2867B2",
              color: "#fff",
              marginTop: 30,
              marginLeft: 90,
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
            value={value}
            onChangeText={(text) => setValue(text)}
          />
        </View>
        <Button
          style={{
            backgroundColor: "#2867B2",
            color: "#fff",
            width: 100,
            marginLeft: 5,
          }}
          onPress={() => {
            setSearchProcess(async () => {
              const users = await searchUsers(value);
              return users;
            });
          }}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </Button>
      </View>
      <ScrollView
        style={{ height: 800, backgroundColor: "#fff", padding: "5%" }}
      >
        {searchProcess.status == "end" && searchProcess.result.length == 0 && (
          <Text style={{ color: "black" }}>Oops! No results</Text>
        )}
        {searchProcess.status == "end" &&
          searchProcess.result.length > 0 &&
          searchProcess.result.map((user) => (
            <View key={`user-${user.id}`}>
              <View>
                <Text>
                  {user.role.name == "employee"
                    ? `${user.names} ${user.surnames}`
                    : user.names}
                </Text>
              </View>
              <View>
                <Text>{user.role.name}</Text>
              </View>
              <View>
                <Button
                  onPress={() => {
                    navigation.navigate("profile", { id: user.id });
                  }}
                >
                  See profile
                </Button>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
export default Search;

const styles = StyleSheet.create({
  container: {
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
    width: 223,
    color: "#000",
    paddingLeft: 18,
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
