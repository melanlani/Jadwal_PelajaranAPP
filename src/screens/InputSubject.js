import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getTeachers } from '../redux/actions/teachers';
import { getSubjects, addSubjects} from '../redux/actions/subjects';
class InputSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_name: '',
      teacher_id: 0,
      schedule_start: '00:00',
      schedule_end: '00:00'
    }
  }

  componentDidMount() {
    this.props.getTeachersDispatch()
  }

  onValueChange(value: string) {
    this.setState({
      teacher_id: value
    });
  }

  saveSubject = () => {
    setTimeout(() => {
    this.props.addSubjectsDispatch(this.state.subject_name, this.state.teacher_id, this.state.schedule_start, this.state.schedule_end )
  }, 500)
    setTimeout(() => {
    this.props.getSubjectsDispatch()
  }, 1500)
    Toast.show({
        text: `Subject's name added`,
        duration: 1500
      })
    this.props.navigation.navigate('Subjects')
}

  render() {
    return (
      <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text style={styles.txtsubtitle}>Add Subject</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Name</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Subject Name' onChangeText={(subject_name) => this.setState({subject_name})}
                value={this.state.subject_name}/>
            </Item>
          </CardItem>
            <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16}}>Teacher's Name</Text>
          <CardItem>
            <Form style={{width:320, backgroundColor:'#c5d3e8'}}>
              <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.teacher_id}
              onValueChange={(itemValue, itemIndex) => this.setState({teacher_id: itemValue})}>
              <Picker.Item label="Choose Teacher's Name" value="0" />
              { this.props.teachers.map((item, key)=>(
              <Picker.Item label={item.teacher_name} value={item.id} key={key} />)
              )}
            </Picker>
          </Form>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Schedule</Text>
          <CardItem>
            <Item square style={{height:40, width:141, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='start' onChangeText={(schedule_start) => this.setState({schedule_start})}
                value={this.state.schedule_start}/>
            </Item>
            <Text style={{fontWeight:'bold', color:'#3a81f7'}}>  until  </Text>
            <Item square style={{height:40, width:141, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='end' onChangeText={(schedule_end) => this.setState({schedule_end})}
                value={this.state.schedule_end}/>
            </Item>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Button active style={styles.btnCart}
            onPress={() => this.saveSubject()}>
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
  pending: state.subjects.pending,
  teachers: state.teachers.data
})

const mapDispatchToProps = dispatch => {
  return {
    getTeachersDispatch: () => {
      dispatch(getTeachers())
    },
    getSubjectsDispatch: () => {
      dispatch(getSubjects())
    },
    addSubjectsDispatch: (subject_name,teacher_id,schedule_start, schedule_end) => {
      dispatch(addSubjects(subject_name,teacher_id,schedule_start, schedule_end))
    }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(InputSubject));
