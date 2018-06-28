const extractor = require("../src/play");

extractor.extractEXIFFromWebPage({
    "url": "https://www.leboncoin.fr/ventes_immobilieres/1440402606.htm/",
    "plan": {
        "url": {
            "selector": "div._2x8BQ > img",
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