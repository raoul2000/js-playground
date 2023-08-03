
const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");
const download = require("image-downloader");
const asyncUtil = require("async");
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

const extractArticle = async ({ page, data }) => {
    const { pageUrl } = data;
    console.log(`loading url : ${pageUrl}`);
    await page.goto(pageUrl, { waitUntil: "networkidle2" });
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
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    await cluster.task(async ({ page, data }) => {
        const { articleIndexUrl } = data;
        await page.goto(articleIndexUrl, { waitUntil: "networkidle2" });
        const taskResult = (
            await page.evaluate(() =>
                [...document.querySelectorAll("div.mui-jrrayk > div > div > div > a")]
                    .map((link) => link.href)
                    .slice(0, 1)
            )
        ).map((pageUrl) => {
            console.log(`adding ${pageUrl}`);
            return cluster.execute(
                {
                    pageUrl,
                },
                extractArticle
            );
        });
        return taskResult;
    });

    const results = await cluster.execute({ articleIndexUrl: "https://www.paris-turf.com/actualites/" });

    await cluster.idle();
    await cluster.close();
    return results;
};

const outputFolder = "out";
/**
 * Works ok but failed to get the returned values. Drop cluster.queue for cluster.execute which is returning
 * a Promise.
 * @see https://stackoverflow.com/questions/57361073/puppeteer-cluster-queue-instead-of-execute
 * @see https://github.com/thomasdondorf/puppeteer-cluster
 * 
 * Another option wloud be to use Promise pool
 * @see https://stackoverflow.com/a/47871094
 * 
 * Also, to not add a new dependency, the queue function handle concurrency
 * @see http://caolan.github.io/async/v3/docs.html#queue
 * 
 */
scrap()
    .then((results) => {
        const r = results.map(promise => promise.then(value => value));
        console.log(r);
    })
    .catch((e) => console.log(`error: ${e}`, e));
/*
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
            fs.writeFileSync(
                path.join(path.resolve(outputFolder), `${article.id}.json`),
                JSON.stringify(article)
            );
            console.log(article);
        })
    )
    .catch((e) => console.log(`error: ${e}`, e));
*/
