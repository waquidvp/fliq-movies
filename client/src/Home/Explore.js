import React, { Component } from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
`;

class Explore extends Component {
  static navigationOptions = {
    tabBarLabel: 'Explore',
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default Explore;
