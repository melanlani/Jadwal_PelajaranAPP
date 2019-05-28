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
    this.checkToken();
  }

  checkToken = async () => {
    const token= await AsyncStorage.getItem('token');

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
            Toast.show({
              text: "See you...",
              buttonText: "Okay",
              duration: 1500,
              type: "dark"
            })
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
        <Text style={styles.txtlogo}>Hello, {this.state.user.username}</Text>
        <Card style={styles.sizeCard}>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Teachers')}}>
              <Icon name="person" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>Data Teachers</Text>
            </Button>
          </CardItem>
        </Card>

        <Card style={styles.Card}>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Subjects')}}>
              <Icon name="book" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>Data Subjects</Text>
            </Button>
          </CardItem>
        </Card>

        <Card style={styles.Card}>
          <CardItem>
            <Button transparent onPress={() => { this.props.navigation.navigate('Schedule_Subject')}}>
              <Icon name="calendar" type="FontAwesome" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>Data Schedules</Text>
            </Button>
          </CardItem>
        </Card>

        <Card style={styles.Card}>
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
    marginLeft:103,
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
  },
  Card: {
    marginTop:10
  }
  });
