import { AuthProvider, BasketProvider, SearchProvider } from "@/contexts";
import { initAmplify } from "@/utils";
import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

initAmplify();

export default function App(props: any) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <BasketProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </BasketProvider>
    </AuthProvider>
  );
}
