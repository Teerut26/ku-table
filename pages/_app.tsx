import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import React, { useEffect, useMemo } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import { langActions, langType } from "@/store/slice/langSlice";
import { RootState } from "@/store/root";
import * as ga from '../libs/_utils/ga'
import { useRouter } from "next/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const dispatch = useDispatch();
    const langRedux = useSelector((state: RootState) => state.langSlice.data);
    const [lang, setLang] = useLocalStorage<langType>("lang", "th");

    useEffect(() => {
      dispatch(langActions.setlang(lang));
    }, [])
    
    useEffect(() => {
        if (langRedux !== lang) {
            setLang(langRedux);
        }
    }, [langRedux]);

    const router = useRouter()
    
    useEffect(() => {
        const handleRouteChange = (url:any) => {
          ga.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange)
        }
      }, [router.events])

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
