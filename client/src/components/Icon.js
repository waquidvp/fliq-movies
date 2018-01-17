import React, { Component } from 'react';
import styled from 'styled-components/native';

const IconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const Icon = ({ source }) => <IconImage source={source} />;

export default Icon;
