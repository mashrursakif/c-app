import axios, { Method, ResponseType } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { useRouter } from 'next/router';

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
  data?: any;
  params?: any;
  responseType?: ResponseType;
}

export const useApi = async (
  params: UseApiParams,
  headers?: Record<string, string>
) => {
  const token =
    sessionStorage.getItem('token') || localStorage.getItem('token');
  const res = await axios({
    ...params,
    headers: {
      ...headers,
      Authorization: 'Bearer ' + token,
    },
  });

  return res;
};
