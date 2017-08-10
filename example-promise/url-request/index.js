'use strict';

var rp = require('request-promise');
var fs = require('fs');

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'url-list', type: String, multiple: false }
];
const options = commandLineArgs(optionDefinitions);

function reflect(item){
    return item.promise.then(
      function(v){ return {v:v, status: "OK  ", url : item.url }},
      function(e){ return {e:e, status: "FAIL", url : item.url }}
    );
}

function main(){
  if( options.hasOwnProperty('url-list') === false) {
    console.log('err: missing argument "url-list" filename');
  } else {

    fs.readFile(options['url-list'], 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      let url = JSON.parse(data);
      let arr = url.map( item => {
        return {
          "url" : item,
          "promise"  : rp(item)
        };
      });
      Promise.all(arr.map(reflect)).then(function(results){
        results.forEach(result => console.log(result.status + ' : ' + result.url));
      });
    });
  }
}

main();
