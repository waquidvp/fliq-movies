import React from 'react';
import styled from 'styled-components/native';

const IconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const IconImageSmall = styled.Image`
  height: 20px;
  width: 20px;
`;

const Icon = ({ source, style, small }) => {
  if (small) return <IconImageSmall source={source} style={style} />;

  return <IconImage source={source} style={style} />;
};

export default Icon;
