import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 
class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logoSpace}>
                    <Text style={styles.baseText}>Linked</Text>
                    <View style={styles.square}>
                        <Text style={styles.logoText}>Fate</Text>
                    </View>
                </View>

            </View>
        );
    }
} export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
