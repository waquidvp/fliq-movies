import { login as loginApi, signup as signupApi } from '../../api/auth';

const loginStart = () => ({
  type: 'LOGIN_START',
});

const loginSuccess = response => ({
  type: 'LOGIN_SUCCESS',
  token: response.token,
  user: response.user,
});

const loginFailed = response => ({
  type: 'LOGIN_FAILED',
  error: response.message,
});

export const signout = () => ({
  type: 'SIGNOUT',
});

export const login = user => (dispatch) => {
  dispatch(loginStart());

  loginApi(user)
    .then((response) => {
      if (response.success === false) {
        dispatch(loginFailed(response));
      } else {
        dispatch(loginSuccess(response));
      }
    })
    .catch(error => dispatch(loginFailed(error)));
};

export const signup = user => (dispatch) => {
  dispatch(loginStart());

  signupApi(user)
    .then((response) => {
      if (response.success === false) {
        dispatch(loginFailed(response));
      } else {
        dispatch(loginSuccess(response));
      }
    })
    .catch(error => dispatch(loginFailed(error)));
};
