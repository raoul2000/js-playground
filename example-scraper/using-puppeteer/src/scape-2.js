const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const openPage = async (url, browser) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    return page;
};

const extract = async (page, elementHandle, selector, type) => {
    console.log("selector = " + JSON.stringify(selector));
    let result;
    const handle = elementHandle ?? (await page.evaluateHandle("document"));

    if (typeof selector === "string") {
        result = await page.evaluate(
            (selector, handle) => handle.querySelector(selector).textContent,
            selector,
            handle
        );
    } else if (Array.isArray(selector)) {
        result = await page.evaluate(
            (selector, handle) => [...handle.querySelectorAll(selector)].map((el) => el.textContent),
            selector[0],
            handle
        );
    } else if (typeof selector === "object") {
        const objSelector = selector;
        const thisSelector = selector.selector;
        const thisType = selector.type;
        if (thisSelector && thisType) {
            if (typeof thisType === "object") {
                if (typeof thisSelector === "string") {
                    // {prop1: {selector: 'selector1', type: {...}}}
                    const newHandle = await page.evaluateHandle(
                        (selector, handle) => {
                            return handle.querySelector(selector);
                        },
                        thisSelector,
                        handle
                    );
                    result = await extract(page, newHandle, thisType);
                } else if (Array.isArray(thisSelector)) {
                    // {prop1: {selector: ['selector1'], type: {..}}}
                    const count = await page.evaluateHandle(
                        (selector, handle) => {
                            window.nodes = [...handle.querySelectorAll(selector)];
                            return window.nodes.length;
                        },
                        thisSelector,
                        handle
                    );
                    const nodes = await Promise.all(
                        [...Array(count)].map(async (_, i) => await page.evaluateHandle((i) => window.nodes[i], i))
                    );
                    /*
                    const nodes = [];
                    for (let i = 0; i < count; i++) {
                        nodes.push(await handle.evaluateHandle((i) => window.nodes[i], i));
                    }*/

                    result = await Promise.all(nodes.map(async (node) => await extract(page, node, thisType)));
                }
            }
        } else if (thisSelector) {
            // {prop1: {selector: 'selector1'}}
            result = await extract(page, handle, thisSelector);
        } else {
            // {prop1: 'selector1', prop2: 'selector2'}
            result = await Promise.all(
                Object.entries(selector).map(([propName, aSelector]) =>
                    extract(page, handle, aSelector).then((extractedData) => ({
                        name: propName,
                        data: extractedData,
                    }))
                )
            ).then((allResults) =>
                allResults.reduce((acc, { name, data }) => {
                    acc[name] = data;
                    return acc;
                }, {})
            );
        }
    }

    return result;
};

async function main() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await openPage("https://mes-livres.exdata.info/", browser);
        let data = await extract(page, null, "body > div.wrap > div > div > div.jumbotron > h1");
        console.log(data);

        data = await extract(page, null, ["#w1 > li"]); //only one item in array is allowed
        console.log(data);

        data = await extract(page, null, { title: "#w1 > li", labels: ["#w1 > li"] });
        console.log(data);

        data = await extract(page, null, {
            title: { selector: "body > div.wrap > div > div > div.jumbotron > h1" },
        });
        console.log(data);

        data = await extract(page, null, {
            title: { selector: ["#w1 > li"] },
        });
        console.log(data);
        try {
            // invalid
            data = await extract(page, null, {
                title: [{ selector: "#w1 > li" }],
            });
            console.log(data);
        } catch (error) {
            console.log("invalid : ok");
        }

        data = await extract(page, null, {
            rows: { selector: "body > div.wrap > div > div > div.row > div", type: { title: "h2" } },
        });
        console.log(data);
        data = await extract(page, null, {
            rows: { selector: ["body > div.wrap > div > div > div.row > div"], type: { title: "h2" } },
        });
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

main();
