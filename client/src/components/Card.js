import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import PlatformTouchable from 'react-native-platform-touchable';

import Touchable from '../components/Touchable';
import { elevationToShadow } from '../utils/helper';

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
    onPress: PropTypes.func,
  };

  state = {
    elevationAnim: new Animated.Value(this.props.elevation),
    shadowOpacityAnim: new Animated.Value(this.props.elevation * 0.0015 + 0.18),
    shadowRadiusAnim: new Animated.Value(this.props.elevation * 0.54),
    shadowOffsetHeightAnim: new Animated.Value(this.props.elevation * 0.6),
  };

  toRest = () => {
    const {
      elevationAnim,
      shadowOpacityAnim,
      shadowRadiusAnim,
      shadowOffsetHeightAnim,
    } = this.state;
    const { elevation } = this.props;

    Animated.timing(elevationAnim, {
      toValue: elevation,
      duration: 100,
    }).start();

    Animated.parallel([
      Animated.timing(shadowOpacityAnim, {
        toValue: elevation * 0.0015 + 0.18,
        duration: 100,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: elevation * 0.54,
        duration: 100,
      }),
      Animated.timing(shadowOffsetHeightAnim, {
        toValue: elevation * 0.6,
        duration: 100,
      }),
    ]).start();
  };

  elevate = () => {
    const {
      elevationAnim,
      shadowOpacityAnim,
      shadowRadiusAnim,
      shadowOffsetHeightAnim,
    } = this.state;
    const { activeElevation } = this.props;

    Animated.timing(elevationAnim, {
      toValue: activeElevation,
      duration: 100,
    }).start();

    Animated.parallel([
      Animated.timing(shadowOpacityAnim, {
        toValue: elevationToShadow(activeElevation).shadowOpacity,
        duration: 100,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: elevationToShadow(activeElevation).shadowRadius,
        duration: 100,
      }),
      Animated.timing(shadowOffsetHeightAnim, {
        toValue: elevationToShadow(activeElevation).shadowOffset.height,
        duration: 100,
      }),
    ]).start();
  };

  render() {
    const {
      elevationAnim,
      shadowOpacityAnim,
      shadowRadiusAnim,
      shadowOffsetHeightAnim,
    } = this.state;

    const { style, innerStyle, children, onPress } = this.props;

    const shadowElevation = {
      shadowOpacity: shadowOpacityAnim,
      shadowRadius: shadowRadiusAnim,
      shadowOffset: {
        height: shadowOffsetHeightAnim,
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
          onPress={() => onPress()}
          background={PlatformTouchable.SelectableBackgroundBorderless()}
          style={{
            borderRadius: style.borderRadius,
          }}
        >
          <CardContainer style={innerStyle}>{children}</CardContainer>
        </Touch>
      </AnimatedCard>
    );
  }
}

export default Card;
