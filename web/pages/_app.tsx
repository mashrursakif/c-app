import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import axios from 'axios';
import Auth from '../components/Auth';
import { Provider } from 'react-redux';
import store from '../redux/store';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['abcd'] = 'catsarecute';
// const token = sessionStorage.getItem('token') || localStorage.getItem('token');
// console.log('token', token);
// axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    </>
  );
}

export default MyApp;
