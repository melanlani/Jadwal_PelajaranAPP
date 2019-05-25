import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text} from 'native-base';
import axios from 'axios';
import SideBar from './SideBar';

class Home extends Component {
  constructor(props) {
  super(props);
  this.state = {
      schedules: []
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

  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  render() {
    const page = this.state.page ;
    let shows = null;
    if (page == 1 ){
      shows =
              <FlatList
              data={this.state.schedules}
              renderItem={({item}) =>(
                <Card>
                  <CardItem header bordered>
                    <Text style={{fontSize:20}}>{item.day}</Text>
                  </CardItem>

                  <CardItem bordered><Body>
                  <FlatList
                    data={item.subjects}
                    renderItem={({ item }) => (
                        <Text>{item.subject_name} {item.schedule_start} - {item.schedule_end}</Text>
                    )}
                    keyExtractor={(item, index) => String(item.id)}
                  /></Body></CardItem>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()} />

    }else if (page == 2) {
      shows = <Text> hello page 2 </Text>

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
              <Text>Order By Days</Text>
            </Button>
            <Button active={this.state.secondpageactive} onPress= {this.secondpage}>
              <Text>Order By Teacher</Text>
            </Button>
          </Segment>
          <Content padder>
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
