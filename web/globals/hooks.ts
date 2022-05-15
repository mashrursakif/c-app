import axios from 'axios';

export const useAuthHeader = () => {
  const token =
    window.sessionStorage.getItem('token') ||
    window.localStorage.getItem('token');

  axios.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';

  if (token && token !== '') return true;
  return false;
};
