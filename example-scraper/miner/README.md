
> What ? another web scraper ? ...yeah, that's Bob !

# Install

```
git clone https://github.com/raoul2000/bob-the-miner.git
cd bob-the-miner
npm install
```
# Test

First start the test local server :
```
npm run server
```

Then run the tests :
```
npm test
```

# Examples

- extract titles from the [nodejs]('https://foundation.nodejs.org) new website

```
npm run nodejs-news
```
- extract headlines from the [New-York Times](https://www.nytimes.com/) website

```
npm run nyt-headline
```
- extract packages list from [NPM](https://www.npmjs.com) website

```
npm run npm-crawler
```

# Documentation

Documentation is based on [vuepress](https://vuepress.vuejs.org).

```
npm run docs:dev
npm run docs:build
```
