import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import PlatformTouchable from 'react-native-platform-touchable';

import Touchable from './Touchable';
import Icon from './Icon';

const TouchContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const Touch = styled(Touchable)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

class IconButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    source: PropTypes.number.isRequired,
  };

  state = {};

  render() {
    const { onPress, source } = this.props;

    return (
      <TouchContainer>
        <Touch
          onPress={() => onPress()}
          background={PlatformTouchable.SelectableBackgroundBorderless()}
        >
          <Icon source={source} />
        </Touch>
      </TouchContainer>
    );
  }
}

export default IconButton;
