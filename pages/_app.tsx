import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <ThemeProvider>
                <Toaster />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default wrapper.withRedux(MyApp);
