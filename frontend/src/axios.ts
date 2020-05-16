import axios from 'axios';

import environment from './environments/dev/env.dev';

import { deleteFromLocalStorage } from "./services/local-storage.service";

/**
 * Axios instance.
 */
const instance = axios.create({
  baseURL: `${environment.baseURL}:${environment.port}`
});

/**
 * Handle global responses.
 */
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (!!error.response.status && error.response.status === 401) {
    deleteFromLocalStorage("user");
    deleteFromLocalStorage("auth_token");
    window.location.href = '/login';
  }
  return error;
});

/**
 * Set common headers.
 */
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.auth_token}`;

export default instance;
