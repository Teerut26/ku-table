import { css } from "@emotion/css";
import styled from "@emotion/styled";
import ChildGrid from "components/ChildGrid";
import CoursesShare from "components/CoursesShare";
import db from "config/firestoreAdmin";
import { Course, Result } from "interfaces/group.course.interface";
import CheckLogin from "layouts/CheckLogin";
import WithNavbar from "layouts/WithNavbar";
import { NextPageContext } from "next";
import { AppContext } from "next/app";
import React from "react";
import tw from "twin.macro";

interface Props {
    groupCourse: Result;
}

export async function getServerSideProps(context: NextPageContext) {
    let linkCollection = await db
        .collection("links")
        .doc(context.query.id as string)
        .get();

    return {
        props: {
            groupCourse: linkCollection.data(),
        }, // will be passed to the page component as props
    };
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(30, minmax(0, 1fr));
    ${tw`gap-1 border-b-2 border-gray-300/30`}
`;

const Share: React.FC<Props> = ({ groupCourse }) => {
    return (
        <>
            <div className="flex flex-col gap-2 py-2 ">
                <div className="overflow-x-auto">
                    <div className="rounded-lg w-[170rem] bg-base-100 mx-auto">
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
                                <CoursesShare
                                    className="bg-yellow-200 text-black"
                                    groupCourse={groupCourse!.course}
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
                                <CoursesShare
                                    className="bg-pink-400 text-black"
                                    groupCourse={groupCourse!.course}
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
                                <CoursesShare
                                    className="bg-green-400 text-black"
                                    groupCourse={groupCourse!.course}
                                    day={"WED"}
                                />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-orange-400 text-black">
                                    THU
                                </ChildGrid>
                                <CoursesShare
                                    className="bg-orange-400 text-black"
                                    groupCourse={groupCourse!.course}
                                    day={"THU"}
                                />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-blue-400 text-black">
                                    FRI
                                </ChildGrid>
                                <CoursesShare
                                    className="bg-blue-400 text-black"
                                    groupCourse={groupCourse!.course}
                                    day={"FRI"}
                                />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-purple-500 text-black">
                                    SAT
                                </ChildGrid>
                                <CoursesShare
                                    className="bg-purple-500 text-black"
                                    groupCourse={groupCourse!.course}
                                    day={"SAT"}
                                />
                            </GridContainer>
                            <GridContainer>
                                <ChildGrid className="hover bg-red-400 text-black">
                                    SUN
                                </ChildGrid>
                                <CoursesShare
                                    className="bg-red-400 text-black"
                                    groupCourse={groupCourse!.course}
                                    day={"SUN"}
                                />
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Share;
