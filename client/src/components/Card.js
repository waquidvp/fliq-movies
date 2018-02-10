import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import Touchable from '../components/Touchable';

const MainContainer = styled.View`
  width: 100px;
  height: 100px;
  background-color: white;
  elevation: 4;
  shadow-color: #000000;
  shadow-offset: 0 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4;
`;

const AnimatedCard = Animated.createAnimatedComponent(MainContainer);

const Touch = styled(Touchable)`
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 1;
`;

class Card extends React.Component {
  state = {
    elevationAnim: new Animated.Value(4),
  };

  toRest = () => {
    const { elevationAnim } = this.state;

    Animated.timing(elevationAnim, {
      toValue: 4,
      duration: 100,
    }).start();
  };

  elevate = () => {
    const { elevationAnim } = this.state;

    Animated.timing(elevationAnim, {
      toValue: 12,
      duration: 100,
    }).start();
  };

  render() {
    const { elevationAnim } = this.state;

    return (
      <AnimatedCard
        style={{
          elevation: elevationAnim,
          shadowOffset: {
            height: elevationAnim,
          },
        }}
      >
        <Touch
          onPressIn={() => this.elevate()}
          onPressOut={() => this.toRest()}
        >
          <CardContainer />
        </Touch>
      </AnimatedCard>
    );
  }
}

export default Card;
