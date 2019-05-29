import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getTeachers, addTeachers} from '../redux/actions/teachers';
class InputTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher_name: '',
      loading: true
    }
  }

  saveTeacher = () => {
    setTimeout(() => {
    this.props.addTeachersDispatch(this.state.teacher_name)
  }, 100)
    setTimeout(() => {
    this.props.getTeachersDispatch()
  }, 500)
    Toast.show({
        text: `Teacher's name added`,
        duration: 1500
      })
    this.props.navigation.navigate('Teachers')
}

  render() {
    return (
      <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text style={styles.txtsubtitle}>Add Name</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Name</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Teacher Name' onChangeText={(teacher_name) => this.setState({teacher_name})}
                value={this.state.teacher_name}/>
            </Item>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Button active style={styles.btnCart}
            onPress={() => this.saveTeacher()}>
              <Text style={styles.txtBtnCart}>Save</Text>
            </Button>
          </CardItem>
        </Card>

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
  header: {
    backgroundColor: '#f76710',
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
    color: '#3a81f7',
    marginLeft:100
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
  },
  txtLocation: {
    marginLeft:18,
    fontWeight:'bold',
    color:'#3a81f7',
    fontSize:16,
    marginBottom:12,
    marginTop:12
  }

});

const mapStateToProps = state => ({
  pending: state.teachers.pending
})

const mapDispatchToProps = dispatch => {
  return {
    getTeachersDispatch: () => {
      dispatch(getTeachers())
    },
    addTeachersDispatch: (teacher_name) => {
      dispatch(addTeachers(teacher_name))
    }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(InputTeacher));
