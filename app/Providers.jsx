"use client";

import store from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ToastContainer/>
        {children}</Provider>
    </SessionProvider>
  );
};

export default Providers;
