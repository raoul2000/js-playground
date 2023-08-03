const puppeteer = require("puppeteer");

const getAllUrl = async (browser) => {
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/");
    await page.waitForSelector("body");
    const result = await page.evaluate(() =>
        [...document.querySelectorAll(".product_pod a")].map(
            (link) => link.href
        )
    );
    return result;
};

const getDataFromUrl = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("body");
    return page.evaluate(() => {
        let title = document.querySelector("h1").innerText;
        let price = document.querySelector(".price_color").innerText;
        return { title, price };
    });
};

const scrap = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const urlList = await getAllUrl(browser);
    const results = await Promise.all(
        urlList.map((url) => getDataFromUrl(browser, url))
    );

    browser.close();
    return results;
};

scrap()
    .then((value) => {
        console.log(value);
    })
    .catch((e) => console.log(`error: ${e}`));
