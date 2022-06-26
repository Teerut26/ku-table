// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import screenshot from "libs/_utils/screenshot";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let image = await screenshot("http://localhost:3000/share/726bfa0e-a48a-4ec2-a55a-8f10bc2b4a9a");
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.end(image);
}
