const extractor = require("../src/play");

extractor.extractEXIFFromWebPage({
    "url": "https://www.pexels.com/search/sea/",
    "plan": {
        "url": {
            "selector": "img.photo-item__img",
            "type": ["@src"]
        }
    }
})
.then( result => {
    console.log(result);
})
.catch(err => {
    console.error(err);
});