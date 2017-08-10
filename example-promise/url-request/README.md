HTTP GET to a URL list provided as a JSON file.

# Installation
From the `url-request` folder :

    npm install

# Usage

Add your URL to the file `url-list.json` :

```json
[
  "http://www.google.com",
  "http://www.dummy-url-that-does-not-exist.com"
]
```

And run :

```
node index.js --url-list url-list.json
```

Output is :

```
OK   : http://www.google.com
FAIL : http://www.dummy-url-that-does-not-exist.com
```
