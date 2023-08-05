const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");
const { tryEach } = require("async");

const getAllUrl = async (browser, articleIndexUrl) => {
    const page = await browser.newPage();
    await page.goto(articleIndexUrl);
    await page.waitForSelector("body");
    const result = await page.evaluate(() =>
        [...document.querySelectorAll("div.mui-jrrayk > div > div > div > a")].map((link) => link.href)
    );
    return result;
};

const scrap = async (indexPageUrl) => {
    const browser = await puppeteer.launch({ headless: false });

    console.log("Starting work ...");
    console.log("scrapping articles urls from " + indexPageUrl);

    const urlList = await getAllUrl(browser, indexPageUrl);
    console.log(`articles url found : ${urlList.length}`);
    await browser.close();
    return urlList;
};

// Main //////////////////////////////////////////////////////////////////////////////////

// Process CLI Options -----------

if (process.argv.length !== 3) {
    console.error("missing argument : configuration file");
    process.exit(1);
}
const configFile = process.argv[2];
if (!fs.existsSync(configFile)) {
    console.error(`config file not found : ${configFile}`);
    process.exit(2);
}
let config;
try {
    config = JSON.parse(fs.readFileSync(configFile));
} catch (error) {
    console.error(`failed to load configuration file : ${configFile}`, error);
    process.exit(3);
}

const { urlListFile, pageUrl } = config;

try {
    new URL(pageUrl);
} catch (error) {
    console.error(`Invalid page URL : ${pageUrl}`, error);
    process.exit(5);
}

// Start Scrapping  -----------

scrap(pageUrl)
    .then((articlesUrl) => {
        console.log("saving to " + urlListFile);
        const rawData = JSON.stringify(articlesUrl, null, 4);
        try {
            fs.writeFileSync(urlListFile, rawData);
        } catch (error) {
            console.error(`failed to save result to ${outputFile}`, error);
            console.log("result : ");
            console.log(rawData);
        }
        return articlesUrl;
    })
    .catch((e) => console.log(`error: ${e}`, e));
