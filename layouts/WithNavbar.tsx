import { css } from "@emotion/css";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React from "react";
import "twin.macro";
import tw from "twin.macro";

interface Props {}

const WithNavbar: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <div tw="flex-grow">
                <Navbar />
                <div className={css(tw`px-3 max-w-[90rem] mx-auto`)}>{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default WithNavbar;
