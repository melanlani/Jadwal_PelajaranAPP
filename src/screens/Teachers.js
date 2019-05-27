import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form, Spinner} from 'native-base';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin';
import Schedules from './schedules'
import AsyncStorage from '@react-native-community/async-storage';

class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      loading: false
    };
  }

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  componentDidMount() {
    this.checkToken();
    axios.get('http://192.168.1.5:3333/api/v1/teachers')
      .then(res => {
        const teachers = res.data.result;
        this.setState({ teachers: teachers, loading:true });
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

  deleteItem(id) {
    Alert.alert(
      'Are you sure to delete item?','',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () =>
          {
            axios.delete(`http://192.168.1.5:3333/api/v1/teachers/${id}`);
            Toast.show({
              text: 'Deleted Success',
              duration: 1500
            })
            this.props.navigation.navigate('Teachers')
          }
        },
      ],
      { cancelable: false },
    );
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
          <Card>
            <CardItem header bordered>
              <Left>
                <Text style={styles.txtsubtitle}>Data Teachers</Text>
              </Left>
              <Right>
                <Button primary small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('HomeAdmin', {
                  id: item.id
                })}}>
                  <Icon name="plus" type="FontAwesome"/>
                  <Text>Input</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <FlatList
            data={this.state.teachers}
            renderItem={({item}) =>(

              <Card>
                <CardItem>
                  <Left>
                    <Text style={{fontSize:20}}>{item.teacher_name}</Text>
                  </Left>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button success small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('HomeAdmin', {
                      id: item.id
                    })}}>
                      <Text>Edit</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button danger small style={styles.btnDelete} onPress={() => this.deleteItem(item.id)} >
                      <Text>Delete</Text>
                    </Button>
                  </Body>
                  <Right>
                  </Right>
                </CardItem>
              </Card>
            )}
          keyExtractor={(item, index) => index.toString()}
          />
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
  header: {
    backgroundColor: '#3a81f7',
  },
  txtheader: {
    fontSize: 22,
    marginLeft:57
  },
  iconPosition: {
    marginLeft:150,
    marginTop:13,
    color: "#3a81f7"
  },
  txtBtnCart: {
    left:150,
    color:'white'
  },
  btnCart: {
    width:321,
    backgroundColor:'#3a81f7'
  },
  txtname:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#062e56'
  },
  txtemail:{
    fontSize: 10
  },
  txttitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a81f7'
  },
  txtsubtitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a81f7'
  },
  txtlogout: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 4
  },
  btnLogout: {
    backgroundColor: '#3a81f7',
    width:49,
    height:40,
    marginBottom: 35
  }

});


export default Teachers;
