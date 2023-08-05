const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");
const download = require("image-downloader");
const async = require("async");

const articleUrlToSlug = (articleUrl) => {
    const url = new URL(articleUrl);
    return path.basename(url.pathname);
};

const imageUrlToBasename = (urlStr) => {
    const imgUrl = new URL(urlStr);
    return path.basename(imgUrl.pathname);
};

const downloadImages = (urls, destinationFolderPath) => {
    console.log(`Downloading ${urls.length} image(s) ...`);
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
            console.log(`download image from : ${imageURL}`);
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
        async.parallel(async.reflectAll(downloadTasks), function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results.filter((result) => result.value).map((result) => result.value));
            }
        });
    });
};

const getDataFromUrl = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");
    return page
        .evaluate((pageUrl) => {
            let title = document.querySelector("h1.MuiTypography-root").innerText;
            let section = document.querySelector("p.mui-14661yt").innerText;
            let signature = document.querySelector("h4.mui-1s2nfck:nth-child(2)").innerText;
            let headline = document.querySelector(
                "h4.MuiTypography-root.MuiTypography-h4.mui-1cb58xh"
            ).innerText;
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
        }, page.url())
        .finally(() => page.close());
};

const scrap = async (urlList) => {
    const browser = await puppeteer.launch({ headless: false });
    const articles = [];
    console.log("Starting work ...");
    console.log("scrapping articles urls");

    const q = async.queue(function (url, callback) {
        console.log("url " + url);
        getDataFromUrl(browser, url)
            .then((article) => {
                articles.push(article);
                callback();
            })
            .catch((error) => callback({ error, url }));
    }, 5); // concurrency

    q.push(urlList, function (err) {
        if (err) {
            console.error("taks failed", err);
        }
    });
    console.log("scrapping article(s)");
    return q
        .drain()
        .then(() => browser.close())
        .then(() => articles);
};

// Main //////////////////////////////////////////////////////////////////////////////////

if(process.argv.length !== 3) {
    console.error("missing argument : configuration file");
    process.exit(1);
}

const outputFolder = "out";
const outputPath = path.resolve(outputFolder);

let rawdata = fs.readFileSync('student.json');
let student = JSON.parse(rawdata);


if (!fs.existsSync(outputPath)) {
    console.log("creating output folder " + outputPath);
    fs.mkdirSync(outputPath);
}

const urlList = [
    "https://www.paris-turf.com/actualites/france/jeudi-a-la-teste-diamond-vendome-trouve-sa-place-202268042417",
    "https://www.paris-turf.com/actualites/france/quinte-du-jeudi-03-08-2023-a-deauville-lorne-sur-sa-lancee-202259375668",
];

scrap(urlList)
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
            outputPath
        ).then(() => articles)
    )
    .then((articles) =>
        articles.forEach((article) => {
            const articleFilePath = path.join(outputPath, `${article.id}.json`);
            console.log("saving to " + articleFilePath);
            fs.writeFileSync(articleFilePath, JSON.stringify(article, null, 4));
        })
    )
    .catch((e) => console.log(`error: ${e}`, e));
