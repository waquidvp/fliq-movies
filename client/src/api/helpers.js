const postData = (url, data, token) => {
  let authHeader = {};
  if (token) {
    authHeader = {
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...authHeader,
    },
    mode: 'cors',
    cache: 'no-cache',
  }).then(respose => respose.json());
};

const getData = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
    cache: 'no-cache',
  }).then(response => response.json());

export { postData, getData };
