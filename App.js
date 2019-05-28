import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon, Root } from 'native-base';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import Home from './src/screens/Home';
import Schedules from './src/screens/schedules';
import Login from './src/screens/Login';
import HomeAdmin from './src/screens/HomeAdmin';
import Teachers from './src/screens/Teachers';
import Subjects from './src/screens/Subjects';
import Schedule_Subject from './src/screens/Schedule_Subject';
import InputTeacher from './src/screens/InputTeacher';
import UpdateTeacher from './src/screens/UpdateTeacher';

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
  Teachers : {
    screen: Teachers,
    headerMode: '',
    navigationOptions: {
      title: 'Data Teachers',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
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

  InputTeacher : {
    screen: InputTeacher,
    headerMode: '',
    navigationOptions: {
      title: 'Input Teacher',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },

  UpdateTeacher : {
    screen: UpdateTeacher,
    headerMode: '',
    navigationOptions: {
      title: 'Update Teacher',
      headerStyle: {
        backgroundColor: '#3a81f7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
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

      <Provider store={store}>
        {/* {children} */}
        <Root>
       <AppContainer  />
       </Root>
      </Provider>
    );
  }

}
