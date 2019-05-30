import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button,
  Icon, Title, CardItem, Card, Item, Input, Form, Picker, ListItem, CheckBox, Thumbnail, Toast} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getSubjects} from '../redux/actions/subjects';
import { getSchedules, showSchedules, updateSchedules} from '../redux/actions/schedules';
class UpdateSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      day: ''
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', '');
    setTimeout(() => {
    this.props.showSchedulesDispatch(id);
    }, 100)
    setTimeout(() => {
    this.props.getSubjectsDispatch()
  }, 500)
  }

  onSelectedItemsChange = selectedItems => {
      // alert(JSON.stringify(selectedItems));
    this.setState({ selectedItems });
  };

  saveTeacher = () => {
    const id = this.props.navigation.getParam('id', '');
    setTimeout(() => {
      this.props.updateSchedulesDispatch(id, this.state.selectedItems)
      this.props.getSchedulesDispatch()
    }, 100)
    Toast.show({
        text: `Schedule updated`,
        duration: 1500
      })
    this.props.navigation.navigate('Schedule_Subject')
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
            <Text style={styles.txtsubtitle}>Update Schedule</Text>
          </CardItem>
          <Text style={{marginLeft:18, fontWeight:'bold', color:'#3a81f7', fontSize:16, marginTop:12}}>Day</Text>
          <CardItem>
            <Item rounded style={{height:40, width:318, backgroundColor:'#c5d3e8'}}>
              { this.props.schedules.map((item, key)=>(
              <Input placeholder='Subject Name' defaultValue={item.day} key={key} disabled/>)
              )}
            </Item>
          </CardItem>
        </Card>
        <Card>

          <Text style={styles.txtLocation}>Subjects</Text>
          <CardItem>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'stretch' }} >
            <MultiSelect
              hideTags
              items={this.props.subjects}
              key={this.props.subjects.id}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              selectText="Pick Subjects"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={ (text)=> console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="subject_name" 
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
              <View>
                {this.multiSelect
                  ?
                  this.multiSelect.getSelectedItemsExt(this.state.selectedItems)
                  :
                  null
                }
              </View>
            </View>
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
  pending: state.schedules.pending,
  subjects: state.subjects.data,
  schedules: state.schedules.dataSingle
})

const mapDispatchToProps = dispatch => {
  return {
    getSubjectsDispatch: () => {
      dispatch(getSubjects())
    },
    getSchedulesDispatch: () => {
      dispatch(getSchedules())
    },
    showSchedulesDispatch: (id) => {
      dispatch(showSchedules(id))
    },
    updateSchedulesDispatch: (id, selectedItems) => {
      dispatch(updateSchedules(id, selectedItems))
    }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(UpdateSchedule));
