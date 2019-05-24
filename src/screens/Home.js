import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text} from 'native-base';

import SideBar from './SideBar';

class Home extends Component {
  constructor(props) {
  super(props);
  this.firstpage=this.firstpage.bind(this);
  this.secondpage=this.secondpage.bind(this);
    this.state = {
      page:1,
      firstpageactive:true,
      secondpageactive:false,
    } ;
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
      shows = <Card>
                <CardItem header bordered>
                  <Text style={{fontSize:20}}>Monday</Text>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Matematika</Text></Body>
                  <Right><Text note>07:30 - 09: 00</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Kimia</Text></Body>
                  <Right><Text note>09:10 - 12: 10</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Bahasa Inggris</Text></Body>
                  <Right><Text note>13:00 - 14: 30</Text></Right>
                </CardItem>

                <CardItem header bordered>
                  <Text style={{fontSize:20}}>Tuesday</Text>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Bahasa Indonesia</Text></Body>
                  <Right><Text note>07:30 - 09: 00</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Fisika</Text></Body>
                  <Right><Text note>09:10 - 12: 10</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Agama</Text></Body>
                  <Right><Text note>13:00 - 14: 30</Text></Right>
                </CardItem>

                <CardItem header bordered>
                  <Text style={{fontSize:20}}>Wednesday</Text>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Matematika</Text></Body>
                  <Right><Text note>07:30 - 09: 00</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Kimia</Text></Body>
                  <Right><Text note>09:10 - 12: 10</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Bahasa Inggris</Text></Body>
                  <Right><Text note>13:00 - 14: 30</Text></Right>
                </CardItem>

                <CardItem header bordered>
                  <Text style={{fontSize:20}}>Thursday</Text>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Bahasa Indonesia</Text></Body>
                  <Right><Text note>07:30 - 09: 00</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Fisika</Text></Body>
                  <Right><Text note>09:10 - 12: 10</Text></Right>
                </CardItem>
                <CardItem bordered>
                  <Body><Text>Agama</Text></Body>
                  <Right><Text note>13:00 - 14: 30</Text></Right>
                </CardItem>
              </Card>

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
