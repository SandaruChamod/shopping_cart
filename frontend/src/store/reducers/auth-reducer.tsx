import { USER_LOGIN, USER_LOGOUT } from "../actions/actions";

/**
 * Initial state object.
 */
const initialState = {
  isLoggedIn: false,
  userProfile: null,
};

/**
 * Auth reducer
 * @param state: any
 * @param action: any
 */
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userProfile: action.userData
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userProfile: null
      };
  }
  return state;
};

export default authReducer;
