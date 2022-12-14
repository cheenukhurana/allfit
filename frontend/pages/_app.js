import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from "../utils/authProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>All Fit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/dumbbell-solid.svg" />
      </Head>

      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
