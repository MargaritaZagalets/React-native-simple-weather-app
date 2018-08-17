import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enterCity: '',
            temperatureCity: 0,
            hasError: false,
            errText: ''
        }
    }

    getData = (data) => {
        console.log('getData ', data)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=5627a5275db78923eb79a1d449656a8d`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.cod == '404') {
                    this.setState({
                        hasError: true,
                        errText: responseJson.message
                    })
                } else {
                    console.log(responseJson);
                    console.log(responseJson.main.temp);
                    this.setState({
                        temperatureCity: Math.floor(responseJson.main.temp - 273.15),
                        hasError: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onPressBtn = () => {
        console.log('in search ', this.state.enterCity)
        this.getData(this.state.enterCity);
        this.props.handlePress(this.state.enterCity, this.state.temperatureCity)
    }
    render() {

        return (
            <View>
                <View style={styles.searchBox}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.search}
                            placeholder="Enter a city"
                            placeholderTextColor='#888888'
                            onChangeText={(enterCity) => this.setState({ enterCity: enterCity })}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableHighlight
                            onPress={() => this.onPressBtn()}
                            style={styles.btn}
                            underlayColor='#6f8ba0'>
                            <Text style={[styles.btnText]}>Search</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.weatherBox}>
                    {!this.state.hasError ? (
                         <Text style={styles.weatherText}>Now in {this.props.city} {this.state.temperatureCity}°C</Text>
                    ) : (<Text style={styles.weatherText}> {this.state.errText} </Text>)}
                </View>
            </View>
                );
            }
        }
        
const styles = StyleSheet.create({
                    searchBox: {
                    flex: 1,
                flexDirection: 'row',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20
            },
    inputContainer: {
                    width: '70%',
                height: 70,
            },
    search: {
                    fontSize: 25,
            },
    btnContainer: {
                    width: '30%',
                height: 70,
            },
    btn: {
                    paddingTop: 4,
                paddingBottom: 4,
                marginTop: 5,
                backgroundColor: '#485c6e',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#485c6e',
            },
    btnText: {
                    fontSize: 25,
                color: '#fff',
                textAlign: 'center',
            },
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
        
