const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const openPage = async (url, browser) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    return page;
};

const createDataExtractorFn = (type) => {
    let result;
    const typeName = Array.isArray(type) ? type[0] : type;
    if (typeof typeName === "string") {
        if (typeName === "text") {
            result = (el) => el.textContent;
        } else if (typeName === "html") {
            result = (el) => el.innerHTML;
        } else if (typeName.startsWith("@") && typeName.length > 1) {
            result = (el) => el.getAttribue(typeName.substr(1));
        } else {
            throw new Error(`Unknown 'type' : ${typeName}`, { cause: typeName });
        }
    } else {
        throw new Error(`'type' is expected to be a string : ${typeName}`, { cause: typeName });
    }
    return result;
};

const extractData = async (page, extractionPlan, type) => {
    let result;
    if (typeof extractionPlan === "string") {
        if (type) {
            const selectMulti = Array.isArray(type);
            const typeName = selectMulti ? type[0] : type;

            if (selectMulti) {
                result = await page.evaluate(
                    (selector, typeName) => {
                        return [...document.querySelectorAll(selector)].map((el) => {
                            if (typeName === "text") {
                                return el.textContent;
                            }
                            if (typeName === "html") {
                                return el.innerHTML;
                            }
                            if (typeName.startsWith("@") && typeName.length > 1) {
                                return el[typeName.substring(1)];
                            }
                            return { error: `failed to extract data with type ${typeName}` };
                        });
                    },
                    extractionPlan,
                    typeName
                );
            } else {
                result = await page.evaluate((selector, typeName) => {
                    const selected = document.querySelector(selector);
                    if (selected) {
                        if (typeName === "text") {
                            return el.textContent;
                        }
                        if (typeName === "html") {
                            return el.innerHTML;
                        }
                        if (typeName.startsWith("@") && typeName.length > 1) {
                            return el[typeName.substring(1)];
                        }                        
                        return { error: `failed to extract data with type ${typeName}` };
                    }
                }, extractionPlan, typeName);
            }
        } else {
            // no type: fallback to default = single selection and textContent value
            result = await page.evaluate((selector) => {
                const selected = document.querySelector(selector);
                if (selected) {
                    return selected.textContent;
                }
            }, extractionPlan);
        }
    } else if (Array.isArray(extractionPlan)) {
        result = await Promise.all(extractionPlan.map((planItem) => extractData(page, planItem)));
    } else if (typeof extractionPlan === "object") {
        if (extractionPlan.selector) {
            result = await extractData(page, extractionPlan.selector, extractionPlan.type);
        } else {
            result = await Promise.all(
                Object.entries(extractionPlan).map(([propName, plan]) =>
                    extractData(page, plan).then((extractedData) => ({
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
        //const data = await extractData(page, "body > div.wrap > div > div > div.jumbotron > h1");
        //const data = await extractData(page,[ "body > div.wrap > div > div > div.jumbotron > h1", "body > div.wrap > div > div > div.jumbotron > p"]);
        //const data = await extractData(page, {title: "body > div.wrap > div > div > div.jumbotron > h1"});
        /*
        const data = await extractData(page, {
            titles: [
                "body > div.wrap > div > div > div.jumbotron > h1",
                "body > div.wrap > div > div > div.jumbotron > p",
            ],
        });
        */
        /*
        const data = await extractData(page, {
            title: "body > div.wrap > div > div > div.jumbotron > h1",
            subTitle: "body > div.wrap > div > div > div.jumbotron > p",
        });
        */

        /*
        const data = await extractData(page, {
            result: {
                title: "body > div.wrap > div > div > div.jumbotron > h1",
                subTitle: "body > div.wrap > div > div > div.jumbotron > p",
            },
        });
        */

        const data = await extractData(page, {
            link: {
                selector: "#w1 > li abbe",
                //type: ["@href"],
            },
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
