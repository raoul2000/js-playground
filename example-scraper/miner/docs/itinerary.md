

# The Itinerary

> The *Itinerary* is when you tell bob where to go to start data extraction

## a Single Page

In its simplest form, the *itinerary* is the address of the page you want to mine.

```js
bob.work( "http://hostname/path/index.html", extractionPlan);
```

Another option is to pass an object with at least a `url` property. This is particularly useful if you need to control the request that will be created and sent. Bob relies on the [request](https://github.com/request/request) module and the itinerary argument can be a complete *option* object as described in the [documentation](https://github.com/request/request#requestoptions-callback). In the example below, we tell Bob which user agent he should use to request the page.

```js
bob.work(
  {
    "url"  : "http://hostname/path/index.html",
    "headers" : {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0;) Gecko/20100101 Firefox/59.0'
    }    
  },
  extractionPlan
);
```

In both cases of success, the result is an object :

```json
{
  "source" : "http://hostname/path/index.html",
  "data"   : {...}
}
```

## Many Pages

If you want to use the same extraction plan on several pages just provide an array of adresses and/or objects as the first argument.

```js
bob.work(
  [
    "http://hostname/path/index.html",
    "http://hostname/path/product.html",
    {
      "url"  : "http://hostname/path/contact.html",
      "headers" : {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0;) Gecko/20100101 Firefox/59.0'
      }    
    }
  ],
  extractionPlan
);
```

In this case the result is an array of objects :

```json
[{
  "source" : "http://hostname/path/index.html",
  "data"   : {...}
},{
  "source" : "http://hostname/path/product.html",
  "data"   : {...}
}]
},{
  "source" : "http://hostname/path/contact.html",
  "data"   : {...}
}]
```

## Follow Me

There may be some cases where you don't really know the complete itinerary before to start: you only know the first step and the way to find the direction to the next one. This is for example the case if you want to work on a paginated result set.


```js
bob.work(
  {
    "url"  : "http://hostname/path/index.html",
    "nextUrl" : {
      "selector" : "div.post > p > a",
      "type"     : "@href"
    },
    "maxJump"    : 3
  },
  extractionPlan
);
```

The result is an array of objects

```json
[{
  "source" : "http://hostname/path/index.html",
  "data"   : {...}
},
{
  "source" :  "http://hostname/path/p2.html",
  "data"   : {...}
}]
```
