import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form, Spinner} from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SideBarAdmin from './SideBarAdmin';
import Schedules from './schedules'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getSchedules} from '../redux/actions/schedules';

class Schedule_Subject extends Component {
  componentDidMount() {
    this.props.getSchedulesDispatch()
  }

  render() {
    const { schedules, pending } = this.props
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
              <Text style={styles.txtsubtitle}>Data Schedules</Text>
            </CardItem>
          </Card>
          <FlatList
            data={schedules}
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
                  <Button primary small style={styles.btnDelete} onPress={() => {this.props.navigation.navigate('UpdateSchedule', {
                    id: item.id
                  })}}>
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
const mapStateToProps = state => ({
  pending: state.schedules.pending,
  schedules: state.schedules.data
})

const mapDispatchToProps = dispatch => {
  return {
    getSchedulesDispatch: () => {
      dispatch(getSchedules())
    }
  }
}
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Schedule_Subject));
