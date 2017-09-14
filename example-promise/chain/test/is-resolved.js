"use strict";

var isResolved = require('../promise-utils').isResolved,
  assert = require('chai').assert;


describe('isResolved function', function(done) {
  this.timeout(5000);


  it('detects a resolved reflection object', function(done) {
    assert.isTrue(isResolved({
      "resolved" : true
    }));
    done();
  });

  it('detects a rejected reflection object', function(done) {
    assert.isFalse(isResolved({
      "resolved" : false
    }));
    done();
  });

  it('throws exception on invalid reflection object', function(done) {
    try {
      assert.isFalse(isResolved({
        "NOT_VALID" : false
      }));
      done("should fire exception on invalid reflection object");
    } catch (e) {
      done();
    }
  });

  it('throws exception on invalid argument ', function(done) {
    try {
      assert.isFalse(isResolved());
      done("should fire exception on invalid reflection object");
    } catch (e) {}

    try {
      assert.isFalse(isResolved(1));
      done("should fire exception on invalid reflection object");
    } catch (e) {}

    try {
      assert.isFalse(isResolved("some string"));
      done("should fire exception on invalid reflection object");
    } catch (e) {}

          done();
  });

});
