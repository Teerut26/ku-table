import axios from "axios";
import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";

const GroupCourseController = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            throw new Error("Token not found");
        }

        let { data } = await axios({
            method: "get",
            url: `https://myapi.ku.th/std-profile/getGroupCourse?academicYear=2565&semester=1&stdId=${req.query.stdId}`,
            headers: {
                "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
                "x-access-token": token as string
                    
            },
        });
        return res.status(200).json(data);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export default catchErrorsFrom(GroupCourseController);
