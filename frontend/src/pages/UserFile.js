import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { RadioButton } from "react-native-paper";


function UserFile({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={styles.logoSpace}
        onTouchStart={() => navigation.navigate("welcome")}
      >
        <View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.baseText}>Linked</Text>
            <View style={styles.square}>
              <Text style={styles.logoText}>Fate</Text>
            </View>
          </View>

          <View style={{flexDirection: "row"}}>
          
          <View style={styles.circle}>
          </View>

        <View style={{flexDirection: "column"}}>
          <Text style={styles.usernameText}>Username</Text>
          <Text style={styles.workText}>Work Info</Text>
        </View>

          </View>

        <View style={{  
          width: 340,
          height: 95,
          borderRadius: 5,
          marginTop: 10,
          backgroundColor: "#cdcdcd",}}>

            <Text style={{paddingTop: 8, paddingLeft: 10, fontWeight: "bold"}}>Education:</Text>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>University Better than URU</Text>
              <Text style={{paddingLeft: 10}}>Duration</Text>
            </View>

        </View>

        <View style={{  
          width: 340,
          height: 150,
          borderRadius: 5,
          marginTop: 10,
          backgroundColor: "#cdcdcd",}}>

            <Text style={{paddingTop: 8, paddingLeft: 10, fontWeight: "bold"}}>Experience:</Text>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>Workplace #1</Text>
              <Text style={{paddingLeft: 10}}>Duration</Text>
            </View>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>Workplace #2</Text>
              <Text style={{paddingLeft: 10}}>Duration</Text>
            </View>

        </View>

        <View style={{  
          width: 340,
          height: 210,
          borderRadius: 5,
          marginTop: 10,
          backgroundColor: "#cdcdcd",}}>

            <Text style={{paddingTop: 8, paddingLeft: 10, fontWeight: "bold"}}>Awards:</Text>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>Certificated #1</Text>
              <Text style={{paddingLeft: 10}}>Winning Date</Text>
            </View>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>Certificated #2</Text>
              <Text style={{paddingLeft: 10}}>Winning Date</Text>
            </View>

            <View style={{width: 320, height: 50, backgroundColor: '#fff', marginTop: 8, marginLeft: 10, borderRadius: 5}}>
              <Text style={{paddingTop: 5, paddingLeft: 5, fontWeight: "bold"}}>Certificated #3</Text>
              <Text style={{paddingLeft: 10}}>Winning Date</Text>
            </View>

        </View>

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
    backgroundColor: '#f0f0f0',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 8
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
  }

});
