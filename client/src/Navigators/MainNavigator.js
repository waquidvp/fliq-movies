import React from 'react';
import { connect } from 'react-redux';

import MainStackNavigator from './MainStackNavigator';
import OnboardingStack from '../Onboarding/OnboardingStackNavigation';

class MainNavigator extends React.Component {
  state = {};
  render() {
    const { token } = this.props.auth.user;

    /* if there is a token in state that means that the user is logged in,
    so the user is taken to the home navigator: MainStackNavigator */
    if (token) return <MainStackNavigator />;

    // if there is no token, the onboarding stack is rendered
    return <OnboardingStack />;
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(MainNavigator);
