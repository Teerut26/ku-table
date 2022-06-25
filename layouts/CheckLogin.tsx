import useCheckSession from "hooks/useCheckSession";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {}

const CheckLogin: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { isLive, isLoading } = useCheckSession();

    useEffect(() => {
        if (!isLoading) {
            if (!isLive) {
                router.push("/login");
            }
        }
    }, [isLoading]);

    return (
        <>{!isLoading ? <>{isLive && children}</> : <div>Loading...</div>}</>
    );
};

export default CheckLogin;
