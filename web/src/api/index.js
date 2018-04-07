const API = process.env.REACT_APP_API_URL;

function headers() {

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = JSON.parse(localStorage.getItem('token'));
  if(token){
    headers.Authorization = `Bearer: ${token}`;
  }

  return headers;
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    console.log(`{GET} - ${API}${url}${queryString(params)}`);
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);
    console.log(`{POST} - ${API}${url}}`);
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
    .then(parseResponse);
  },

  patch(url, data) {
    const body = JSON.stringify(data);
    console.log(`{PATCH} - ${API}${url}}`);
    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body,
    })
    .then(parseResponse);
  },

  delete(url) {
    console.log(`{DELETE} - ${API}${url}}`);
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
    .then(parseResponse);
  },
};