import { css } from "@emotion/css";
import styled from "@emotion/styled";
import ChildGrid from "components/ChildGrid";
import Courses from "components/Courses";
import { GroupCourseInterface } from "interfaces/group.course.interface";
import CheckLogin from "layouts/CheckLogin";
import WithNavbar from "layouts/WithNavbar";
import React, { useEffect, useState } from "react";
import AxiosServiceFrontend from "services/frontend/axios.service";
import AxiosWithTokenServiceFrontend from "services/frontend/axios.with.token.service";
import tw from "twin.macro";
import "twin.macro";
import { useLocalStorage } from "usehooks-ts";
import useCheckSession from "hooks/useCheckSession";

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

    const [groupCourse, setGroupCourse] = useState<
        GroupCourseInterface | undefined
    >();

    const { isLive, isLoading } = useCheckSession();

    const callAPI = async () => {
        let axiosWithTokenServiceFrontend = new AxiosWithTokenServiceFrontend(
            accesstoken!
        );
        let { data } =
            await axiosWithTokenServiceFrontend.axiosInstance.get<GroupCourseInterface>(
                "/group-course?academicYear=2565&semester=1&stdId=224183"
            );
        setGroupCourse(data);
    };

    

    useEffect(() => {
        if (!isLoading) {
            if (isLive) {
                callAPI();
            }
        }
    }, [isLoading]);

    

    return (
        <CheckLogin>
            <WithNavbar>
                <div className="overflow-x-auto py-3 mx-auto max-w-[100rem]">
                    <div className="rounded-lg w-[100rem] p-3">
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
                                <Courses className="bg-yellow-200 text-black" groupCourse={groupCourse!} day={"MON"}  />
                                
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid
                                    className={css(
                                        tw`hover bg-pink-400 text-black`
                                    )}
                                >
                                    TUE
                                </ChildGrid>
                                <Courses className="bg-pink-400 text-black" groupCourse={groupCourse!} day={"TUE"}  />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid
                                    className={css(
                                        tw`hover bg-green-400 text-black`
                                    )}
                                >
                                    WED
                                </ChildGrid>
                                <Courses className="bg-green-400 text-black" groupCourse={groupCourse!} day={"WED"}  />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-orange-400 text-black">
                                    THU
                                </ChildGrid>
                                <Courses className="bg-orange-400 text-black" groupCourse={groupCourse!} day={"THU"}  />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-blue-400 text-black">
                                    FRI
                                </ChildGrid>
                                <Courses className="bg-blue-400 text-black" groupCourse={groupCourse!} day={"FRI"}  />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-purple-500 text-black">
                                    SAT
                                </ChildGrid>
                                <Courses className="bg-purple-500 text-black" groupCourse={groupCourse!} day={"SAT"}  />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-red-400 text-black">
                                    SUN
                                </ChildGrid>
                                <Courses className="bg-red-400 text-black" groupCourse={groupCourse!} day={"SUN"}  />
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </WithNavbar>
        </CheckLogin>
    );
};

export default Index;
