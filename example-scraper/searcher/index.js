"use strict";



// THIS IS A WIP ////



const request = require('request');
const cheerio = require('cheerio');
const tasks   = require('./promise-utils');



/**
 * Performs a GET request on the URL and returns the HTML content
 * @param  {string} url The URL to request
 * @return {Promise}     the HTML content returned
 */
function loadMainPage(url) {
  console.log('loading url ', url);
  return new Promise( (resolve, reject) => {
    request(url, function(error, response, html) {
        if (!error && response.statusCode === 200) {
            resolve({
              "rootUrl" : url,
              "html"    : html
            });
        } else {
          reject(error);
        }
    });
  });
}
/**
 * Parses the HTML passed as argument and extract infos :
 * {
 *  "name" : "the name of the link",
 *  "url"  : "the url value"
 * }
 * @param  {object} page  HTML string representing the content of a doc pag
 * @return {array}      array containing informations about links in the page
 */
function extractLinksFromMainPage(page) {
  console.log("extracting",page);
  const $ = cheerio.load(page.html);
  let result = [];
  $('div.container a').filter(function(){
    const anchor = $(this);
    result.push({
      "name" : anchor.text().trim(),
      "url"  : page.url.concat('/',anchor.attr('href')) // turn relative URL into absolute
    });
  });
  console.log(result);
  return result;
}

function extractTokensFromDocPage( link ) {
  return new Promise( (resolve, reject) => {
    request(link.url, function(error, response, html) {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          resolve({
            "title" : $('title').text(),
            "text" : "text" //$('body').text()
          });
        } else {
          reject(error);
        }
    });
  });
}

////////////////////////////////////////////////////////////////////////////////

function main(rootUrl) {

    loadMainPage(rootUrl)
    .then( extractLinksFromMainPage )
    .then( links => {
      return tasks.parallel(links,extractTokensFromDocPage);
    })
    .then( results => {
      console.log(results);
    })
    .catch(err => {
      console.error(err);
    });
}


main('http://192.168.203.182:8301/swing/docs/index.html');
