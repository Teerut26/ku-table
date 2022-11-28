import { css } from "@emotion/css";
import styled from "@emotion/styled";
import ChildGrid from "components/ChildGrid";
import ChildCourseMinimal from "components/GenTable/ChildCourseMinimal";
import MinimalTable from "components/MinimalTable";
import db from "config/firestoreAdmin";
import { Result } from "interfaces/group.course.interface";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import tw from "twin.macro";
import groupCourse from "./api/group-course";
import { BiLinkAlt } from "react-icons/bi";

type Props = {
    data: Result | null;
};

export async function getServerSideProps(context: NextPageContext) {
    let linkCollection = await db
        .collection("link-image")
        .doc(context.query.id as string)
        .get();
    await db
        .collection("link-image")
        .doc(context.query.id as string)
        .delete();

    return {
        props: {
            data: linkCollection.data() ? linkCollection.data() : null,
        },
    };
}

const time = [
    {
        display: "8:00",
        hour: 8,
    },
    {
        display: "9:00",
        hour: 9,
    },
    {
        display: "10:00",
        hour: 10,
    },
    {
        display: "11:00",
        hour: 11,
    },
    {
        display: "12:00",
        hour: 12,
    },
    {
        display: "13:00",
        hour: 13,
    },
];

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(26, minmax(0, 1fr));
    ${tw`gap-1 border-b-2 border-gray-300/30`}
`;

const centerCss = css`
    ${tw`flex justify-center items-center font-bold text-xl`}
`;

export default function genTable({ data }: Props) {
    return (
        <>
            {data !== null ? (
                <div className="overflow-x-auto">
                    <div className="flex flex-col gap-2 py-2">
                        <div className="rounded-lg w-[170rem] bg-base-100 p-10">
                            <div className="w-full border-x-[1px]">
                                <GridContainer className="bg-base-200 divide-x">
                                    <ChildGrid className={centerCss}>
                                        Day/Time
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        8:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        9:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        10:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        11:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        12:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        13:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        14:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        15:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        16:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        17:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        18:00
                                    </ChildGrid>
                                    <ChildGrid className={centerCss}>
                                        19:00
                                    </ChildGrid>
                                </GridContainer>
                                <div>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} ${css(
                                                tw`hover bg-yellow-200 text-black`
                                            )}`}
                                        >
                                            MON
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-yellow-200 base-content"
                                            groupCourse={data!.course}
                                            day={"MON"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} ${css(
                                                tw`hover bg-pink-400 text-black`
                                            )}`}
                                        >
                                            TUE
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-pink-400 base-content"
                                            groupCourse={data!.course}
                                            day={"TUE"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} ${css(
                                                tw`hover bg-green-400 text-black`
                                            )}`}
                                        >
                                            WED
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-green-400 base-content"
                                            groupCourse={data!.course}
                                            day={"WED"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} hover bg-orange-400 text-black`}
                                        >
                                            THU
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-orange-400 base-content"
                                            groupCourse={data!.course}
                                            day={"THU"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} hover bg-blue-400 text-black`}
                                        >
                                            FRI
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-blue-400 base-content"
                                            groupCourse={data!.course}
                                            day={"FRI"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} hover bg-purple-500 text-black`}
                                        >
                                            SAT
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-purple-500 base-content"
                                            groupCourse={data!.course}
                                            day={"SAT"}
                                        />
                                    </GridContainer>
                                    <GridContainer>
                                        <ChildGrid
                                            className={`${centerCss} hover bg-red-400 text-black`}
                                        >
                                            SUN
                                        </ChildGrid>
                                        <ChildCourseMinimal
                                            className="border-l-[1.5rem] border-2 border-red-400 base-content"
                                            groupCourse={data!.course}
                                            day={"SUN"}
                                        />
                                    </GridContainer>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-3xl mt-2">
                                <BiLinkAlt size={30} /> ku-table2.vercel.app
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-3xl">ไม่พบข้อมูล</div>
                </div>
            )}
        </>
    );
}
