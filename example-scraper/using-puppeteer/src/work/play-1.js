const puppeteer = require("puppeteer");
const fs = require("fs");
const download = require("image-downloader");
const asyncUtil = require("async");
const uuid = require("uuid");
const os = require("os");
const path = require("path");
const process = require("process");

const articleUrlToSlug = (articleUrl) => {
    const url = new URL(articleUrl);
    return path.basename(url.pathname);
};

const imageUrlToBasename = (urlStr) => {
    const imgUrl = new URL(urlStr);
    return path.basename(imgUrl.pathname);
};

const downloadImages = (urls, destinationFolderPath) => {
    let downloadTasks = urls.map((imageURL) => {
        const imageBasename = imageUrlToBasename(imageURL);
        return function (cb) {
            let destinationFilePath = path.join(destinationFolderPath, imageBasename);
            console.log(destinationFilePath);
            const imageInfo = {
                url: imageURL,
                dest: destinationFilePath,
                filename: imageBasename,
            };
            console.log(`image Url : ${imageURL}`);
            download
                .image(imageInfo)
                .then(({ filename, image }) => {
                    cb(null, imageInfo);
                })
                .catch((err) => {
                    cb(err, imageInfo);
                });
        };
    });

    return new Promise((resolve, reject) => {
        asyncUtil.parallel(asyncUtil.reflectAll(downloadTasks), function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results.filter((result) => result.value).map((result) => result.value));
            }
        });
    });
};

const getAllUrl = async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://www.paris-turf.com/actualites/");
    await page.waitForSelector("body");
    const result = await page.evaluate(() =>
        [...document.querySelectorAll("div.mui-jrrayk > div > div > div > a")].map((link) => link.href)
    );
    return result;
};

const getDataFromUrl = async (browser, url) => {
    console.log(`loading url : ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    return page.evaluate((pageUrl) => {
        let title = document.querySelector("h1.MuiTypography-root").innerText;
        let section = document.querySelector("p.mui-14661yt").innerText;
        let signature = document.querySelector("h4.mui-1s2nfck:nth-child(2)").innerText;
        let headline = document.querySelector("h4.MuiTypography-root.MuiTypography-h4.mui-1cb58xh").innerText;
        let body = [...document.querySelectorAll("div.qiota_reserve > div > p")].map((p) => p.innerText);
        let mainImageUrl = document.querySelector(
            ".tss-zxehbm-imageWrapper > span:nth-child(1) > img:nth-child(2)"
        ).src;

        return {
            title,
            headline,
            body,
            section,
            mainImageUrl,
            signature,
            pageUrl,
        };
    }, page.url());
};

const scrap = async () => {
    const browser = await puppeteer.launch({ headless: false });
    /*
    const urlList = await getAllUrl(browser);
    console.log(`articles links found : ${urlList.length}`);
    //urlList.forEach(console.log);
    */
    

    const urlList = [
        "https://www.paris-turf.com/actualites/france/jeudi-a-la-teste-diamond-vendome-trouve-sa-place-202268042417",
        "https://www.paris-turf.com/actualites/france/quinte-du-jeudi-03-08-2023-a-deauville-lorne-sur-sa-lancee-202259375668",
    ];
    
    const results = await Promise.all(urlList.map((url) => getDataFromUrl(browser, url)));
    browser.close();
    return results;
};

const outputFolder = "out";
scrap()
    .then((articles) =>
        articles.map((article) => {
            article.mainImageBasename = imageUrlToBasename(article.mainImageUrl);
            article.id = articleUrlToSlug(article.pageUrl);
            return article;
        })
    )
    .then((articles) =>
        downloadImages(
            articles.map((article) => article.mainImageUrl),
            path.resolve(outputFolder)
        ).then(() => articles)
    )
    .then((articles) =>
        articles.forEach((article) => {
            fs.writeFileSync(path.join(path.resolve(outputFolder), `${article.id}.json`), JSON.stringify(article));
            console.log(article);
        })
    )
    .catch((e) => console.log(`error: ${e}`, e));




/*
console.log("Current working directory: ", process.cwd());

//const absolutFolderPath = path.resolve("out");

//console.log(`absolutFolderPath = ${absolutFolderPath}`);

const myURL = new URL(
    "https://www.paris-turf.com/articles/asset/quinte-du-jeudi-03-08-2023-a-deauville-lorne-sur-sa-lancee-202259375668/00233045-019-scoopdyga-589420ee-305c-11ee-8fcd-fc267de771ac.jpg"
);

console.log(path.basename(myURL.pathname));

downloadImages(
    [
        "https://www.paris-turf.com/articles/asset/quinte-du-jeudi-03-08-2023-a-deauville-lorne-sur-sa-lancee-202259375668/00233045-019-scoopdyga-589420ee-305c-11ee-8fcd-fc267de771ac.jpg",
    ],
     path.resolve("out")
)
    .then((result) => {
        console.log(result);
    })
    .catch((e) => console.log(`error: ${e}`));
    */
