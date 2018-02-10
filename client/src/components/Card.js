import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import PlatformTouchable from 'react-native-platform-touchable';

import Touchable from '../components/Touchable';

const MainContainer = styled.View`
  background-color: white;
`;

const AnimatedCard = Animated.createAnimatedComponent(MainContainer);

const Touch = styled(Touchable)`
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 1;
`;

class Card extends React.Component {
  static propTypes = {
    elevation: PropTypes.number.isRequired,
    activeElevation: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    innerStyle: PropTypes.object,
  };

  state = {
    elevationAnim: new Animated.Value(this.props.elevation),
  };

  toRest = () => {
    const { elevationAnim } = this.state;
    const { elevation } = this.props;

    Animated.timing(elevationAnim, {
      toValue: elevation,
      duration: 100,
    }).start();
  };

  elevate = () => {
    const { elevationAnim } = this.state;
    const { activeElevation } = this.props;

    Animated.timing(elevationAnim, {
      toValue: activeElevation,
      duration: 100,
    }).start();
  };

  render() {
    const { elevationAnim } = this.state;
    const { style, innerStyle, children } = this.props;

    const shadowElevation = {
      shadowOpacity: 0.0015 * elevationAnim + 0.18,
      shadowRadius: 0.54 * elevationAnim,
      shadowOffset: {
        height: 0.6 * elevationAnim,
      },
    };

    return (
      <AnimatedCard
        style={{
          elevation: elevationAnim,
          ...shadowElevation,
          ...style,
        }}
      >
        <Touch
          onPressIn={() => this.elevate()}
          onPressOut={() => this.toRest()}
          background={PlatformTouchable.SelectableBackgroundBorderless()}
          style={{
            borderRadius: style.background,
          }}
        >
          <CardContainer style={innerStyle}>{children}</CardContainer>
        </Touch>
      </AnimatedCard>
    );
  }
}

export default Card;
