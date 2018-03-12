const auth = (
  state = {
    loginLoading: false,
    user: {
      token: null,
      id: null,
      name: null,
      email: null,
    },
  },
  action,
) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loginLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        loginLoading: false,
        user: {
          token: action.token,
          id: action.user.id,
          name: action.user.name,
          email: action.user.email,
        },
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    case 'SIGNOUT':
      return {
        ...state,
        user: {
          token: null,
          id: null,
          name: null,
          email: null,
        },
      };
    default:
      return state;
  }
};

export default auth;
