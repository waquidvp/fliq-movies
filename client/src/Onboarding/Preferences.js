import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Slider from './components/Slider';
import Button from '../components/Button';
import { getPreferences, setPreferences } from '../state/actions/recommend';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import screenConstants from '../utils/screenConstants';

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

class Preferences extends React.Component {
  state = {};

  componentDidMount() {
    this.getPreferences();
  }

  getPreferences = () => {
    const { getPreferences } = this.props;

    getPreferences();
  };

  handleSliderChange = (genre, value) => {
    this.setState({
      [genre]: value,
    });
  };

  submitPreferences = () => {
    const {
      recommend: { preferences },
      setPreferences,
      mainNavigation,
    } = this.props;

    const changedPreferences = this.state;

    const newPreferences = {
      ...preferences,
      ...changedPreferences,
    };

    setPreferences(newPreferences);
  };

  render() {
    const { recommend, navigation, mainNavigation } = this.props;
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
              {Object.keys(preferences).map(genre => (
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
  getPreferences: () => dispatch(getPreferences()),
  setPreferences: userPreferences => dispatch(setPreferences(userPreferences)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
