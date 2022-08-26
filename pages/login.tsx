import { RootState } from "@/store/root";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { LoginResponseInterface } from "interfaces/login.response.interface";
import WithNavbar from "layouts/WithNavbar";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AxiosServiceFrontend from "services/frontend/axios.service";
import { useLocalStorage } from "usehooks-ts";

interface Props {}

const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

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

        let toastKey = toast.loading("Loading...");

        try {
            if (
                !username ||
                !password ||
                username.length === 0 ||
                password.length === 0
            ) {
                return toast.error("กรอกข้อมูลให้ครบก่อน", {
                    id: toastKey,
                });
            }

            let axiosServiceFontend = new AxiosServiceFrontend();
            let { data } =
                await axiosServiceFontend.axiosInstance.post<LoginResponseInterface>(
                    "/login",
                    {
                        username,
                        password,
                    }
                );

            setAccesstoken(data.accesstoken);
            setRenewtoken(data.renewtoken);
            setUser(data);
            let imageBaseUrl = await getImageProfile(data.accesstoken);
            setImageProfile(imageBaseUrl);
            toast.success("เข้าสู่ระบบสำเร็จ", {
                id: toastKey,
            });

            window.location.href = "/";
        } catch (error) {
            toast.error("Login Failed", {
                id: toastKey,
            });
        }
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

    const lang = useSelector((state: RootState) => state.langSlice.data);

    const { theme, setTheme } = useTheme();

    const themeMui = createTheme({
        palette: {
            mode: theme === "light" ? "light" : "dark",
            primary: {
                main: "#00bcd4",
            },
        },
        shape: {
            borderRadius: 15,
        },
        typography: {
            fontFamily: "'Prompt', sans-serif",
        },
    });

    return (
        <WithNavbar>
            <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap- max-w-3xl mx-auto"
            >
                <div className="flex flex-col gap-3">
                    <ThemeProvider theme={themeMui}>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            label={
                                lang === "th"
                                    ? "บัญชีผู้ใช้เครือข่ายนนทรี"
                                    : "Nontri Account"
                            }
                            variant="outlined"
                            placeholder={
                                lang === "th"
                                    ? "เช่น b63xxxxxxxx หรือ regxxx"
                                    : "e.g. b63xxxxxxxx, regxxx"
                            }
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label={lang === "th" ? "รหัสผ่าน" : "Password"}
                            variant="outlined"
                            placeholder={
                                lang === "th"
                                    ? "รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                                    : "Nontri Password"
                            }
                        />
                    </ThemeProvider>
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    {lang === "th" ? "เข้าสู่ระบบ" : "Login"}
                </button>
            </form>
        </WithNavbar>
    );
};

export default Login;
