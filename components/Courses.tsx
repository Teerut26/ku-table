import { GroupCourseInterface } from "interfaces/group.course.interface";
import React from "react";
import ChildGrid from "./ChildGrid";

let time: { time: string; start: number; end?: number }[] = [
    { time: "8:00", start: 3 },
    { time: "8:30", start: 4 },
    { time: "9:00", start: 5 },
    { time: "9:30", start: 6 },
    { time: "10:00", start: 7 },
    { time: "10:30", start: 8 },
    { time: "11:00", start: 9 },
    { time: "11:30", start: 10 },
    { time: "12:00", start: 11 },
    { time: "12:30", start: 12 },
    { time: "13:00", start: 13 },
    { time: "13:30", start: 14 },
    { time: "14:00", start: 15 },
    { time: "14:30", start: 16 },
    { time: "15:00", start: 17 },
    { time: "15:30", start: 18 },
    { time: "16:00", start: 19 },
    { time: "16:30", start: 20 },
    { time: "17:00", start: 21 },
    { time: "17:30", start: 22 },
    { time: "18:00", start: 23 },
    { time: "18:30", start: 24 },
    { time: "19:00", start: 25 },
    { time: "19:30", start: 26 },
    { time: "20:00", start: 27 },
    { time: "20:30", start: 28 },
    { time: "21:00", start: 29 },
    { time: "21:30", start: 30 },
];

interface Props {
    groupCourse: GroupCourseInterface;
    day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    className?: string;
}

const checkTime = (time_from: string) => {
    return time.filter((item) => item.time === time_from)[0];
};

const Courses: React.FC<Props> = ({ groupCourse, day, className }) => {
    return (
        <>
            {groupCourse?.results[0].course
                .filter((course) => course.day_w.replaceAll(" ", "") === day)
                .map((course) => (
                    <ChildGrid
                        className={`flex flex-col ${className}`}
                        start={checkTime(course.time_from).start}
                        end={checkTime(course.time_to).start}
                    >
                        <div className="truncate">{course.subject_code}</div>
                        <div className="truncate">
                            [{course.time_from} - {course.time_to}]
                        </div>
                        <div className="truncate">{course.subject_name_th}</div>
                        <div className="truncate">{course.subject_name_en}</div>
                    </ChildGrid>
                ))}
        </>
    );
};

export default Courses;
