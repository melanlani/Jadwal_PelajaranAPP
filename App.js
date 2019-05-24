import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'native-base';
import Home from './src/screens/Home'

const MainNavigator = createStackNavigator(
  {

  Home: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },

},

  {
   initialRouteName: 'Home'
  }
)



const AppContainer  = createAppContainer(MainNavigator);


type Props = {};
export default class App extends Component<Props> {
  render(){
    return(
       <AppContainer  />

    );
  }

}
