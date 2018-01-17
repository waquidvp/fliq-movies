import React, { Component } from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
`;

class WhatsHotList extends Component {
  static navigationOptions = {
    tabBarLabel: "What's Hot 🔥",
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default WhatsHotList;
