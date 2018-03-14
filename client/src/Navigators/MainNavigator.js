import React from 'react';
import { connect } from 'react-redux';

import MainStackNavigator from './MainStackNavigator';
import OnboardingStack from '../Onboarding/OnboardingStackNavigation';
import Preferences from '../Onboarding/Preferences';

class MainNavigator extends React.Component {
  state = {};
  render() {
    const { token } = this.props.auth.user;

    if (token) return <MainStackNavigator />;

    return <OnboardingStack />;

    // return <MainStackNavigator />;
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(MainNavigator);
