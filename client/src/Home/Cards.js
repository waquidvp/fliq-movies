import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';

import TabIcon from '../components/TabIcon';
import Header from '../components/Header';

const Screen = Dimensions.get('window');

const MainContainer = styled.View`
  flex: 1;
  overflow: visible;
`;

const InnerContainer = styled.View`
  flex: 1;
  overflow: visible;
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
  z-index: 6;
  width: ${props => props.width - 32};
  shadow-color: #000000;
  shadow-offset: 0 5px;
  shadow-opacity: 0.3;
  shadow-radius: 5;
`;

const SecondCard = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: white;
  border-radius: 15;
  elevation: 5;
  z-index: 5;
  width: ${props => props.width - 48};
  margin-bottom: 11px;
  margin-top: 23px;
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
    width: Screen.width + 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 6,
  },
});

class Cards extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: config => (
      <TabIcon config={config} source={require('../assets/icons/Cards.png')} />
    ),
  };

  constructor() {
    super();

    this.deltaX = new Animated.Value(0);
  }

  state = {};
  render() {
    return (
      <MainContainer>
        <Header title="For you" />
        <InnerContainer>
          <Interactable.View
            style={styles.card}
            snapPoints={[{ x: Screen.width }, { x: 0 }, { x: -Screen.width }]}
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
        </InnerContainer>
      </MainContainer>
    );
  }
}

export default Cards;
