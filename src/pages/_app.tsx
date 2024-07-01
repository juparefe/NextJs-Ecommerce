import { AuthProvider, SearchProvider } from "@/contexts";
import { initAmplify } from "@/utils";
import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";

initAmplify();

export default function App(props: any) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
    </AuthProvider>
  );
}
