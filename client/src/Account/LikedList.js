import React, { Component } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';

const MainContainer = styled.View`
  flex: 1;
`;

class LikedList extends Component {
  state = {};
  render() {
    return (
      <MainContainer>
        <Card />
      </MainContainer>
    );
  }
}

export default LikedList;
