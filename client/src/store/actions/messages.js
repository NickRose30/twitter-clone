import { axiosHelper } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => {
  return dispatch => {
    return axiosHelper('get', '/api/messages')
      .then(res => dispatch(loadMessages(res)))
      .catch(err => addError(err.message));
  }
};