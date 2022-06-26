import { RootState } from "@/store/root";
import { langActions, langType } from "@/store/slice/langSlice";
import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";

interface Props {}

const Swap = styled.label`
    ${tw`swap`}
`;

const SwapOn = styled.div`
    ${tw``}
`;

const SwapOff = styled.div`
    ${tw``}
`;

const ChangeLang: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const langRedux = useSelector((state: RootState) => state.langSlice.data);

    const handlingChangeLang = (lang: langType) => {
        dispatch(langActions.setlang(lang));
    };

    return (
        <>
            <Swap>
                <input
                    onChange={(e) =>
                        handlingChangeLang(langRedux === "th" ? "en" : "th")
                    }
                    type="checkbox"
                    checked={langRedux === "th" ? true : false}
                />
                <SwapOn className="swap-on">TH</SwapOn>
                <SwapOff className="swap-off">EN</SwapOff>
            </Swap>
        </>
    );
};

export default ChangeLang;
