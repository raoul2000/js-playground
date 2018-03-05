


- [ ] : Pagination syntax - see [x-ray](https://github.com/matthewmueller/x-ray)

```js
x('https://blog.ycombinator.com/', '.post', [{
  title: 'h1 a',
  link: '.article-title@href'
}])
  .paginate('.nav-previous a@href')
  .limit(3)
  .write('results.json')
```

- [ ] : add inline converter - see [scrape-it](https://github.com/IonicaBizau/scrape-it)

```js
scrapeIt("https://ionicabizau.net", {
    // Fetch the articles
    articles: {
        listItem: ".article"
      , data: {

            // Get the article date and convert it into a Date object
            createdAt: {
                selector: ".date"
              , convert: x => new Date(x)
            }

```
