import { axiosHelper } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => dispatch => {
  return axiosHelper('get', '/api/messages')
    .then(res => dispatch(loadMessages(res)))
    .catch(err => addError(err.message));
};

export const postMessage = text => (dispatch, getState) => {
  const { currentUser } = getState();
  const id = currentUser.user.id;
  return axiosHelper('post', `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => addError(err));
};