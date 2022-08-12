import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {}

const Container = styled.div(tw`absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center`)

const Loading: React.FC<Props> = () => {
    return (
        <Container>
            <div className="flex flex-col items-center">
                <Player
                    autoplay
                    loop
                    src="https://assets7.lottiefiles.com/packages/lf20_xtwyqv2j.json"
                    style={{ height: "200px", width: "200px" }}
                />
                <div className="text-primary-content font-bold text-xl">
                    Loading...
                </div>
            </div>
        </Container>
    );
};

export default Loading;
