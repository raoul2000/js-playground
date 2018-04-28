"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const jsdom  = require("jsdom");


describe('JSDOM and JQuery features', function(done) {

  it('apply JQuery selector on HTML', function(done) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3 <i>ital</i></li>
      </ul>
      <p>Hello world</p>`);
    var $ = require('jquery')(dom.window);
    var li = $('ul > li:last');
    assert.equal("item 3 ital",li.text());
    assert.equal("item 3 <i>ital</i>",li.html());

    li = $('ul > li:gt(1)');
    assert.equal("item 3 ital",li.text());
    assert.equal("item 3 <i>ital</i>",li.html());

    done();
  });

});
