import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        toastClassName={() =>
          "bg-black relative flex p-1 min-h-10 justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-xs font-white block p-3"}
        position="bottom-right"
        autoClose={2000}
      />
    </>
  );
}

export default MyApp;
