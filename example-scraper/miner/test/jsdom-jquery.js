"use strict";

const jsdom = require("jsdom");

const dom = new jsdom.JSDOM(`<!DOCTYPE html>
  <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
  </ul>
  <p>Hello world</p>`);
let window = dom.window;

console.log(dom.serialize());
require("sizzle")("ul > li",dom.window.document);
