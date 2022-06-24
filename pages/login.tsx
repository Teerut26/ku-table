import { LoginResponseInterface } from "interfaces/login.response.interface";
import WithNavbar from "layouts/WithNavbar";
import React, { useEffect, useRef } from "react";
import AxiosServiceFrontend from "services/frontend/axios.service";
import { useLocalStorage } from "usehooks-ts";

interface Props {}

const Login: React.FC<Props> = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [accesstoken, setAccesstoken] = useLocalStorage<string | undefined>(
        "accesstoken",
        undefined
    );
    const [renewtoken, setRenewtoken] = useLocalStorage<string>(
        "renewtoken",
        ""
    );
    const [user, setUser] = useLocalStorage<LoginResponseInterface | undefined>(
        "user",
        undefined
    );
    const [ImageProfile, setImageProfile] = useLocalStorage<string | undefined>(
        "image_url",
        undefined
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.current || !password.current) {
            return;
        }

        let axiosServiceFontend = new AxiosServiceFrontend();
        let { data } =
            await axiosServiceFontend.axiosInstance.post<LoginResponseInterface>(
                "/login",
                {
                    username: username.current.value,
                    password: password.current.value,
                }
            );

        setAccesstoken(data.accesstoken);
        setRenewtoken(data.renewtoken);
        setUser(data);
        let imageBaseUrl = await getImageProfile(data.accesstoken);
        setImageProfile(imageBaseUrl);
        window.location.href = "/";
    };

    const getImageProfile = async (accesstoken: string): Promise<string> => {
        let axiosServiceFontend = new AxiosServiceFrontend();
        let { data } = await axiosServiceFontend.axiosInstance.get("/profile", {
            headers: {
                "x-access-token": accesstoken,
            },
        });

        return data;
    };

    return (
        <WithNavbar>
            <form
                onSubmit={handleSubmit}
                className="mt-5 max-w-xl mx-auto flex flex-col gap-3"
            >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            บัญชีผู้ใช้เครือข่ายนนทรี
                        </span>
                    </label>
                    <input
                        ref={username}
                        type="text"
                        placeholder="เช่น b63xxxxxxxx หรือ regxxx"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            บัญชีผู้ใช้เครือข่ายนนทรี
                        </span>
                    </label>
                    <input
                        ref={password}
                        type="password"
                        placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    เข้าสู่ระบบ
                </button>
            </form>
        </WithNavbar>
    );
};

export default Login;
