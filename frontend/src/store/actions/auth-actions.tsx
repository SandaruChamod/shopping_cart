import axios from "../../axios";

import { UserData } from "../../models/user-data.model";

import { REGISTER_USER, USER_LOGIN, USER_LOGOUT } from "./actions";

/**
 * Login action.
 * @param userData: UserData
 */
export const login = (userData: UserData) => {
  return async (dispatch: (arg0: { type: string; userData: UserData; }) => void) => {
    dispatch({
      type: USER_LOGIN,
      userData: userData
    });
  }
};

/**
 * Logout action.
 */
export const logout = () => {
  return async (dispatch: (arg0: { type: string }) => void) => {
    dispatch({
      type: USER_LOGOUT
    });
  }
};

/**
 * Signup action.
 * @param userData
 */
export const signup = (userData: UserData) => {
  return async (dispatch: (arg0: { type: string; userData: UserData; }) => void) => {
    dispatch({
      type: REGISTER_USER,
      userData: userData
    });
  }
};
