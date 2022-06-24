import useCheckSession from "hooks/useCheckSession";
import WithNavbar from "layouts/WithNavbar";
import React from "react";

const Index: React.FC = () => {
    const {isLive} = useCheckSession()
    console.log(isLive)
    return (
       <WithNavbar>
        sdfsdf
       </WithNavbar>
    );
};

export default Index;
