import axios, { Method } from 'axios';

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

interface UseApiParams {
  method: Method;
  url: string;
  data?: any
}

export const useApi = async (params: UseApiParams) => {
  // const res = await axios({
  //   method,
  //   url,
  //   data
  // })
  const token = sessionStorage.getItem('token');
  const res = await axios({
    ...params,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  return res;
}