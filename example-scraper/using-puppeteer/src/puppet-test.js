const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const html = `<!DOCTYPE html><html><body>
    <article>
        <header>
            header 1
        </header>
    </article>
  <div class="header"><a href="url1">link1</a></div>
  <div class="header"><a href="url2">link2</a></div>
  <div class="header"><a href="url3">link3</a></div>
</body></html>`;

let browser;
(async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.setContent(html);
    const headerHandles = await page.evaluateHandle(() => document.querySelectorAll(".header"));

    const text1 = await headerHandles.evaluate(
        (el, selector) =>
            [...el].map((e) => {
                return e.querySelector(selector).getAttribute("href");
            }),
        "a"
    );
    console.log(text1);

    //const text = await page.$$eval(".header", (els) => els.map((el) => el.textContent));
    //console.log(text);
})()
    .catch((err) => console.error(err))
    .finally(() => browser?.close());
