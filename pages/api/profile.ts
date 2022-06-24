
import Profile from "controllers/profile.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({
            statusCode: 405,
            message: "Method not allowed",
        });
    }

    return Profile(req, res);
}
