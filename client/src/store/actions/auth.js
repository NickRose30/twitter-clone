import { axiosHelper } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from "./error";

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
  };
};

export const validateToken = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return axiosHelper('post', '/api/auth/validateToken', {
        token: localStorage.getItem('jwtToken')
      }).then(user => {
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        }).catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    })
  }
};

export const authUser = (type, userData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return axiosHelper('post', `/api/auth/${type}`, userData)
        .then(({ ...user, token }) => {
          localStorage.setItem('jwtToken', token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        }).catch(err => {
          dispatch(addError(err.message));
          reject();
        });
      }
    );
  }
};