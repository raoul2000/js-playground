"use strict";

// test stuff here
//
const cheerio = require('cheerio');
//console.log(cheerio.version);

let html = `<p id="root">
				<ul>
					<li> text in <b>bold 1</b></li>
					<li> text in <b>bold 2</b></li>
				</ul>
			</p>`;
let selector = 'p > ul > li';

const $html = cheerio.load(html);

//console.log($html("ul > li").length);
console.log($html("ul[id]"));

/*
cheerio("p").each(function(i,elem){
  console.log(elem);
});*/
