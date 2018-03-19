import { apiEndpoint } from './config';
import { postData } from './helpers';

const signup = (user) => {
  const url = `${apiEndpoint}/auth/signup`;

  return postData(url, user);
};

const login = (user) => {
  const url = `${apiEndpoint}/auth/login`;

  return postData(url, user);
};

export { signup, login };
