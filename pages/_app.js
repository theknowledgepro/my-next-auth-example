/** @format */

import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import { ContextProvider } from '@/context';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import PersistLayout from './_persist_layout';
import { SITE_DATA } from '@/config';
import '@/styles/index.css';

export const createEmotionCache = () => {
	return createCache({ key: 'css', prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
	typography: { fontFamily: ['FSJoey'].join(',') },
	palette: {
		primary: { main: SITE_DATA.THEME_COLOR },
		white: { main: '#fff' },
	},
});

export default function App({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	const {
		emotionCache = clientSideEmotionCache,
		pageProps: { session, ...pageProps },
	} = props;

	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<ContextProvider>
					<CacheProvider value={emotionCache}>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<PersistLayout>
								<Component {...pageProps} />
							</PersistLayout>
						</ThemeProvider>
					</CacheProvider>
				</ContextProvider>
			</Provider>
		</SessionProvider>
	);
}
