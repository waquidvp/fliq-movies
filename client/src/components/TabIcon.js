import React, { Component } from 'react';
import styled from 'styled-components/native';

const TabIconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const TabIcon = ({ config: { tintColor }, source }) => (
  <TabIconImage
    style={{ opacity: tintColor === '#ffffff' ? 0.87 : 0.36 }}
    source={source}
  />
);

export default TabIcon;
