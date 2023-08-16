const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const openPage = async (url, browser) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    return page;
};

const extract = async (page, plan) => {
    const extractedData = await page.evaluate((plan) => {
        const _extractFromPage = (selector, type = "text", rootElement = document) => {
            if (!selector) {
                throw new Error("trying to extract data with a NULL selector");
            }
            let result;

            let valueTypeReader = (el) => el.textContent;
            if (type) {
                if (typeof type === "string" && type?.startsWith("@") && type.length > 1) {
                    valueTypeReader = (el) => el.getAttribute(type.substring(1));
                } else if (typeof type === "object") {
                    if (Array.isArray(selector)) {
                        return [...rootElement.querySelectorAll(selector[0])].map((el) =>
                            _extractFromPage(type, null, el)
                        );
                    } else {
                        const newRootElement = rootElement.querySelector(selector);
                        return (
                            newRootElement &&
                            _extractFromPage(type, null, rootElement.querySelector(selector))
                        );
                    }
                }
            }

            if (typeof selector === "string") {
                const el = rootElement.querySelector(selector);
                result = el && valueTypeReader(el);
            } else if (Array.isArray(selector) && selector.length !== 0) {
                result = [...rootElement.querySelectorAll(selector[0])].map(valueTypeReader);
            } else if (selector && typeof selector === "object") {
                const selectorObj = selector;
                if (selectorObj.hasOwnProperty("selector")) {
                    result = _extractFromPage(selectorObj.selector, selectorObj.type, rootElement);
                    if (selectorObj.hasOwnProperty("follow")) {
                        result = { "#url": result, "#plan": selectorObj.follow };
                    }
                } else {
                    result = Object.entries(selectorObj)
                        .map(([propName, aSelector]) => ({
                            name: propName,
                            data: _extractFromPage(aSelector, type, rootElement),
                        }))
                        .reduce((acc, { name, data }) => {
                            acc[name] = data;
                            return acc;
                        }, {});
                }
            }
            return result;
        };
        try {
            console.log("starting data extraction from page");
            const finalResult = _extractFromPage(plan);
            console.log("done with data extraction from page");
            return finalResult;
        } catch (error) {
            console.log("ERROR : data extraction failed" + error);
        }
    }, plan);
    return extractedData;
};

async function main() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, devtools: true });
        const page = await openPage("https://mes-livres.exdata.info/", browser);
        page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        /*
        let data = await extract(page, "body > div.wrap > div > div > div.jumbotron > h1");
        console.log(data);

        data = await extract(page, ["#w1 > li"]); //only one item in array is allowed
        console.log(data);

        data = await extract(page, { title: "#w1 > li", labels: ["#w1 > li"] });
        console.log(data);

        data = await extract(page, {
            title: { selector: "body > div.wrap > div > div > div.jumbotron > h1" },
        });
        console.log(data);

        data = await extract(page, {
            title: { selector: ["#w1 > li"] },
        });
        console.log(data);

        
        data = await extract(page,  {
            rows: { selector: "body > div.wrap > div > div > div.row > div", type: { title: "h2" } },
        });
        console.log(data);
        
        data = await extract(page, {
            rows: { selector: ["body > div.wrap > div > div > div.row > div"], type: { title: "h2" } },
        });
        console.log(data);
        */
        data = await extract(page, {
            rows: { selector: ["#w1 a"], type: "@href", follow: { title : "li.active"} },
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
const f = () => {
    mine("http://domain.com", { selector: ["some > selector"], type: "@href", follow: true });
};
/**
 * extract("http://domain.com", plan)
 * extract(["http://domain.com", "http://other-domain.com"], plan)
 * 
 * plan { selector: ["div > a"], type: "@href"} => [url1, url2, url3, ...]
 * plan { selector: ["div > a"], type: "@href", follow: {plan2}} => {'#url': [url1, url2, url3, ...], '#plan': {plan2}}
 
 */

const mineNextPages = async (job, browser) => {
    const urls = Array.isArray(job["#url"]) ? job["#url"] : [...job["#url"]];
    const plan = job["#plan"];

    return await Promise.all(
        urls.map(async (url) => {
            const page = await openPage(url, browser);
            return await extract(page, plan);
        })
    );
};

async function main2() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, devtools: true });
        const d = await mineNextPages(
            {
                "#url": ["https://mes-livres.exdata.info/", "https://mes-livres.exdata.info/"],
                "#plan": {
                    rows: {
                        selector: ["body > div.wrap > div > div > div.row > div"],
                        type: { title: "h2" },
                    },
                },
            },
            browser
        );
        console.log(JSON.stringify(d, null, 4));
    } catch (error) {
        console.error(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

//main2();
main();
