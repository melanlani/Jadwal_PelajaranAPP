import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getTeachers } from '../redux/actions/teachers';
import { getSubjects, showSubjects, updateSubjects} from '../redux/actions/subjects';
class UpdateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_name: '',
      teacher_id: 0,
      teacher_name: '',
      schedule_start: '',
      schedule_end: ''
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', '');
    setTimeout(() => {
    axios.get(`http://192.168.1.5:3333/api/v1/subjects/subject/${id}`)
    .then(response => {
      response.data.result.map((item, key)=>(
      this.setState({
        subject_name: item.subject_name,
        teacher_id: item.teacher_id,
        teacher_name: item.teacher.teacher_name,
        schedule_start: item.schedule_start,
        schedule_end : item.schedule_end
      }, () => {
        console.log(this.state);
      })
    ));
    })
    }, 100)
    setTimeout(() => {
    this.props.getTeachersDispatch()
  }, 500)
  }

  saveTeacher = () => {
    const id = this.props.navigation.getParam('id', '');
    setTimeout(() => {
      this.props.updateSubjectsDispatch(id, this.state.subject_name, this.state.teacher_id, this.state.schedule_start, this.state.schedule_end)
    }, 500)
      setTimeout(() => {
        this.props.getSubjectsDispatch()
    }, 1500)
    Toast.show({
        text: `Subject updated`,
        duration: 1500
      })
    this.props.navigation.navigate('Subjects')
}

  render() {
    const { pending } = this.props
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
            <Text style={styles.txtsubtitle}>Update Name</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Name</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Subject Name' name="subject_name" ref="subject_name" value={this.state.subject_name} disabled/>
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
              <Picker.Item label={this.state.teacher_name} name="teacher_id" ref="teacher_id" value={this.state.teacher_id}/>
              { this.props.teachers.map((item, key)=>(
              <Picker.Item label={item.teacher_name} value={item.id} key={key} />)
              )}
            </Picker>
          </Form>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Schedule</Text>
          <CardItem>
            <Item square style={{height:40, width:141, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Subject Name' name="schedule_start" ref="schedule_start" value={this.state.schedule_start} onChangeText={(schedule_start) => this.setState({schedule_start})}/>
            </Item>
            <Text style={{fontWeight:'bold', color:'#3a81f7'}}>  until  </Text>
            <Item square style={{height:40, width:141, backgroundColor:'#c5d3e8'}}>
              <Input placeholder='Subject Name' name="schedule_end" ref="schedule_end" value={this.state.schedule_end} onChangeText={(schedule_end) => this.setState({schedule_end})}/>
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
}
const styles = StyleSheet.create({

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
  pending: state.teachers.pending,
  subject: state.subjects.dataSingle,
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
    showSubjectsDispatch: (id) => {
      dispatch(showSubjects(id))
    },
    updateSubjectsDispatch: (id, subject_name,teacher_id,schedule_start, schedule_end) => {
      dispatch(updateSubjects(id, subject_name,teacher_id,schedule_start, schedule_end))
    }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(UpdateSubject));
