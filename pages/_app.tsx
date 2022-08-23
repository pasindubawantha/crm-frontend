import type { AppProps } from 'next/app'
import Script from "next/script";
import {ApolloProvider} from '@apollo/client';

import apolloClient from '../libs/apollo';

import Layout from '../libs/components/layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={apolloClient}>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    )
}

export default MyApp






  