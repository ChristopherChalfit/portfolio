import {  EDIT_USER,  GET_USER } from "./types.actions";

export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    payload: user
  };
};