
# The Extraction Plan

> The *Extraction plan* is where you tell bob what to extract from a web page

## A Simple Selector

As we already saw, the most simple extraction plan is a [JQuery Selector](https://api.jquery.com/category/selectors/) that is evaluated on the
page. The extracted value is the text value of the first matching element.

```js
bob.work(
  "http://hostname/path/post-01.html",
  "div.content > div.post > h1"
);
```
In this case, the result is a simple string.

If you want to extract more than one simple value using a selector, just provide an array
where each item is a selector. Again, only the first matching element for each selector
will be returned.

```js
bob.work(
  "http://hostname/path/post-01.html",
  ["div.content > div.post > h1", "div.content > div.post > p.body"]
);
```

You will receive an array of strings, where the first one is the title of the post, and the second
one, the body of the post.

But ok, this is quite basic right ? Bob can also provide a complete object if you tell him how to
do. We will see that on the next chapter.

## A Complex Extraction Plan

If you want Bob to produce an object instead of a simple text value, you can give him an extraction
plan describing exactly this object. Here is an example... Are you able to understand it ?

```js
bob.work(
  "http://hostname/path/post-01.html",
  {
    "postList": {
      "selector": "div.content > div.post",
      "type": [{
        "title": '.post-header > h3.title'
        "body" :  'div.excerpt'
      }]
    }
  }
);
```

The object we ask Bob to build has one property named *postList*. This property is
an *array* (that's its *type*) that contains objects representings posts. Each object in this array has 2 properties.
- *title* : a string representing the title of the post
- *body* : a string representing the content of the post

Here is how the result could look like :

```json
{
  "source" : "http://hostname/path/post-01.html",
  "data"   : {
    "postList" : [
      { "title" : " some title", "body" : "lorem ipsum etc ..."},
      { "title" : " some other title", "body" : "let it be etc."},
      { "title" : " the last title", "body" : "Bob is in da place !"}
    ]
  }
}
```

An object is made of **properties**, and we are going to see now how to describe them to Bob.

For a given *propertyName* its definition can be provided as an object :

```
{
  "propertyName" : {
    "selector" : "jquery selector",
    "type" :
       "text"  |  "html"  |  "@attributeName"  |  { object } |
      ["text"] | ["html"] | ["@attributeName"] | [{ object }]
  }
}
```

If the property value is a string, then it is assumed to be the selector. If it's an array, it must contain
one single item assumed to be the selector. The property type is an array.

The *selector* value is a JQuery selector.

The *type* value is describing how to get a value based on the selected element.

If no **type** is provided, **text** is default.

### Primitive Type Property

Extracts the title of a post. Only the first matching result is extracted.

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

### Array Property

Create an object with three properties : *title* and *paragraphs* and *addresses*.
- *title* : text of the **first** selected element
- *paragraphs* : array of text of **all** selected elements
- *adresses* : array of *href* attribute values for all selected elements

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
This is possible because the default type *text* is appropriate for these 2 properties. The *addresses* property can't be extract using the short notation.

### Single Object

Let's extract the first post and retrieve its title and list of paragraphs. Note that the `selector` of *title* and *text* properties is **relative to the parent selector** (here : `body > div.list > div.post`).

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
### Array Of Object

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
