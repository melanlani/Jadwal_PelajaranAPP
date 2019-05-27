import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form} from 'native-base';
import axios from 'axios';
import SideBar from './SideBar';
import Schedules from './schedules'

class Home extends Component {
  constructor(props) {
  super(props);
  this.state = {
    schedules: [],
    selected: 1,
  };
  this.firstpage=this.firstpage.bind(this);
  this.secondpage=this.secondpage.bind(this);
    this.state = {
      page:1,
      firstpageactive:true,
      secondpageactive:false,
    } ;
  }

  componentDidMount() {
    axios.get('http://192.168.1.5:3333/api/v1/schedules')
      .then(res => {
        const schedules = res.data.result;
        this.setState({ schedules });
      })
    axios.get('http://192.168.1.5:3333/api/v1/teachers')
      .then(res => {
        this.setState({
            dataSource: res.data.result
          }, function() {
            // In this block you can do something with new state.
          });
      })
  }

  firstpage(){
    this.setState({
      page:1,
      firstpageactive:true,
      secondpageactive:false})
    }

  secondpage(){
    this.setState({page:2,
    firstpageactive:false,
    secondpageactive:true})
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  GetPickerSelectedItemValue=()=>{

    axios.get(`http://192.168.1.5:3333/api/v1/subjects/${this.state.selected}`)
      .then(res => {
        this.setState({
            dataFilters: res.data.result
          }, function() {
            // In this block you can do something with new state.
          });
      })

  }

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  render() {
    const page = this.state.page ;
    let shows = null;
    let menu = null;
    if (page == 1 ){
      shows =
              <FlatList
              data={this.state.schedules}
              renderItem={({item}) =>(
                <Card>
                  <CardItem header bordered>
                    <Text style={{fontSize:20}}>{item.day}</Text>
                  </CardItem>
                  { item.subjects.map((item, key)=>(

                    <CardItem bordered key={key}>
                      <Body><Text>{item.subject_name}</Text></Body>
                      <Right><Text note>{item.schedule_start} - {item.schedule_end}</Text></Right>
                    </CardItem>

                  ))}
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()} />

    }else if (page == 2) {
      menu =<Card style={{backgroundColor: '#3a81f7'}}>
              <CardItem style={{backgroundColor: '#3a81f7'}}>
              <Left><Text>Schedules based on teacher's name</Text></Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Form style={{width:220}}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      selectedValue={this.state.selected}
                      onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
                      <Picker.Item label="Choose Teacher's Name" value="1" />
                      { this.state.dataSource.map((item, key)=>(
                      <Picker.Item label={item.teacher_name} value={item.id} key={key} />)
                      )}
                    </Picker>
                  </Form>
                </Left>
                <Right><Button small primary onPress={ this.GetPickerSelectedItemValue }><Text> Filter </Text></Button></Right>
              </CardItem>
            </Card>

      shows = <FlatList
              data={this.state.dataFilters}
              renderItem={({item}) =>(
                <Schedules subject={item.subject_name} start={item.schedule_start} end={item.schedule_end} teacher={item.teacher.teacher_name} schedules={item.schedules}/>
              )}
              keyExtractor={(item, index) => index.toString()} />

    }

    return (
      <Drawer ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header hasSegment>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Schedules</Title>
            </Body>
          </Header>

          <Segment>
            <Button active={this.state.firstpageactive} onPress= {this.firstpage}>
              <Text>Schedules</Text>
            </Button>
            <Button active={this.state.secondpageactive} onPress= {this.secondpage}>
              <Text>Filter</Text>
            </Button>
          </Segment>
          <Content padder>
            {menu}
            {shows}
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


export default Home;
