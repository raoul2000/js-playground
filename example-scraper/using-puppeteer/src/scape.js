const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");

const openPage = async (url, browser) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    /*
    await page.exposeFunction('extractValueFromElement', (el, typeName) => {
        console.log(el.jsonValue());
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
    */
    return page;
};

const planAsString = "selector";
const planAsStringArray = ["selector 1", "selector 2"];
const planAsObject = { prop: "selector" };
const planAsObjectArray = [{ propA: "selector 1" }, { propB: "selector 2" }];
const planAsObjectMultiValues = { prop: ["selector 1", "selector 2"] };
const planAsObjectArrayMultiValues = [
    { propA: ["selector 1", "selector 2"] },
    { propB: ["selector 1", "selector 2"] },
];
const obj = {
    propA: {
        selector: "selector",
        type: "text",
    },
};
const obj2 = {
    propA: {
        selector: "selector",
        type: [{ propB: "selector 2" }],
    },
};

const extractData = async (page, extractionPlan, type, handle) => {
    let result;
    if (typeof extractionPlan === "string") {
        console.log("extractionPlan as string = " + extractionPlan);
        if (type) {
            const selectMulti = Array.isArray(type);
            const typeName = selectMulti ? type[0] : type;

            if (typeof typeName === "string") {
                if (selectMulti) {
                    result = await page.evaluate(
                        (selector, typeName, handle) => {
                            return [...(handle ?? document).querySelectorAll(selector)].map((el) => {
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
                        typeName,
                        handle
                    );
                } else {
                    result = await page.evaluate(
                        async (selector, typeName, handle) => {
                            const selected = (handle ?? document).querySelector(selector);
                            if (selected) {
                                if (typeName === "text") {
                                    return selected.textContent;
                                }
                                if (typeName === "html") {
                                    return selected.innerHTML;
                                }
                                if (typeName.startsWith("@") && typeName.length > 1) {
                                    return selected[typeName.substring(1)];
                                }
                                return { error: `failed to extract data with type ${typeName}` };
                            }
                        },
                        extractionPlan,
                        typeName,
                        handle
                    );
                }
            } else if (selectMulti) {
                const newHandles = await page.evaluateHandle(
                    (selector, handle) => (handle ?? document).querySelectorAll(selector),
                    extractionPlan,
                    handle
                );
                // JSHandle is NOT iterable
                // @see https://stackoverflow.com/questions/48146973/puppeteer-how-to-use-page-evaluatehandle/48149750#48149750
                // @see https://stackoverflow.com/questions/74319840/puppeteer-find-list-of-shadowed-elements-and-get-list-of-elementhandles

                result = await Promise.all(
                    [...newHandles].map((newHandle) => extractData(page, typeName, null, newHandle))
                );
            } else if (typeof typeName === "object") {
                // 'type' becomes the new extraction plan relatively to handle
                const newHandle = await page.evaluateHandle(
                    (selector, handle) => (handle ?? document).querySelector(selector),
                    extractionPlan,
                    handle
                );
                result = await extractData(page, typeName, null, newHandle);
            }
        } else {
            // no type: fallback to default = single selection and textContent value
            result = await page.evaluate(
                (selector, handle) => {
                    const selected = (handle ?? document).querySelector(selector);
                    if (selected) {
                        return selected.textContent;
                    }
                },
                extractionPlan,
                handle
            );
        }
    } else if (Array.isArray(extractionPlan)) {
        result = await Promise.all(
            extractionPlan.map((planItem) => extractData(page, planItem, null, handle))
        );
    } else if (typeof extractionPlan === "object") {
        if (extractionPlan.selector) {
            result = await extractData(page, extractionPlan.selector, extractionPlan.type);
        } else {
            result = await Promise.all(
                Object.entries(extractionPlan).map(([propName, plan]) =>
                    extractData(page, plan, null, handle).then((extractedData) => ({
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
        /*
        const data = await extractData(page, {
            link: {
                selector: "#w1 > li a",
                type: ["@href"],
            },
        });
*/
        const data = await extractData(page, {
            link: {
                selector: "#w1 > li",
                type: [{ anchor: "a" }],
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
