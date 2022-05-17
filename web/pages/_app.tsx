import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import axios from 'axios';
import Popup from '../components/Popup';
import { Provider } from 'react-redux';
import store from '../redux/store';

axios.defaults.baseURL = 'http://localhost:3000';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <Popup />
      </Provider>
    </>
  );
}

export default MyApp;
