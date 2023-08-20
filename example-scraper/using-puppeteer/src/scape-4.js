const puppeteer = require("puppeteer");
const pLimit = require("p-limit");

/**
 * Opens and returns a page at the given url.
 *
 * Throws is request doesn't return HTTP 200.
 *
 * @param {string} url page url to open in the browser
 * @param {puppeteer.Browser} browser Browser instance
 * @returns Promise<puppeteer.Page>
 */
const openPage = (url, browser) =>
    browser
        .newPage()
        .then((page) =>
            page.goto(url, { waitUntil: "networkidle2" }).then((response) => {
                if (response.status() !== 200) {
                    throw new Error(`page load request returned status ${response.status()}`, { cause: url });
                }
                return page;
            })
        )
        .then((page) => page.waitForSelector("body").then(() => page));

const testOpenPage = () => {
    console.log("test : openPage");
    let browser;
    puppeteer
        .launch({ headless: false, devtools: true })
        .then((thisBrowser) => {
            browser = thisBrowser;
            return openPage("https://raoul2000.github.io/", browser).then((page) => ({ browser, page }));
        })
        .finally(() => {
            if (browser) {
                browser.close().then(() => console.log("browser closed"));
            }
        });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Mine data into the given *page* following the given *plan*.
 *
 * @param {puppeteer.Page} page the Page to mine
 * @param {*} plan mining plan to apply to the page
 * @returns Promise<any>
 */
const minePage = async (page, plan) => {
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
                        return newRootElement && _extractFromPage(type, null, newRootElement);
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
            console.log("starting data mining from page");
            const finalResult = _extractFromPage(plan);
            console.log("done with data mining from page");
            return finalResult;
        } catch (error) {
            console.log("ERROR : data mining failed" + error);
        }
    }, plan);
    return extractedData;
};

const testMinePage = (url, plan) => {
    console.log("test : minPage");
    let browser;
    puppeteer
        .launch({ headless: false, devtools: true })
        .then((thisBrowser) => {
            browser = thisBrowser;
            return openPage(url, browser).then((page) => minePage(page, plan));
        })
        .then((minedData) => console.log(JSON.stringify(minedData, null, 4)))
        .finally(() => {
            if (browser) {
                browser.close().then(() => console.log("browser closed"));
            }
        });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Create a mining job fo the given plan, on the given url.
 *
 * When done, the page created for this job is closed.
 *
 * @param {string} url URL of the page to mine
 * @param {any} plan the mining plan
 * @param {puppeteer.Browser} browser the Browser instance
 * @returns Promise<any> promise resolved by the extracted data
 */
const newMinigJob = (url, plan, browser) => {
    return openPage(url, browser).then((page) => minePage(page, plan).finally(() => page.close()));
};

/**
 * Returns an array of mining job promises descibed by the given project.
 *
 * When the project is terminated (i.e. no more mining job to do), returns an empty array
 *
 * @param {object} project the mining project to run
 * @param {puppeteer.Browser} browser the browser instance
 * @returns Promise<miningJob>[]
 */
const createMiningJobs = (project, browser) => {
    const isMap = (o) => o !== null && !Array.isArray(o) && typeof o === "object";
    const limit = pLimit(2); // concurrency limit

    return Object.entries(project).reduce((acc, [k, v]) => {
        let reducedAcc = acc;
        if (isMap(v)) { // TODO: could also be an array of projects
            if (v.hasOwnProperty("#url") && v.hasOwnProperty("#plan")) {
                const url = v["#url"];
                const plan = v["#plan"];
                reducedAcc = [
                    ...acc,
                    limit(() =>
                        newMinigJob(url, plan, browser).then((minedData) => (project[k] = minedData))
                    ),
                ];
            } else {
                const ar = createMiningJobs(v, browser);
                if (ar.length !== 0) {
                    reducedAcc = [...acc, ...ar];
                }
            }
        } else if( Array.isArray(v)) {
            // FIXME: return v.map((item) => createMiningJobs(item, browser));
        }
        return reducedAcc;
    }, []);
};

const tesCcreateMiningJobs = (project) => {
    console.log("test : createMiningJobs");
    let browser;
    puppeteer
        .launch({ headless: false, devtools: true })
        .then((thisBrowser) => {
            browser = thisBrowser;
            return Promise.all(createMiningJobs(project, browser));
        })
        .then((miningJobs) => console.log(JSON.stringify(project, null, 4)))
        .finally(() => {
            if (browser) {
                browser.close().then(() => console.log("browser closed"));
            }
        });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const runMiningProject = (project, browser) => {
    const jobs = createMiningJobs(project, browser);
    console.log(`job count : ${jobs.length}`);
    if (jobs.length === 0) {
        return Promise.resolve(project);
    } else {
        return Promise.all(jobs).then(() => {
            //console.log(JSON.stringify(project, null, 4));
            return runMiningProject(project, browser);
        });
    }
};

const testRunMiningProject = (project) => {
    console.log("test : runMiningProject");
    let browser;
    puppeteer
        .launch({ headless: false, devtools: true })
        .then((thisBrowser) => {
            browser = thisBrowser;
            return runMiningProject(project, browser);
        })
        .then((result) => console.log(JSON.stringify(result, null, 4)))
        .finally(() => {
            if (browser) {
                browser.close().then(() => console.log("browser closed"));
            }
        });
};

console.log("start");

testRunMiningProject({
    project: {
        "#url": "https://raoul2000.github.io/",
        "#plan": {header : {
            selector:  ["article > a"],
            type: "@href",
            follow: {
                title: "article > header > h1"
            }
        }},
    },
});

/*
testRunMiningProject({
    project: {
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
    },
});
*/

//tesCcreateMiningJobs({_ : { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" }});
//tesCcreateMiningJobs({ prop1 : "value1", prop2: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" }});
/*
tesCcreateMiningJobs({
    prop1: "value1",
    prop2: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
    prop3: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
    prop4: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
    prop5: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
    prop6: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
    prop7: { "#url": "https://raoul2000.github.io/", "#plan": "div.logo > a" },
});
*/

//testMinePage("https://raoul2000.github.io/", "div.logo > a");
//testOpenPage();
