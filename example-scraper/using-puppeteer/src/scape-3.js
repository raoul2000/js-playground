const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const openPage = async (url, browser) => {
    const page = await browser.newPage();
    const response = await page.goto(url, { waitUntil: "networkidle2" });
    if (response.status() !== 200) {
        throw new Error(`page load request returned status ${response.status()}`, { cause: url });
    }
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
                    // type = "@attributeName"
                    valueTypeReader = (el) => el.getAttribute(type.substring(1));
                } else if (typeof type === "object") {
                    // {type: {...}}
                    if (Array.isArray(selector)) {                        
                        return [...rootElement.querySelectorAll(selector[0])].map((el) =>
                            _extractFromPage(type, null, el)
                        );
                    } else {
                        const newRootElement = rootElement.querySelector(selector);
                        return (
                            newRootElement &&
                            _extractFromPage(type, null, newRootElement)
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
                        const anchor = document.createElement("a");
                        if (Array.isArray(result)) {
                            result = result.map((aResult) => {
                                anchor.setAttribute("href", aResult);
                                return { "#url": anchor.href, "#plan": selectorObj.follow };
                            });
                        } else {
                            anchor.setAttribute("href", result);
                            result = { "#url": anchor.href, "#plan": selectorObj.follow };
                        }
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
            title: "#w1 > li",
            rows: { selector: ["#w1 a"], type: "@href", follow: { title: "li.active" } },
        });
        console.log(JSON.stringify(data, null, 4));
    } catch (error) {
        console.error(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * extract("http://domain.com", plan)
 * extract(["http://domain.com", "http://other-domain.com"], plan)
 * 
 * plan { selector: ["div > a"], type: "@href"} => [url1, url2, url3, ...]
 * plan { selector: ["div > a"], type: "@href", follow: {plan2}} => {'#url': [url1, url2, url3, ...], '#plan': {plan2}}
 
 */

const mineNextPages = async (job, browser) => {
    const urls = Array.isArray(job["#url"]) ? job["#url"] : [job["#url"]];
    const plan = job["#plan"];

    return Promise.all(
        urls.map(async (url) => {
            try {
                const page = await openPage(url, browser);
                const data = await extract(page, plan);
                return {
                    "#url": url,
                    "#data": data,
                };
            } catch (error) {
                return {
                    "#url": url,
                    "#error": error.message,
                };
            }
        })
    ).then((results) => {
        if (Array.isArray(job["#url"])) {
            return results;
        } else {
            return results[0];
        }
    });
};

async function main2() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, devtools: true });
        /*
        const d = await mineNextPages(
            {
                "#url": "https://mes-livres.exdata.info/",
                "#plan": {
                    rows: {
                        selector: ["body > div.wrap > div > div > div.row > div"],
                        type: { title: "h2" },
                    },
                },
            },
            browser
        );
        
        
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
        */

        const d = await mineNextPages(
            {
                "#url": ["https://mes-livres.exdata.info/", "https://mes-livres.exdata.info/XXX"],
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

async function runJob(job, browser) {
    const allJobs = Object.entries(job).map(([k, v]) => {
        if (v && typeof v === "object") {
            if (v["#url"] && v["#plan"]) {
                return mineNextPages(v["#plan"], browser).then((result) => (job[k] = result));
            } else {
                return runJob(v, browser);
            }
        } else {
            return Promise.resolve(true);
        }
    });

    return Promise.all(allJobs);
}

async function main3() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, devtools: true });
        /*
        let d = await runJob(
            {
                "#url": "https://mes-livres.exdata.info/",
                "#plan": {
                    rows: {
                        selector: "#w1 > li  a",
                        type: "@href",
                        follow: {
                            label: "#w1 > li.active",
                        },
                    },
                },
            },
            browser
        );
        

        let d = await runJob({
            "#url": "https://mes-livres.exdata.info/",
            "#data": {
                rows: {
                    "#url": "https://mes-livres.exdata.info/index.php?r=account%2Fcreate",
                    "#plan": {
                        label: "#w1 > li.active",
                    },
                },
            },
        });
*/
        let d = await runJob({
            "#url": "https://raoul2000.github.io/",
            "#plan": {
                selector: ["article > a"],
                type: "@ref",
                follow: {
                    title: "article > header > h1",
                    image: { selector: "div.post-content > p > img", type: "@src" },
                    body: ["div.post-content > p"],
                },
            },
        });

        console.log(JSON.stringify(d, null, 4));
    } catch (error) {
        console.error(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
// see https://alphahydrae.com/2021/02/a-javascript-function-that-recursively-resolves-promises/
main3();
//main2();
//main();
