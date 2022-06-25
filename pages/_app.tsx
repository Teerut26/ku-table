import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import React from "react";
import { ThemeProvider } from "next-themes";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default wrapper.withRedux(MyApp);
