import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocalStorage } from "usehooks-ts";

interface ReturnType {
    isLive: boolean;
    isLoading: boolean;
    logout: () => void;
}

function useCheckSession(): ReturnType {
    const [accesstoken] = useLocalStorage<string | undefined>(
        "accesstoken",
        undefined
    );
    const [isLive, setIsLive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        if (accesstoken) {
            const decoded: any = jwt_decode(accesstoken);
            const currentTime = new Date().getTime() / 1000;
            if (decoded.exp > currentTime) {
                setIsLive(true);
                return setIsLoading(false);
            } else {
                setIsLive(false);
                return setIsLoading(false);
            }
        }
        setIsLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("renewtoken");
        localStorage.removeItem("user");
        window.location.reload()
    };

    return { isLive, isLoading, logout };
}

export default useCheckSession;
