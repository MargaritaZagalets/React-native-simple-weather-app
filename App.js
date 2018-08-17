import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBox from './SearchBox';

export default class App extends Component {
  state = {
    city: '(enter a city)',
    temperature: 0
  }

  handlePress = (data, tempData) => {
    this.setState({
      city: data,
      temperature: tempData
    }, () => {
      console.log('in handle', this.state.city, this.state.temperature)
    });
  }


  render() {
    return (
      <View>
        <SearchBox handlePress={this.handlePress} city={this.state.city}/>
      </View>
    );
  }
}