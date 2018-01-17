import React, { Component } from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
`;

class Cards extends Component {
  static navigationOptions = {
    tabBarLabel: 'For You',
    swipeEnabled: false,
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default Cards;
