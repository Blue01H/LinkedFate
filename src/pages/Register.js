import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';


class Register extends React.Component {

    state = {
        firstN: '',
        lastN: '',
        password: '',
        cPassword: '',
        email: '',
        phoneNumber: ''
      }
    
    Regist() {
      const firstN = this.state.firstN;
      const lastN = this.state.lastN;
      const password = this.state.password;
      const cPassword = this.state.cPassword;
      const email = this.state.email;
      const phoneNumber = this.state.phoneNumber;

      const jsonRegister = {
        firstN: firstN,
        lastN: lastN,
        password: password,
        cPassword: cPassword,
        email: email,
        phoneNumber: phoneNumber
      } 
  
      fetch('http://localhost:3000/register', {
        method: "POST",
        body: JSON.stringify(jsonRegister),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.text())
        .catch(error => console.log(`Server Error${error}`))
        .then(token => console.log(token))
      
    }

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
                            onChangeText={firstN => this.setState({firstN})}
                            value = {this.state.firstN}
                            style={styles.inputText} />
                    </View>
                     <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Last Name"
                            onChangeText={lastN => this.setState({lastN})}
                            value = {this.state.LastN}
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Password"
                            onChangeText={password => this.setState({password})}
                            value = {this.state.password}
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Confirm Password"
                            onChangeText={cPassword => this.setState({cPassword})}
                            value = {this.state.cPassword}
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={email => this.setState({email})}
                            value = {this.state.email}
                            style={styles.inputText} />
                    </View>
                    <View style={{ paddingBottom: 8 }}>
                        <TextInput
                            placeholder="Phone Number"
                            onChangeText={phoneNumber => this.setState({phoneNumber})}
                            value = {this.state.phoneNumber}
                            style={styles.inputText} />
                    </View>

                </View>

                <View style={styles.btnSpace}>
                    <TouchableOpacity style={styles.loginBtn} onPress = {this.Regist.bind(this)}>
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
