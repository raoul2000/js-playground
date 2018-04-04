This is an attempt to implement a *Miner* able to extract data from web pages...and this is a **WORK IN PROGRESS**.

# Meet "Bob the Web Miner"

*Bob* is a miner, a "web" miner, which means that Bob doesn't digg the ground to extract minerals but the "World Wide Web" to extract data. To be able to do his job correctly, you need to give Bob 2 things : a place to digg and a description of how to extract data. For example, to ask Bob to extract the main title of the New-York Time home page, here is what you should do :

```js
const bob = require('bob-the-miner');

bob.work('https://www.nytimes.com/', "h1.story-heading > a")
  .then(result => { console.log(result.data)}) // display extracted data
  .catch(err   => { consoler.err(err)})
```

This was an easy one for Bob who is actually able to work much harder to try to satisfy your demand, but basically you get the idea :

- the first argument is the place to digg (here a simple URL)
- the second is the extraction plan (here a simple jquery-like selector)

At last, you may have noticed that when you ask Bob to work, he gives you back the *promise* that he will do his best, and noting more (because you never know). If no problem occured, the promise will be resolved with the data extracted by Bob, otherwise the promise will be rejeced with an error describing the problem.

Now you know Bob.

You'll find below a complete description of how to ask Bob to mine according to your needs, because Bob can actually do much more than just mine a simple value from a single web page.

# How to ask Bob to mine

To be able to mine, Bob needs 2 arguments :

- an *itinerary* : because the World Wide Web is a vast land, and because you don't want Bob to be lost, you must provide him with an itinerary that will be used to digg one or more pages hidden in the web.
- an *extractionPlan* : once Bob reaches the digging area (i.e. the target web page), he has to start working. To be able to extract the valuable data you are interested in, you will pass an *extraction plan* to Bob.



## The Itinerary

In its simplest form, the *itinerary* is the url of the page you want to mine.

```js
mine( "http://hostname/path/index.html", extractionPlan);
```

## The Extraction Plan

For a given *propertyName* its definition can be provided as an object :

```
{
  "propertyName" : {
    "selector" : "jquery selector",
    "type" :
      "text"   | "html"   | "@attributeName"   | { object } |
      ["text"] | ["html"] | ["@attributeName"] | [{ object }]
  }
}
```
If no **type** is provided, **text** is default.
If the property value is a string, then it is assumed to be the selecor. If it's an array, it must contain
one single item assued to be the selector. The property type is an array.

## Primitive Type Property

Extracts the title of a post. Only the first matching result is extracted. By default, the **type** is **text**.
```json
{
  "title" : {
    "selector" : "body > div.post > h1",
  }
}
```
In short notation :
```json
{
  "title" : "body > div.post > h1"
}
```

The result :
```json
{
  "title" : "Title of the first matching result"
}
```

## Array Property

Create an object with three properties : *title* and *paragraphs* and *addresses*.
First two having a value that is an array of text and the last one is the value of the *href* attribute

```json
{
  "title" : {
    "selector" : "body > div.post > h1",
    "type" : "text"
  },
  "paragraphs" : {
    "selector" : "body > div.post > p",
    "type" : ["text"]
  },
  "addresses" : {
    "selector" : "body > div.post > a",
    "type" : ["@href"]
  }
}
```

The Result :

```json
{
  "title" : "this is the main title",
  "paragraphs" : ["this is the first paragraphs", "this is the second paragraph"],
  "addresses" : [
    "http://hostname/path/to/ressource",
    "relative/path"
  ]
}
```

Using the short notation it is possible to extract *title* and *paragraphs* :
```json
{
  "title"      : "body > div.post > h1",
  "paragraphs" : ["body > div.post > p"]
}
```
This is possible because the default type *text* is appropriate for these 2 properties. The addresses property can't be extract using the short notation.

## Single Object

Let's extract the first post and retrieve its title and list of paragraphs. Note that the `selector` of *title* and *text* properties is **relative to the parent selector** (here : "body > div.list > div.post").

```json
{
  "post" : {
    "selector" : "body > div.list > div.post",
    "type"    : {
      "title" : {
        "selector" : "h1"
      },
      "text"  : {
        "selector" : "div.body > p",
        "type" : ["text"]
      }
    }
  }
}
```

The result :

```json
{
  "post" : {
    "title" : "this is the title",
    "text" : [
      "This is the first paragraph of the text",
      "And here is the second paragraph"
    ]
  }
}
```
## Array Of Object

Now extracts all posts (title and text) : it's *almost* the same as above but this time, we enclose the object definition into an array :

```json
{
  "post" : {
    "selector" : "body > div.list > div.post",
    "type"    : [{
      "title" : {
        "selector" : "h1"
      },
      "text"  : {
        "selector" : "div.body > p",
        "type" : ["text"]
      }
    }]
  }
}
```

The result :

```json
{
  "post" : [{
    "title" : "First post : this is the title",
    "text" : [
      "This is the first paragraph of the text",
      "And here is the second paragraph"
    ]
  },
  {
    "title" : "Second Post : this is the title",
    "text" : [
      "This is the first paragraph of the text",
      "And here is the second paragraph"
    ]
  }]
}
```
