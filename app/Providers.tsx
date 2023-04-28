"use client";

import store from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Next13NProgress from "next13-nprogress";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Next13NProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          // @ts-ignore
          showOnShallow={true}
        />
        <ToastContainer />
        {children}
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
