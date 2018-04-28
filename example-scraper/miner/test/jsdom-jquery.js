"use strict";

const jsdom = require("jsdom");

const dom = new jsdom.JSDOM(`<!DOCTYPE html>
  <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3 <i>ital</i></li>
  </ul>
  <p>Hello world</p>`);
console.log(dom.serialize());

let window = dom.window;

var $ = require('jquery')(window);
var li = $('ul > li:last');
console.log(li.text());
console.log(li.html());

li = $('ul > li:gt(1)');
console.log(li);

//require("sizzle")("ul > li",dom);
