import { apiEndpoint } from './config';
import { getData, postData } from './helpers';

const recommend = (userId, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/recommend`;
  return getData(url, token);
};

const setPreferences = (userId, userPreferences, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/preferences`;

  return postData(
    url,
    {
      preferences: userPreferences,
    },
    token,
  );
};

const getPreferences = (userId, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/preferences`;

  return getData(url, token);
};

export { recommend, setPreferences, getPreferences };
