import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Item, Input, Toast} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "lani@gm.com",
      password: "123",
      showToast: false,
      isLoggedIn: false
    };
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('token');
    if(value !== null) {
      this.props.navigation.navigate('HomeAdmin')
    }
  }

  login = () => {
    axios.post(`http://192.168.1.5:3333/api/v1/login/`, {
        'email': this.state.email,
        'password': this.state.password
    })
    .then(res => {
      if (res.data.success === true) {
        const { token, type } = res.data.access_token
        AsyncStorage.setItem('token', type + ' ' + token);
        this.setState({ isLoggedIn:true });
        this.props.navigation.navigate('HomeAdmin', {
          isLoggedIn: this.state.isLoggedIn
        });
        Toast.show({
          text: "Welcome to Admin Page",
          buttonText: "Okay",
          duration: 1500,
          type: "dark"
        })
      }
      else{
        alert('Email/Password is wrong');
      }
    })
  }

  render() {

    return (

      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.navigate('Home')}}>
              <Icon name='home' />
            </Button>
          </Left>
          <Body>
            <Title>Schedules</Title>
          </Body>
        </Header>
        <Content>
          <Image source={require('./assets/logo.png')} style={styles.banner}/>
          <Item style={styles.sizeItem}>
            <Input placeholder="Email" onChangeText={(email) => this.setState({email})}
              value={this.state.email}/>
          </Item>
          <Item style={styles.sizeItem}>
            <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
          </Item>
          <Button style={styles.btnLogin} onPress={() => this.login()}>
            <Text style={styles.txtlogin}>Sign in</Text>
          </Button>
        </Content>
        </Container>

    );

  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    backgroundColor: '#3a81f7',
  },
  txtheader: {
    fontSize: 22,
    marginLeft:57
  },
  banner: {
    height: 155,
    width: 155,
    marginTop: 90,
    marginLeft: 100
  },
  sizeItem: {
    marginTop: 20,
    marginLeft: 20,
    width:320
  },
  btnDaftar: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a81f7',
    marginLeft: 40,
    marginTop: 20
  },
  btnLogin: {
    width:321,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a81f7',
    marginTop: 20,
    marginLeft: 20
  },
  txtlogin: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 4
  },
  txtdaftar: {
    fontSize: 14,
    color: '#3a81f7'
  }

});


export default Login;
