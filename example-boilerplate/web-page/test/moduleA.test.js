// @ts-nocheck
/* eslint-env node, mocha */
import { JSDOM } from 'jsdom';
import chai from 'chai';
import { f1, setInputValue } from '../src/moduleA';

describe('moduleA', () => {
  it('f1 output to console', () => {
    chai.expect(1 + 2).to.equal(3);
    f1('hello');
  });

  it('change input element value', () => {
    const dom = new JSDOM(
      `<body>
          <input id="inputId" value="old value" />
      </body>`
    );

    global.document = dom.window.document;

    setInputValue('inputId', 'new value');
    chai.expect(document.getElementById('inputId').value).to.equal('new value');
  });

  it('throws an exception when the input element is not found', () => {
    const dom = new JSDOM(
      `<body>
          <input id="inputId" value="old value" />
      </body>`
    );

    global.document = dom.window.document;
    chai.expect(() => setInputValue('NOT_FOUND', 'new value')).to.throw(Error, 'element not found');
  });
});
