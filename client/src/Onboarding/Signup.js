// This is the sign up screen

import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Banner from './components/Banner';
import Input from './components/Input';
import Button from '../components/Button';
import Icon from '../components/Icon';
import screenConstants from '../utils/screenConstants';
import KeyboardDismissHOC from '../components/KeyboardDismissHOC';
import { signup as signupAction } from '../state/actions/auth';
import Loading from '../components/Loading';

// Style definitions
const MainContainer = styled.View`
  flex: 1;
`;

const KeyboardDismissView = KeyboardDismissHOC(MainContainer);

const Body = styled.View`
  flex: 2;
  padding: 0 16px;
  justify-content: center;
`;

const Footer = styled.View`
  flex: 2;
  margin: 0 24px;
`;

const ErrorText = styled.Text`
  color: red;
`;

const ButtonContainer = styled.View`
  padding-top: 36px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  signup = () => {
    const { signup } = this.props;
    const { name, email, password } = this.state;

    signup({
      name,
      email,
      password,
    });
  };

  render() {
    const { navigation, loading, error } = this.props;
    const { name, email, password } = this.state;

    return (
      <KeyboardDismissView>
        <Banner />
        <Body>
          <Input
            placeholder="Name"
            autoCapitalize="words"
            value={name}
            onChangeText={text => this.setState({ name: text })}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
        </Body>
        <Footer>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <ButtonContainer>
            <Button
              title="Sign Up"
              style={{ flex: 1 }}
              textStyle={{
                flex: 1,
              }}
              onPress={() => this.signup()}
            />
          </ButtonContainer>
          {loading ? <Loading /> : null}
        </Footer>
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
      </KeyboardDismissView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loginLoading,
  error: state.auth.loginError,
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
