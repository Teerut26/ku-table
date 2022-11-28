import styled from "@emotion/styled";
import React, { useState } from "react";
import tw from "twin.macro";

interface Props {
    start?: number;
    end?: number;
    className?: string;
}

const ChildGridMinimal: React.FC<Props> = ({ end, start, children, className }) => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        setVisible(!visible)
      }
    
    const ChildGrid = styled.div`
        ${tw` col-span-2 min-h-16`}
        grid-column-start: ${start};
        grid-column-end: ${end};
        
        /* :hover {
            transform: translate(-5px, -5px);
            cursor: pointer;
        } */
    `;
    return <ChildGrid className={className}>{children}</ChildGrid>;
};

export default ChildGridMinimal;
