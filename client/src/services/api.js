import axios from 'axios';

/** Set the token header for axios requests. If there is no token, that means there is no valid
 * logged in user, so we delete the auth token header.
 */
export const setTokenHeader = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
};


/**
 * This is our helper function for making ajax requests using axios. All requests are proxied to localhost:8081, which
 * is where our backend server is running. This is specified in the client package.json.
 * @param method
 * @param path
 * @param data
 * @returns {Promise<any>}
 */
export const axiosHelper = (method, path, data) => {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        const token = localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null;
        axios['post']('/api/auth/refreshToken', {token})
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('jwtToken', res.data.token);
            }
            resolve(res.data);
          }).catch(err => reject(err.response.data.error));
        resolve(res.data);
      })
      .catch(err => reject(err.response.data.error));
  })
};