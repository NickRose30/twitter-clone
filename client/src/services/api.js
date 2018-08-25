import axios from 'axios';

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
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data.error))
  })
};