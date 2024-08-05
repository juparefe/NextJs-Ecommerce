import { AuthProvider, BasketProvider, SearchProvider, WindowProvider } from "@/contexts";
import { initAmplify } from "@/utils";
import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

initAmplify();

export default function App(props: any) {
  const { Component, pageProps } = props;

  return (
    <WindowProvider>
      <AuthProvider>
        <BasketProvider>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </BasketProvider>
      </AuthProvider>
    </WindowProvider>
  );
}
