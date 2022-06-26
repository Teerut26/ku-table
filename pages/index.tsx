import { css } from "@emotion/css";
import styled from "@emotion/styled";
import ChildGrid from "components/ChildGrid";
import Courses from "components/Courses";
import { GroupCourseInterface } from "interfaces/group.course.interface";
import CheckLogin from "layouts/CheckLogin";
import WithNavbar from "layouts/WithNavbar";
import React, { useEffect, useRef, useState } from "react";
import AxiosServiceFrontend from "services/frontend/axios.service";
import AxiosWithTokenServiceFrontend from "services/frontend/axios.with.token.service";
import tw from "twin.macro";
import "twin.macro";
import { useLocalStorage } from "usehooks-ts";
import useCheckSession from "hooks/useCheckSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import ToastLoading from "components/Toasts/Loading";
import toast from "react-hot-toast";
import ToastSuccess from "components/Toasts/Success";
import {
    LoginResponseInterface,
    User,
} from "interfaces/login.response.interface";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(30, minmax(0, 1fr));
    ${tw`gap-1 border-b-2 border-gray-300/30`}
`;

const Index: React.FC = () => {
    const [accesstoken] = useLocalStorage<string | undefined>(
        "accesstoken",
        undefined
    );
    const [Loading, setLoading] = useState<boolean>(false);

    const area = useRef<HTMLDivElement>(null);

    const [groupCourse, setGroupCourse] = useState<
        GroupCourseInterface | undefined
    >();

    const { isLive, isLoading } = useCheckSession();
    const [user, setUser] = useLocalStorage<LoginResponseInterface | undefined>(
        "user",
        undefined
    );

    const [scale, setScale] = useLocalStorage<number>(
        "scale_image_download",
        1
    );

    const callAPI = async () => {
        try {
            let axiosWithTokenServiceFrontend =
                new AxiosWithTokenServiceFrontend(accesstoken!);

            let { data } =
                await axiosWithTokenServiceFrontend.axiosInstance.get<GroupCourseInterface>(
                    `/group-course?stdId=${user!.user.student.stdId}`
                );
            setGroupCourse(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            if (isLive) {
                callAPI();
            }
        }
    }, [isLoading]);

    const [Iscapture, setIscapture] = useState<boolean>(false);

    const handleDownload = async () => {
        let toastKey = toast.loading("กำลังสร้างรูปภาพของคุณ...");

        setIscapture(true);

        setTimeout(async () => {
            const dataUrl = await domtoimage.toPng(area.current as any, {
                width: area.current?.clientWidth! * scale,
                height: area.current?.clientHeight! * scale,
                style: {
                    transform: "scale(" + scale + ")",
                    transformOrigin: "top left",
                },
            });
            toast.success("สำเร็จ", {
                id: toastKey,
            });
            saveAs(dataUrl, `kutable-${user?.user.student.stdId}.png`);
            setIscapture(false);
        }, 1000);
    };

    const callCreateLink = async () => {
        let toastKey = toast.loading("กำลังสร้างลิงค์ของคุณ...");
        let axiosWithTokenServiceFrontend = new AxiosWithTokenServiceFrontend(
            accesstoken!
        );
        let { data } = await axiosWithTokenServiceFrontend.axiosInstance.post(
            "/create-link",
            {
                data: JSON.stringify(groupCourse?.results[0]),
            }
        );
        navigator.clipboard.writeText(
            `${window.location.href}share/${data.id}`
        );
        toast.success("คัดลอกแล้ว", {
            id: toastKey,
        });
    };

    const day = "font-bold text-2xl flex justify-center items-center";

    return (
        <CheckLogin>
            <WithNavbar>
                <div className="flex flex-col gap-2 py-2 ">
                    <div className="flex justify-between items-center max-w-[105rem] mx-auto w-full">
                        <div className="font-bold text-3xl hidden md:block py-3">
                            Schedule
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDownload()}
                                className="btn btn-sm btn-outline btn-success gap-2 "
                            >
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    size={"sm"}
                                />
                                Save As PNG
                            </button>
                            <button
                                onClick={() => callCreateLink()}
                                className="btn btn-sm btn-outline btn-primary gap-2 "
                            >
                                <FontAwesomeIcon icon={faShare} size={"sm"} />
                                แชร์ตาราง
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="hidden md:block font-bold text-xl">
                            {groupCourse?.results[0].peroid_date}
                        </div>
                        <div className="w-full md:max-w-[12rem]">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        ปรับความละเอียดของรูปภาพ
                                    </span>
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={5}
                                    defaultValue={scale}
                                    className="range range-xs"
                                    step={1}
                                    onChange={(e) =>
                                        setScale(
                                            Number.parseInt(e.target.value)
                                        )
                                    }
                                />
                                <div className="w-full flex justify-between text-xs px-2">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <div
                            ref={area}
                            className="rounded-lg w-[170rem] bg-base-100 mx-auto"
                        >
                            <GridContainer className="bg-base-200 divide-x font-bold text-2xl">
                                <ChildGrid className="flex justify-center items-center">
                                    Day/Time
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    8:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    9:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    10:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    11:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    12:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    13:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    14:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    15:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    16:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    17:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    18:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    19:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    20:00
                                </ChildGrid>
                                <ChildGrid className="flex justify-center items-center">
                                    21:00
                                </ChildGrid>
                            </GridContainer>
                            <div>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-yellow-200 text-black ${day}`
                                        )}
                                    >
                                        MON
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-yellow-200 base-content"
                                        groupCourse={groupCourse!}
                                        day={"MON"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-pink-400 text-black ${day}`
                                        )}
                                    >
                                        TUE
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-pink-400 base-content"
                                        groupCourse={groupCourse!}
                                        day={"TUE"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-green-400 text-black ${day}`
                                        )}
                                    >
                                        WED
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-green-400 base-content"
                                        groupCourse={groupCourse!}
                                        day={"WED"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={
                                            "bg-orange-400 " +
                                            css(tw`hover text-black ${day}`)
                                        }
                                    >
                                        THU
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-orange-400 base-content"
                                        groupCourse={groupCourse!}
                                        day={"THU"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={
                                            "bg-blue-400 " +
                                            css(tw`hover text-black ${day}`)
                                        }
                                    >
                                        FRI
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-blue-400 base-content"
                                        groupCourse={groupCourse!}
                                        day={"FRI"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={
                                            "bg-purple-500 " +
                                            css(tw`hover text-black ${day}`)
                                        }
                                    >
                                        SAT
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-purple-500 base-content"
                                        groupCourse={groupCourse!}
                                        day={"SAT"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={
                                            "bg-red-400 " +
                                            css(tw`hover text-black ${day}`)
                                        }
                                    >
                                        SUN
                                    </ChildGrid>
                                    <Courses
                                        className="border-l-[1.5rem] border-2 border-red-400 base-content"
                                        groupCourse={groupCourse!}
                                        day={"SUN"}
                                    />
                                </GridContainer>
                            </div>
                            {Iscapture && (
                                <div className="flex gap-3 text-2xl">
                                    สร้างโดย
                                    <a
                                        className="text-blue-400"
                                        href="https://ku-table2.vercel.app"
                                    >
                                        ku-table2.vercel.app
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </WithNavbar>
        </CheckLogin>
    );
};

export default Index;
