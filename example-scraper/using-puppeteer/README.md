# Web scrapping With Puppeteer



Example usage : 
- configuration file : 
```json
{
    "pageUrl" : "https://www.paris-turf.com/actualites/",
    "urlListFile": "out/urls.json",
    "outputPath": "./out"
}
```
- get URL of all articles referenced to  URL  `config.pageUrl` and write them to `config.urlListFile` as JSON:
```shell
node ./src/index-articles.js ./src/config.json
```
- scrap each article from URLs in `config.urlListFile` and downolad to `config.outputPath` :
```shell
node ./src/article-content.js ./src/config.json
```