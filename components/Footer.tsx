import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BsGithub } from 'react-icons/bs';

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
                <a className="text-blue-500" href="https://ku-table.vercel.app/">ku-table</a>
            </div>
            <a href="https://github.com/Teerut26/ku-table" className="text-center flex items-center gap-2 my-5">
                <BsGithub size={30} />
                <div className="text-xl">Github</div>
            </a>
        </div>
    );
};

export default Footer;
