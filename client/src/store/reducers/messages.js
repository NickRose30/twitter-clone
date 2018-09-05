import { LOAD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

const initialState = {};

const message = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGE:
      return [...action.messages];
    case REMOVE_MESSAGE:
    default:
      return state;
  }
};

export default message;