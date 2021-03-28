import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Slider from './utility/Slider'

const images = [
    "https://orthostudio.ca/wp-content/uploads/2016/11/image-3.jpg",
    "https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
]
 
class Welcome extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logoSpace}>
                    <Text style={styles.baseText}>Linked</Text>
                    <View style={styles.square}>
                        <Text style={styles.logoText}>Fate</Text>
                    </View>
                </View>

                <Slider images={images}/>

                <View style={styles.btnSpace}>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.logoText}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerBtn}>
                        <Text style={styles.baseText}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
} export default Welcome;

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
});
