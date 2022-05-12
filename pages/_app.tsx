import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "react-toastify/dist/ReactToastify.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "react-query";

import paypalConfig from "../config/paypal";
import { supabase } from "../helpers/supabase";
import { useStore } from "../store/store";
import axios from "../helpers/axios";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const clearCart = useStore((state) => state.clearCart);

  const user = supabase.auth.user();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        axios.post("/auth", {
          event,
          session,
        });
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      clearCart();
    }
  }, [user]);

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
