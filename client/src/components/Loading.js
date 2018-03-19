import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <LoadingContainer>
    <ActivityIndicator size="large" />
  </LoadingContainer>
);

export default Loading;
