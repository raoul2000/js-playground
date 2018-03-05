# Bob the Web Miner

This is an attempt to implement a *Miner* able to extract data from web pages...and this is a **WORK IN PROGRESS**.

## Syntax

For a given *propertyName* :

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

## Primitive Type  Property

Extracts the title of a post. Only the first matching result is extracted. By default, the **type** is **text**.
```json
{
  "title" : {
    "selector" : "body > div.post > h1",
  }
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
    "value" : ["text"]
  },
  "paragraphs" : {
    "selector" : "body > div.post > p",
    "value" : ["text"]
  },
  "addresses" : {
    "selector" : "body > div.post > a",
    "value" : ["@href"]
  }
}
```

The Result :

```json
{
  "title" : ["this is the main title"],
  "paragraphs" : ["this is the first paragraphs", "this is the second paragraph"],
  "addresses" : [
    "http://hostname/path/to/ressource",
    "relative/path"
  ]
}
```

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
  }
  ]
}
```
