import { useRouter } from "next/router";
import React from "react";

interface Props {}

const _404: React.FC<Props> = () => {
    const router = useRouter();
    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
            <div className="flex flex-col gap-3">
                <div className="font-bold text-xl">404 - Page not found</div>
                <div onClick={()=>router.push("/")} className="btn btn-primary">กลับสู่หน้าหลัก</div>
            </div>
        </div>
    );
};

export default _404;
