import { axiosHelper } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGE,
  messages
});

export const fetchMessages = () => {
  return dispatch => {
    return axiosHelper('GET', '/api/messages')
      .then(res => dispatch(loadMessages(res)))
      .catch(err => addError(err.message));
  }
};