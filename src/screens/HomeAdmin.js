import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form} from 'native-base';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin';
import Schedules from './schedules'
import AsyncStorage from '@react-native-community/async-storage';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  componentDidMount() {
    const { navigation } = this.props;
    const isLoggedIn = navigation.getParam("isLoggedIn", "");
    this.props.navigation.addListener('didFocus', () => {
      if (isLoggedIn === false) {
        this.props.navigation.navigate('Login')
      }
      else {
          this.checkToken();
      }
    })
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
  render() {

    return (
      <Drawer ref={(ref) => { this._drawer = ref; }}
        content={<SideBarAdmin navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Schedules</Title>
            </Body>
          </Header>

          <Content>
            <Text>Welcome to Member Page {this.state.user.username}</Text>
          </Content>
        </Container>
      </Drawer>

      );

  }
}
const styles = StyleSheet.create({

  header: {
    backgroundColor: '#f76710',
  },

});


export default HomeAdmin;
