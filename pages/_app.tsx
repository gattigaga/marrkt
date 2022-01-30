import "../styles/globals.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
