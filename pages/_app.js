import Footer from '../components/Footer'
import Header from '../components/Header'
import { CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c6c09b'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        }
    }
});

function MyApp({ Component, pageProps }) {
  return (
        <>
        <Head>
            <title>Rocket Test</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
            />
        </Head>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ThemeProvider>
    </>
    )
}

export default MyApp
