import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form, Spinner, Toast} from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SideBarAdmin from './SideBarAdmin';
import Schedules from './schedules'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getTeachers, deleteTeachers} from '../redux/actions/teachers';

class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: []
    };
  }

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getTeachersDispatch()
    }, 500)

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
            this.props.deleteTeachersDispatch(id)
            this.componentDidMount()
            Toast.show({
              text: 'Deleted Success',
              duration: 1500
            })
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { teachers, pending } = this.props
    if (pending) {
      return(
        <View style={styles.container}>
          <ActivityIndicator color="#ffffff" size="large"  />
        </View>
      )
    }
    else {
      return (

          <Container>
            <Content>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Text style={styles.txtsubtitle}>List Teachers</Text>
                </Left>
                <Right>
                  <Button primary small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('InputTeacher')}}>
                    <Icon name="plus" type="FontAwesome"/>
                    <Text>Input</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
            <FlatList
              data={teachers}
              renderItem={({item}) =>(

                <Card>
                  <CardItem>
                    <Left>
                      <Text style={{fontSize:20}}>{item.teacher_name}</Text>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button success small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('UpdateTeacher', {
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


      );
    }
  }
}
const styles = StyleSheet.create({

  header: {
    backgroundColor: '#f76710',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3a81f7',
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

const mapStateToProps = state => ({
  pending: state.teachers.pending,
  teachers: state.teachers.data
})

const mapDispatchToProps = dispatch => {
  return {
    getTeachersDispatch: () => {
      dispatch(getTeachers())
    },
    deleteTeachersDispatch: (id) => {
      dispatch(deleteTeachers(id))
    },
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Teachers));
