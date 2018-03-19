import fetch from 'node-fetch';

// helper for posting data to a url, sets the default http headers
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
