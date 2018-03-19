// This is the preferences the screen

import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Slider from './components/Slider';
import Button from '../components/Button';
import { setPreferences } from '../state/actions/recommend';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import screenConstants from '../utils/screenConstants';

// Style definitions
const Container = styled.View`
  flex: 1;
`;

const MainContainer = styled.ScrollView`
  flex: 1;
`;

const TutorialText = styled.Text`
  padding: 0 24px;
  padding-top: 76px;
  padding-bottom: 24px;
  font-size: 16px;
  color: black;
  font-weight: 400;
`;

const SliderContainer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  padding: 24px 48px;
`;

// default preferences shape
const defaultPreferences = {
  Action: 0,
  Adventure: 0,
  Animation: 0,
  "Children's": 0,
  Comedy: 0,
  Crime: 0,
  Documentary: 0,
  Drama: 0,
  Fantasy: 0,
  'Film-Noir': 0,
  Horror: 0,
  Musical: 0,
  Mystery: 0,
  Romance: 0,
  'Sci-Fi': 0,
  Thriller: 0,
  War: 0,
  Western: 0,
};

class Preferences extends React.Component {
  state = {};

  // set the state with the genre as the key for each slider
  handleSliderChange = (genre, value) => {
    this.setState({
      [genre]: value,
    });
  };

  submitPreferences = () => {
    const {
      recommend: { preferences },
      setPreferences,
      navigation,
    } = this.props;

    const changedPreferences = this.state;

    // old prefernces and new preferences are merged
    const newPreferences = {
      ...preferences,
      ...changedPreferences,
    };

    setPreferences(newPreferences);
    navigation.navigate('MainTabNavigator');
  };

  render() {
    const { recommend, navigation } = this.props;
    const { preferences } = recommend;

    return (
      <Container>
        <MainContainer>
          <TutorialText>
            Tell me how much you like each catagory, it helps me recommend
            movies to you.
          </TutorialText>
          {recommend.preferencesLoading ? (
            <Loading />
          ) : (
            <SliderContainer>
              {/*  If preferences are already set, then render them
              else render the default preferences */}
              {Object.keys(preferences).length > 0
                ? Object.keys(preferences).map(genre => (
                  <Slider
                      name={genre}
                      value={preferences[genre]}
                      onSlidingComplete={value =>
                        this.handleSliderChange(genre, value)
                      }
                    />
                  ))
                : Object.keys(defaultPreferences).map(genre => (
                  <Slider
                      name={genre}
                      value={preferences[genre]}
                      onSlidingComplete={value =>
                        this.handleSliderChange(genre, value)
                      }
                    />
                  ))}
            </SliderContainer>
          )}
          <ButtonContainer>
            {recommend.setPreferencesLoading ? (
              <Loading />
            ) : (
              <Button
                title="Done"
                style={{ flex: 1 }}
                textStyle={{
                  flex: 1,
                }}
                onPress={() => this.submitPreferences()}
              />
            )}
          </ButtonContainer>
        </MainContainer>
        <Button
          title="Back"
          icon={<Icon small source={require('../assets/icons/Back.png')} />}
          style={{
            position: 'absolute',
            left: 16,
            top: 8 + screenConstants.statusBarHeight,
          }}
          innerStyle={{
            paddingLeft: 8,
          }}
          iconStyle={{
            paddingRight: 8,
          }}
          onPress={() => navigation.goBack()}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recommend: state.recommend,
});

const mapDispatchToProps = dispatch => ({
  setPreferences: userPreferences => dispatch(setPreferences(userPreferences)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
