"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const jsdom = require("jsdom");


describe('JSDOM features', function(done) {

  it('loads an HTML document', function(done) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    assert.isNotNull(dom.window.document);
    done();
  });

  it('use selector on HTML document loaded by jsdom', function(done) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    assert.equal(dom.window.document.querySelector('p').textContent,"Hello world");
    done();
  });

  it('select by index', function(done) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html>
      <p>hello world</p>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <p>Hello world</p>`);
    let li = dom.window.document.querySelectorAll('ul > li');
    assert.equal(li["0"].textContent,"item 1");
    assert.equal(li["1"].textContent,"item 2");
    assert.equal(li["2"].textContent,"item 3");
    done();
  });

  it('select by last', function(done) {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html>
      <p>hello world</p>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <p>Hello world</p>`);
    let li = dom.window.document.querySelectorAll('ul > li:last()');
    console.log(JSON.stringify(li));
    done();
  });

});
