import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Card from './Card';

const IconContainer = styled.View`
  padding-right: 16px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: black;
  font-weight: 500;
  text-align: center;
`;

class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.element,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    iconStyle: PropTypes.object,
    innerStyle: PropTypes.object,
    textStyle: PropTypes.object,
    elevation: PropTypes.number,
    activeElevation: PropTypes.number,
    big: PropTypes.bool,
  };

  static defaultProps = {
    elevation: 4,
    activeElevation: 6,
    big: false,
  };

  state = {};

  render() {
    const {
      style,
      elevation,
      activeElevation,
      big,
      onPress,
      iconStyle,
      innerStyle,
      textStyle,
    } = this.props;

    const height = big ? 44 : 36;
    const fontSize = big ? 16 : 14;

    return (
      <Card
        style={{
          height,
          borderRadius: 22,
          ...style,
        }}
        innerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          ...innerStyle,
        }}
        elevation={elevation}
        activeElevation={activeElevation}
        onPress={() => onPress()}
      >
        {this.props.icon && (
          <IconContainer style={iconStyle}>{this.props.icon}</IconContainer>
        )}
        <ButtonText
          style={{
            fontSize,
            ...textStyle,
          }}
        >
          {this.props.title}
        </ButtonText>
      </Card>
    );
  }
}

export default Button;
