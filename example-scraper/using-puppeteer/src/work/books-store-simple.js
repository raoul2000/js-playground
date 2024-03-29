const puppeteer = require("puppeteer");

const getData = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto("http://books.toscrape.com/");

    // 3 - Cliquer sur un lien...
    await page.click(
        "#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img"
    );
    await page.waitForTimeout(1000);
    const result = await page.evaluate(() => {
        let title = document.querySelector("h1").innerText;
        let price = document.querySelector(".price_color").innerText;
        return { title, price };
    });

    browser.close();
    return result;
};

getData().then((value) => {
    console.log(value);
});
