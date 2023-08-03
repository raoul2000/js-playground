const puppeteer = require("puppeteer");

const getScreenshot = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 500 })
    await page.goto("http://www.google.com");
    await page.screenshot({ path: "screenshot.png" });
    await browser.close();
};

getScreenshot();
