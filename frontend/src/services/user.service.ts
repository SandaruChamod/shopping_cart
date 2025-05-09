import axios from "../axios";

import { UserData } from "../models/user-data.model";

/**
 * Responsible to make POST call to log new user.
 * @param userData UserData
 */
export const userLogin = async (userData: UserData): Promise<any> => {
  if (!!userData) {
    const response = await axios.post('/user/signin', userData);
    return response.data;
  }
};

/**
 * Responsible to make POST call to register new user.
 * @param userData UserData
 */
export const registerUser = async (userData: UserData): Promise<any> => {
  if (!!userData) {
    const response = await axios.post('user/signup', userData);
    return response.data;
  }
};
