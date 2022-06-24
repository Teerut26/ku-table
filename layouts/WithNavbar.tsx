import { css } from "@emotion/css";
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
                <div className={css(tw`px-3`)}>{children}</div>
            </div>
        </div>
    );
};

export default WithNavbar;
