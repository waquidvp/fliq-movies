import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Slider from './components/Slider';
import Button from '../components/Button';
import { getPreferences } from '../state/actions/recommend';
import Loading from '../components/Loading';

const MainContainer = styled.ScrollView`
  flex: 1;
`;

const TutorialText = styled.Text`
  padding: 48px 24px;
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

  render() {
    const { recommend } = this.props;
    const { preferences } = recommend;

    return (
      <MainContainer>
        <TutorialText>
          Tell me how much you like each catagory, it helps me recommend movies
          to you.
        </TutorialText>
        {recommend.preferencesLoading ? (
          <Loading />
        ) : (
          <SliderContainer>
            <Slider name="Action" value={preferences.Action} />
            <Slider name="Adventure" value={preferences.Adventure} />
            <Slider name="Animation" value={preferences.Animation} />
            <Slider name="Children's" value={preferences["Children's"]} />
            <Slider name="Comedy" value={preferences.Comedy} />
            <Slider name="Crime" value={preferences.Crime} />
            <Slider name="Documentary" value={preferences.Documentary} />
            <Slider name="Drame" value={preferences.Drama} />
            <Slider name="Fantasy" value={preferences.Fantasy} />
            <Slider name="Film-Noir" value={preferences['Film-Noir']} />
            <Slider name="Horror" value={preferences.Horror} />
            <Slider name="Musical" value={preferences.Musical} />
            <Slider name="Mystery" value={preferences.Mystery} />
            <Slider name="Romance" value={preferences.Romance} />
            <Slider name="Sci-Fi" value={preferences['Sci-Fi']} />
            <Slider name="Thriller" value={preferences.Thriller} />
            <Slider name="War" value={preferences.War} />
            <Slider name="Western" value={preferences.Western} />
          </SliderContainer>
        )}

        <ButtonContainer>
          <Button
            title="Done"
            style={{ flex: 1 }}
            textStyle={{
              flex: 1,
            }}
            onPress={() => {}}
          />
        </ButtonContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  recommend: state.recommend,
});

const mapDispatchToProps = dispatch => ({
  getPreferences: () => dispatch(getPreferences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
