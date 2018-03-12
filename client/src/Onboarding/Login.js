import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Banner from './components/Banner';
import Input from './components/Input';
import Button from '../components/Button';
import KeyboardDismissHOC from '../components/KeyboardDismissHOC';
import { login as loginAction } from '../state/actions/auth';
import Loading from '../components/Loading';

const MainContainer = styled.View`
  flex: 1;
`;

const KeyboardDismissView = KeyboardDismissHOC(MainContainer);

const Body = styled.View`
  flex: 2;
  padding: 0 16px;
  justify-content: center;
`;

const ErrorText = styled.Text`
  color: red;
`;

const Footer = styled.View`
  flex: 2;
  margin: 0 24px;
`;

const ButtonContainer = styled.View`
  padding-top: 36px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const OrText = styled.Text`
  font-size: 14px;
  color: black;
  margin: 0 16px;
  font-weight: bold;
`;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  login = () => {
    const { login } = this.props;
    const { email, password } = this.state;

    login({
      email,
      password,
    });
  };

  render() {
    const { navigation, loading, error } = this.props;
    const { email, password } = this.state;

    return (
      <KeyboardDismissView>
        <Banner />
        <Body>
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
              title="Login"
              style={{ flex: 1 }}
              textStyle={{
                flex: 1,
              }}
              onPress={() => this.login()}
            />
            <OrText>or</OrText>
            <Button
              title="Sign Up"
              style={{ flex: 1 }}
              textStyle={{
                flex: 1,
              }}
              onPress={() => navigation.navigate('Signup')}
            />
          </ButtonContainer>
          {loading ? <Loading /> : null}
        </Footer>
      </KeyboardDismissView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loginLoading,
  error: state.auth.loginError,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
