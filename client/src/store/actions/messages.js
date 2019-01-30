import { axiosHelper } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => dispatch =>
  axiosHelper('get', '/api/messages')
    .then(res => dispatch(loadMessages(res)))
    .catch(err => addError(err.message));

const remove = message_id => ({
  type: REMOVE_MESSAGE,
  message_id
});

export const removeMessage = (user_id, message_id) => dispatch =>
  axiosHelper('delete', `/api/users/${user_id}/messages/${message_id}`)
    .then(() => dispatch(remove(message_id)))
    .catch(err => addError(err.message));

export const postMessage = text => (dispatch, getState) => {
  const { currentUser } = getState();
  const id = currentUser.user.id;
  return axiosHelper('post', `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => addError(err));
};