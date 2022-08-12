import Loading from "components/Loading";
import useCheckSession from "hooks/useCheckSession";
import { useRouter } from "next/router";
import Login from "pages/login";
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

    return <>{!isLoading ? <>{isLive && children}</> : <Loading />}</>;
};

export default CheckLogin;
