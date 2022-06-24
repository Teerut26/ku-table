// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Login from "controllers/login.controller";
import catchErrorsFrom from "libs/_utils/errors";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            statusCode: 405,
            message: "Method not allowed",
        });
    }

    return Login(req, res);
}
