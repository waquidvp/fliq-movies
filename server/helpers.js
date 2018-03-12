import fetch from 'node-fetch';

const postData = (url, data) =>
  fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
    cache: 'no-cache',
  }).then(respose => respose.json());

export { postData };
