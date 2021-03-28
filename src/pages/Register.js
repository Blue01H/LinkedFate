import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';


class Register extends React.Component {

    render() {
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

                <View style={styles.column}>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.inputText} />
                    </View>
                     <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Password"
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Confirm Password"
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Email"
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.inputText} />
                    </View>

                </View>

                <View style={styles.btnSpace}>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.logoText}>Sign in</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
} export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    baseText: {
        fontFamily: "sans-serif",
        fontSize: 20,
        color: '#2867B2',
        fontWeight: "bold"
    },
    logoText: {
        fontFamily: "sans-serif",
        fontSize: 20,
        color: '#fff',
        fontWeight: "bold"
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
        color: '#000',
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 5,
        fontSize: 40
    },
    inputText: {
        backgroundColor: '#4A494A', 
        width: '80%', 
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#fff',
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
    }




});
