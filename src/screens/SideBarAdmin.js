import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Alert } from 'react-native';
import { Content,Button,Text,Card,Left, Right, CardItem, Icon, Thumbnail, Toast } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class SideBarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      access_token: {}
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      if (this.props.isLoggedIn === false) {
        this.props.navigation.navigate('Login')
      }
      else {
          this.checkToken();
      }
    })
  }

  checkToken = async () => {
    const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU1ODk1NTIwN30.CtpRfc8ZSSaX1Idq4T01N1mnqq1h0lG04VmbdZ7HuMs';

      axios.get(`http://192.168.1.5:3333/api/v1/user`, {
        headers: {
            Authorization: token
        }
      })
      .then(res => {
        const user = res.data.user;
        this.setState({ user });
      })

  }

  logout() {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
            text: 'Batal',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'Ok', onPress: () =>
          {
            this.setState({ user: {}, access_token: {}})
            AsyncStorage.removeItem('token')
            this.props.navigation.navigate('Home')
          }
        },
      ],
      { cancelable: false },
    );
  }
  render(){
    return(
      <Content style={{backgroundColor: '#3a81f7'}}>
        <Thumbnail square source={require('./assets/foto.jpg')} style={styles.imageLogo}/>
        <Text style={styles.txtlogo}>{this.state.user.username}</Text>
        <Card style={styles.sizeCard}>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Login')}}>
              <Icon name="pencil" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>CRUD Teachers</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Login')}}>
              <Icon name="pencil" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>CRUD Subjects</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Login')}}>
              <Icon name="pencil" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>CRUD Schedules</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent onPress={() => this.logout()}>
              <Icon name="power-off" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>Logout</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default withNavigation(SideBarAdmin);

const styles = StyleSheet.create({
  imageLogo: {
    height: 150 ,
    width: 150,
    marginLeft:70,
    marginTop:40
  },
  txtlogo: {
    marginLeft:125,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 18
  },
  buttonLogin: {
    backgroundColor: '#E91E63',
    width: 100,
    marginLeft:40
  },
  buttonSignup: {
    backgroundColor: 'white'
  },
  sizeCard: {
    marginTop:60
  }
  });
