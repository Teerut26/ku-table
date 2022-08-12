import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import useCheckSession from "hooks/useCheckSession";
import { LoginResponseInterface } from "interfaces/login.response.interface";
import Link from "next/link";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ChangeLang from "./ChangeLang";
import ChangeTheme from "./ChangeTheme";

interface Props {}

const Navbar: React.FC<Props> = () => {
    const [ShowExpain, setShowExpain] = useState<boolean>(false);
    const { logout, isLive } = useCheckSession();

    const [ImageProfile, setImageProfile] = useLocalStorage<string | undefined>(
        "image_url",
        undefined
    );

    const [user] = useLocalStorage<LoginResponseInterface | undefined>(
        "user",
        undefined
    );
    return (
        <>
            <div className="bg-base-200">
                <div className="max-w-[70rem] mx-auto navbar">
                    <div className="navbar-start">
                        {isLive && (
                            <div className="dropdown">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h7"
                                        />
                                    </svg>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
                                >
                                    <li>
                                        <Link href={"/"}>หน้าหลัก</Link>
                                    </li>
                                    {!isLive && (
                                        <li>
                                            <Link href={"/login"}>
                                                ลงชื่อเข้าใช้งาน
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                       <ChangeLang />
                    </div>
                    <Link href={"/"}>
                        <div className="navbar-center">
                            <a className="normal-case text-xl flex justify-center items-center font-bold gap-2">
                                <img
                                    src="/logo.png"
                                    className="w-10 drop-shadow-md"
                                    alt=""
                                />{" "}
                                KU Table 2
                            </a>
                        </div>
                    </Link>
                    <div className="navbar-end flex gap-3">
                        <ChangeTheme />
                        {isLive ? (
                            <button className="btn btn-ghost btn-circle">
                                <div className="dropdown dropdown-end">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            {ImageProfile ? (
                                                <img src={ImageProfile} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52"
                                    >
                                        <li>
                                            <div className="flex gap-2">
                                                <FontAwesomeIcon icon={faUser} className="w-5" />
                                                <div className="flex gap-2">
                                                    <div>{user?.user.firstNameTh}</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li onClick={() => logout()}>
                                            <a>ออกจากระบบ</a>
                                        </li>
                                    </ul>
                                </div>
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
