import { Result } from "interfaces/group.course.interface";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import db from "config/firestoreAdmin";
import chromium from "chrome-aws-lambda";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let data: Result = req.body;

    let id = uuidv4();
    const linkRef = db.collection("link-image").doc(id);
    await linkRef.set({
        id,
        ...data,
    });

    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 3 });
    await page.goto(`${process.env.WEB_URL}/gen-table?id=${id}`);

    await page.waitForSelector(
        "#__next > div.flex.flex-col.py-3 > div.flex.flex-col.gap-2.py-2 > div > div"
    );
    const element = await page.$(
        "#__next > div.flex.flex-col.py-3 > div.flex.flex-col.gap-2.py-2 > div > div"
    );
    const file = await element?.screenshot({ type: "png" });
    await browser.close();

    res.setHeader("Content-Type", `image/png`);
    res.statusCode = 200;
    return res.end(file);
}
