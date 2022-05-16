import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "react-query";

import paypalConfig from "../config/paypal";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider options={paypalConfig}>
        <Component {...pageProps} />
        <ToastContainer
          toastClassName={() =>
            "bg-black relative flex p-1 min-h-10 justify-between overflow-hidden cursor-pointer"
          }
          bodyClassName={() => "text-xs font-white block p-3"}
          position="bottom-right"
          autoClose={2000}
        />
      </PayPalScriptProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
