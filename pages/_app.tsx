import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import darktheme from '../themes/darktheme'



export default function App({ Component, pageProps }: AppProps) {
  return <NextUIProvider theme={darktheme}>
    <Component {...pageProps} />
  </NextUIProvider>
}
