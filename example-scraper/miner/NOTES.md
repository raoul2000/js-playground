


- [ ] Pagination syntax - see [x-ray](https://github.com/matthewmueller/x-ray)

```js
x('https://blog.ycombinator.com/', '.post', [{
  title: 'h1 a',
  link: '.article-title@href'
}])
  .paginate('.nav-previous a@href')
  .limit(3)
  .write('results.json')
```

- [ ] add inline converter - see [scrape-it](https://github.com/IonicaBizau/scrape-it)

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

## Usage Examples

### single page mining

- call

```js
mine( "http://hostname/path/index.html", model);
```

- result

```json
{
  "source" : "http://hostname/path/index.html",
  "data"   : {}
}
```

### multiple page mining
- call

```js
mine( [
    "http://hostname/path/index.html",
    "http://hostname/path/product.html"
  ],
  model);
```
- result

```json
[{
  "source" : "http://hostname/path/index.html",
  "data"   : {}
},{
  "source" : "http://hostname/path/product.html",
  "data"   : {}
}]
```

### simple named page mining

- call

```js
mine( {
    "name" : "site name",
    "url"  : "http://hostname/path/index.html"
  },
  model);
```

- result

```json
{
  "source" : {
      "name" : "site name",
      "url"  : "http://hostname/path/index.html"
  },
  "data"   : {}
}
```

### multiple names page mining

- call

```js
mine( [{
    "name" : "site name",
    "url"  : "http://hostname/path/index.html"
  },
  {
    "name" : "site name 2",
    "url"  : "http://hostname/path/prodcut.html"
  }] ,
  model);
```

- result

```json
[{
  "source" : {
      "name" : "site name",
      "url"  : "http://hostname/path/index.html"
  },
  "data"   : {}
},
{
  "source" : {
      "name" : "site name 2",
      "url"  : "http://hostname/path/product.html"
  },
  "data"   : {}
}
]```
