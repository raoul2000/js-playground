/* eslint-env node, mocha */
import chai from 'chai';
import { f1 } from '../src/moduleA';

describe('moduleA', () => {
  it('f1 output to console', () => {
    chai.expect(1 + 2).to.equal(4);
    f1('hello');
  });

  it('f1 output to console', () => {
    chai.expect(1 + 2).to.equal(3);
    f1('hello');
  });
});
