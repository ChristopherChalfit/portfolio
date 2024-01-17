import {  EDIT_USER, GET_USER } from "../actions/types.actions";

const initialState = {
  status: "VOID",
  user: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        status: "SUCCEEDED",
        user: action.payload,
      };
    case EDIT_USER:
      const newuser = [...state.user, action.payload];
      return {
        ...state,
        status: "ADDED",
        user: newuser,
      };
    default:
      return state;
  }
};
