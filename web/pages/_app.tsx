import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import axios from 'axios';
import Popup from '../components/Popup';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Head from 'next/head';

import '../components/users/styles.scss';
import '../styles/global.scss';

axios.defaults.baseURL = 'http://localhost:3000';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				<Component {...pageProps} />

				<Head>
					<link
						ref="stylesheet"
						// font family
						href="fonts.googleapis.com/css?family=Lato"
					/>
				</Head>
				<Popup />
			</Provider>
		</>
	);
}

export default MyApp;
