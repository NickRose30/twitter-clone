import { axiosHelper } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};

export const authUser = (type, userData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return axiosHelper('post', `/api/auth/${type}`, userData)
        .then(({ ...user, token }) => {
          localStorage.setItem('jwtToken', token);
          dispatch(setCurrentUser(user));
          resolve();
        }).catch(err => {
          reject(err);
        });
      }
    );
  }
};