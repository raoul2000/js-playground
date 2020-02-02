import sum from '../src/sum.js';
import chai from 'chai';

describe('sum', function () {
    it('should return sum of arguments', function () {
        chai.expect(sum(1, 2)).to.equal(3);
    });
});