import type { AppProps } from "next/app";
import 'semantic-ui-css/semantic.min.css'

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  return <Component {...pageProps} />;
}
