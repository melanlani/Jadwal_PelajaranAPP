import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Content,Button,Text,Card,Left, Right, CardItem, Icon, Thumbnail } from 'native-base';

class SideBar extends Component {
  render(){
    return(
      <Content style={{backgroundColor: '#3a81f7'}}>
        <Thumbnail circle source={require('./assets/logo.png')} style={styles.imageLogo}/>
        <Text style={styles.txtlogo}>Schedules</Text>
        <Card style={styles.sizeCard}>
          <CardItem>
            <Button transparent>
              <Icon name="person" style={{ color: "#3a81f7"}}/>
              <Text style={{ color: "#3a81f7"}}>Login</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default withNavigation(SideBar);

const styles = StyleSheet.create({
  imageLogo: {
    height: 150 ,
    width: 150,
    marginLeft:70,
    marginTop:40
  },
  txtlogo: {
    marginLeft:105,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 18
  },
  buttonLogin: {
    backgroundColor: '#E91E63',
    width: 100,
    marginLeft:40
  },
  buttonSignup: {
    backgroundColor: 'white'
  },
  sizeCard: {
    marginTop:60
  }
  });
