import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Icon, Right, Button, Title, CardItem, Card, Segment, Text, Picker, Form} from 'native-base';
import axios from 'axios';

class Schedules extends Component {

  render() {

    return (
        <Card>
          <CardItem header bordered>
            { this.props.schedules.map((item, key)=>(
            <Text style={{fontSize:20}} key={key}>{item.day}</Text>
            ))}
            <Text note> ({this.props.teacher})</Text>
          </CardItem>

            <CardItem bordered>
              <Body><Text>{this.props.subject}</Text></Body>
              <Right><Text note>{this.props.start} - {this.props.end}</Text></Right>
            </CardItem>
        </Card>

      );

  }
}
const styles = StyleSheet.create({

  header: {
    backgroundColor: '#f76710',
  },

});


export default Schedules;
