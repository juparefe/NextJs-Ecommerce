import type { AppProps } from "next/app";
import 'semantic-ui-css/semantic.min.css';
import "@/scss/global.scss";
import { AuthProvider } from "@/contexts";
import { initAmplify } from "@/utils";

initAmplify();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return <AuthProvider><Component {...props}/></AuthProvider>;
}
