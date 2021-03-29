import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

class Dashboard extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.avatarContainer}>

                    <Image
                        source={{ uri: 'https://www.shankarainfra.com/img/avatar.png', }}
                        style={styles.avatar}
                    />

                    <View style={{ paddingLeft: 10 }}>
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#888"
                            style={styles.searchBar}
                        />
                    </View>

                </View>

                <View style={styles.square}>

                <View style={{flexDirection: "row"}}>
                    <Image
                        source={{ uri: 'https://www.shankarainfra.com/img/avatar.png', }}
                        style={styles.avatarPost}
                    />
                    <View>
                        <Text>Username</Text>
                        <Text>2 Followers</Text>
                        <Text>Promoted</Text>
                    </View>

                    </View>

                </View>

            </View>
        );
    }
} export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: '#888',
    },
    avatarContainer: {
        paddingLeft: 8,
        paddingTop: 30,
        flexDirection: "row",
        alignItems: "center"
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        height: 45,
        width: 320,
        color: '#000',
        paddingLeft: 18
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
        borderColor: '#888',
        marginTop: 15,
        marginLeft: 15,
    },
    usernameText: {
        
    }

})
