import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class WeatherBox extends Component {
    state = {
            city:'',
            temperature: '',
        }
    componentWillMount(){
        this.setState({
            city:this.props.city
        })
    }
    
    componentDidlMount() {
        console.log('here', this.state.city);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=5627a5275db78923eb79a1d449656a8d`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.main.temp);
                this.setState({
                    temperature: Math.floor(responseJson.main.temp - 273.15),
                    place: responseJson.name
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles_.weatherBox}>
                <Text style={styles_.weatherText}>Now in {this.state.city} {this.state.temperature}°C</Text>
                {/* <View style={styles_.iconWeather}>
                    <MaterialCommunityIcons size={30} name="weather-sunny" color={'#fff'} />
                </View> */}
            </View>
        );
    }
}

const styles_ = StyleSheet.create({
    weatherBox: {
        marginTop: 60,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6f8ba0",
        height: '60%',
        backgroundColor: '#6f8ba0',
    },
    weatherText: {
        flex: 1,
        flexDirection: 'row',
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },
    iconWeather: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    }
})