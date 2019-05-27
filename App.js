import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon, Root } from 'native-base';
import Home from './src/screens/Home';
import Schedules from './src/screens/schedules';
import Login from './src/screens/Login';
import HomeAdmin from './src/screens/HomeAdmin';
import Teachers from './src/screens/Teachers';
import Subjects from './src/screens/Subjects';
import Schedule_Subject from './src/screens/Schedule_Subject';

const MainNavigator = createStackNavigator(
  {

  Home: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  Schedules: {
    screen: Schedules,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: Login,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  HomeAdmin: {
    screen: HomeAdmin,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  Teachers: {
    screen: Teachers,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  Subjects: {
    screen: Subjects,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    }
  },
  Schedule_Subject: {
    screen: Schedule_Subject,
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
      <Root>
        <AppContainer  />
      </Root>
    );
  }

}
