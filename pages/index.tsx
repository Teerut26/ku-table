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
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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

    const handleDownload = async () => {
        let toastKey = toast.custom((t) => (
            <ToastLoading message="Loading..." t={t} />
        ));
        const dataUrl = await domtoimage.toPng(area.current as any, {
            width: area.current?.clientWidth! * scale,
            height: area.current?.clientHeight! * scale,
            style: {
                transform: "scale(" + scale + ")",
                transformOrigin: "top left",
            },
        });
        toast.custom((t) => <ToastSuccess message="สำเร็จ" t={t} />, {
            id: toastKey,
        });
        saveAs(dataUrl, `kutable-${user?.user.student.stdId}.png`);
    };

    return (
        <CheckLogin>
            <WithNavbar>
                <div className="flex flex-col gap-2 py-2 ">
                    <div className="flex justify-between items-center max-w-[100rem] mx-auto w-full">
                        <div className="font-bold text-3xl hidden md:block py-3">
                            Schedule
                        </div>

                        <button
                            onClick={() => handleDownload()}
                            className="btn btn-sm btn-outline btn-success gap-2 w-full md:max-w-[9rem]"
                        >
                            <FontAwesomeIcon icon={faDownload} size={"sm"} />
                            Save As PNG
                        </button>
                    </div>
                    <div className="flex justify-end">
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
                                    onChange={(e) => setScale(Number.parseInt(e.target.value))}
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
                            className="rounded-lg w-[100rem] bg-base-100 mx-auto"
                        >
                            <GridContainer className="bg-base-200 divide-x">
                                <ChildGrid>Day/Time</ChildGrid>
                                <ChildGrid>8:00</ChildGrid>
                                <ChildGrid>9:00</ChildGrid>
                                <ChildGrid>10:00</ChildGrid>
                                <ChildGrid>11:00</ChildGrid>
                                <ChildGrid>12:00</ChildGrid>
                                <ChildGrid>13:00</ChildGrid>
                                <ChildGrid>14:00</ChildGrid>
                                <ChildGrid>15:00</ChildGrid>
                                <ChildGrid>16:00</ChildGrid>
                                <ChildGrid>17:00</ChildGrid>
                                <ChildGrid>18:00</ChildGrid>
                                <ChildGrid>19:00</ChildGrid>
                                <ChildGrid>20:00</ChildGrid>
                                <ChildGrid>21:00</ChildGrid>
                            </GridContainer>
                            <div>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-yellow-200 text-black`
                                        )}
                                    >
                                        MON
                                    </ChildGrid>
                                    <Courses
                                        className="bg-yellow-200 text-black"
                                        groupCourse={groupCourse!}
                                        day={"MON"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-pink-400 text-black`
                                        )}
                                    >
                                        TUE
                                    </ChildGrid>
                                    <Courses
                                        className="bg-pink-400 text-black"
                                        groupCourse={groupCourse!}
                                        day={"TUE"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid
                                        className={css(
                                            tw`hover bg-green-400 text-black`
                                        )}
                                    >
                                        WED
                                    </ChildGrid>
                                    <Courses
                                        className="bg-green-400 text-black"
                                        groupCourse={groupCourse!}
                                        day={"WED"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid className="hover bg-orange-400 text-black">
                                        THU
                                    </ChildGrid>
                                    <Courses
                                        className="bg-orange-400 text-black"
                                        groupCourse={groupCourse!}
                                        day={"THU"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid className="hover bg-blue-400 text-black">
                                        FRI
                                    </ChildGrid>
                                    <Courses
                                        className="bg-blue-400 text-black"
                                        groupCourse={groupCourse!}
                                        day={"FRI"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid className="hover bg-purple-500 text-black">
                                        SAT
                                    </ChildGrid>
                                    <Courses
                                        className="bg-purple-500 text-black"
                                        groupCourse={groupCourse!}
                                        day={"SAT"}
                                    />
                                </GridContainer>
                                <GridContainer>
                                    <ChildGrid className="hover bg-red-400 text-black">
                                        SUN
                                    </ChildGrid>
                                    <Courses
                                        className="bg-red-400 text-black"
                                        groupCourse={groupCourse!}
                                        day={"SUN"}
                                    />
                                </GridContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </WithNavbar>
        </CheckLogin>
    );
};

export default Index;
