import React from 'react';
import styled from 'styled-components/native';

const IconImage = styled.Image`
  height: 170px;
  width: 170px;
`;

const MovieIcon = () => (
  <IconImage source={require('../assets/images/clapperboard.png')} />
);

export default MovieIcon;
