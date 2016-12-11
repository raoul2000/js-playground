"use strict";

const request = require('request');
const cheerio = require('cheerio');

let url = "https://packagist.org/search/?q=raoul2000";

let result = [];

function stringToInt(str) {
  return parseInt(str.split(' ').join(''), 10);
}

request(url, function(error, response, html) {
    if (!error && response.statusCode === 200) {
        //console.log(html); // Show the HTML for the Google homepage.
        const $ = cheerio.load(html);

        // div.search-list > ul.packages > li.row
        $('div.search-list > ul.packages > li.row').filter(function(){
          const row = $(this);

          let name          = row.find('h4 > a ').text();
          let downloadCount = row.find('i.glyphicon-arrow-down ').parent().text();
          let starCount     = row.find('i.glyphicon-star ').parent().text();

          result.push({
            "name"      : name,
            "download"  : downloadCount,
            "star"      : starCount
          });
        });

        console.log(result);
    }
});
