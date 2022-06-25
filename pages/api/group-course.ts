// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import groupCourseController from "controllers/group.course.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({
            statusCode: 405,
            message: "Method not allowed",
        });
    }

    return groupCourseController(req, res);
}
