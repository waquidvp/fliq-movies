import React, { Component } from 'react';
import styled from 'styled-components/native';

const TabIconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const TabIcon = ({ focused, source }) => (
  <TabIconImage style={{ opacity: focused ? 0.87 : 0.54 }} source={source} />
);

export default TabIcon;
