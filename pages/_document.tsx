import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html data-theme="light">
            <Head>
                <title>KU Table 2</title>
                <meta name="nextjs-typescript-tailwind-redux-graphql" />
                <link rel="icon" href="/logo.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Pacifico&family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
