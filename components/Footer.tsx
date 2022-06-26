import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";

interface Props {}

const Footer: React.FC<Props> = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-10 px-3">
            <div className="text-center text-red-500">
                โปรเจคนี้สร้างมาเพื่ออำนวยความสะดวกต่อนิสิต
                ไม่มีความต้องการจะดึงข้อมูลจากผู้ใช้แต่อย่างใด
            </div>
            <div className="text-center flex gap-2">
                ได้รับแรงบันดาลใจมาจาก
                <a
                    className="text-blue-500"
                    href="https://ku-table.vercel.app/"
                >
                    ku-table
                </a>
            </div>
            <div className="flex gap-5">
                <a
                    href="https://github.com/Teerut26/ku-table"
                    className="text-center flex items-center gap-2 my-5"
                >
                    <BsGithub size={40} />
                </a>
                <a
                    href="https://www.instagram.com/teerut_1t/"
                    className="text-center flex items-center gap-2 my-5"
                >
                    <BsInstagram size={40} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
