import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

const initialState = [];

const message = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case REMOVE_MESSAGE:
    default:
      return state;
  }
};

export default message;