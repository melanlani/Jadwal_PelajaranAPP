import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form, Spinner} from 'native-base';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin';
import Schedules from './schedules'
import AsyncStorage from '@react-native-community/async-storage';

class Schedule_Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      loading: false
    };
  }

  componentDidMount() {
    this.checkToken();
    axios.get('http://192.168.1.5:3333/api/v1/schedules')
      .then(res => {
        const schedules = res.data.result;
        this.setState({ schedules: schedules, loading:true });
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
            axios.delete(`http://192.168.1.5:3333/api/v1/schedules/${id}`);
            Toast.show({
              text: 'Deleted Success',
              duration: 1500
            })
            this.props.navigation.navigate('Schedule_Subject')
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {

    return (

        <Container>

          <Content>
          <Card>
            <CardItem header bordered>
              <Text style={styles.txtsubtitle}>Data Schedules</Text>
            </CardItem>
          </Card>
          <FlatList
            data={this.state.schedules}
            renderItem={({item}) =>(

              <Card>
                <CardItem>
                      <Text style={{fontSize:20, color:'#3a81f7'}}>{item.day}</Text>
                </CardItem>
                { item.subjects.map((item, key)=>(

                  <CardItem key={key}>
                    <Body><Text>{item.subject_name}</Text></Body>
                    <Right><Text note>{item.schedule_start} - {item.schedule_end}</Text></Right>
                  </CardItem>
                ))}
                <CardItem>
                  <Button primary small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('UpdateSchedule')}}>
                    <Icon name="pencil" type="FontAwesome"/>
                    <Text>Update</Text>
                  </Button>
                </CardItem>
              </Card>
            )}
          keyExtractor={(item, index) => index.toString()}
          />
          </Content>
        </Container>


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


export default Schedule_Subject;
