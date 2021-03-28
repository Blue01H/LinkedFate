import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';

const {width} = Dimensions.get("window");
const height = width * 0.8;
 
class Slider extends React.Component {
    
    state = {
        active: 0
    }

    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active) {
            this.setState({active: slide});
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.slider }>
                    <ScrollView 
                    paginEnabled 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.change}
                    style = {styles.scrollView}>
                        {
                            this.props.images.map((images, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: images }}
                                    style={styles.imageCSS} />
                            ))
                        }
                    </ScrollView>
                    <View style={styles.dotView}>
                        {
                            this.props.images.map((i,k) => (
                                <Text key={k} style={k==this.state.active ? styles.dotTextActive : styles.dotText}>⬤</Text>
                            ))
                        }
                    </View>
                </View>

            </View>
        );
    }
} export default Slider;

const styles = StyleSheet.create({
    container: {
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
    slider: {
        marginTop: 15, 
        width, 
        height
    },
    scrollView: {
        width, 
        height
    },
    imageCSS: {
        width, 
        height, 
        resizeMode: 'cover'
    },
    dotView: {
        flexDirection:'row', 
        position: 'absolute', 
        bottom:0, 
        alignSelf: 'center'
    },
    dotText: {
        color: '#888',
        margin: 3
    },
    dotTextActive: {
        color: '#fff',
        margin: 3
    },
});
