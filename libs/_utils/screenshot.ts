import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function screenshot(
    url: string,
    width: number = 1920,
    height: number = 1080
) {
    const options = process.env.AWS_REGION
        ? {
              args: chrome.args,
              executablePath: await chrome.executablePath,
              headless: chrome.headless,
          }
        : {
              args: [],
              executablePath:
                  process.platform === "win32"
                      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
                      : process.platform === "linux"
                      ? "/usr/bin/google-chrome"
                      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector(
        "#__next > div.flex.flex-col.py-3 > div.flex.flex-col.gap-2.py-2 > div > div"
    ); // Method to ensure that the element is loaded
    const logo = await page.$(
        "#__next > div.flex.flex-col.py-3 > div.flex.flex-col.gap-2.py-2 > div > div"
    );

    const session = await page?.target().createCDPSession();
    await session.send("Emulation.setPageScaleFactor", {
        pageScaleFactor: 4, // 400%
    });

    return await logo?.screenshot({ type: "png" });
}
