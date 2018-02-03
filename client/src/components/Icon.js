import React, { Component } from 'react';
import styled from 'styled-components/native';

const IconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const Icon = ({ source, style }) => <IconImage source={source} style={style} />;

export default Icon;
