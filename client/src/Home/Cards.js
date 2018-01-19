import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Card = styled.View`
  flex: 1;
  background-color: white;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 15;
  elevation: 6;
  width: ${props => props.width - 32};
  shadow-color: #000000;
  shadow-offset: 0 6px;
  shadow-opacity: 0.3;
  shadow-radius: 6;
`;

const SecondCard = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 15;
  elevation: 4;
  zIndex: 4;
  width: ${props => props.width - 48};
  margin-bottom: 12px;
  margin-top: 20px;
  shadow-color: #000000;
  shadow-offset: 0 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4;
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    height: '100%',
    width: Screen.width + 300,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 6,
  },
});

class Cards extends Component {
  static navigationOptions = {
    tabBarLabel: 'For You',
    swipeEnabled: false,
  };

  constructor() {
    super();

    this.deltaX = new Animated.Value(0);
  }

  state = {};
  render() {
    return (
      <MainContainer>
        <Interactable.View
          style={styles.card}
          snapPoints={[{ x: 390 }, { x: 0 }, { x: -390 }]}
          animatedValueX={this.deltaX}
          horizontalOnly
        >
          <AnimatedCard
            width={Screen.width}
            style={{
              transform: [
                {
                  rotate: this.deltaX.interpolate({
                    inputRange: [-250, 0, 250],
                    outputRange: ['-5deg', '0deg', '5deg'],
                  }),
                },
              ],
            }}
          />
        </Interactable.View>
        <SecondCard width={Screen.width} />
      </MainContainer>
    );
  }
}

export default Cards;
