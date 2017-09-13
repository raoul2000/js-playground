'use strict';



exports.runTasksInSequence = function(tasks) {
  return tasks.reduce((p, task) => p.then(task), Promise.resolve());
};

exports.serial = function (tasks, fn) {
  return tasks.reduce((promise, task) => promise.then(previous => fn(task, previous)), Promise.resolve(null));
};

exports.parallel = function (tasks, fn) {
  return Promise.all(tasks.map(task => fn(task)));
};

/**
 * Always resvole the promise passed as argument.
 * To check if the promise has in fact be rejected  test 'error'
 * Returns a promise that is always successful when this promise is settled.
 * Its fulfillment value is an object that implements the following interface and reflects the resolution of this promise.
 *
 * Returned object :
 * {
 *  resolved : boolean,
 *  error : Error | NULL,
 *  value : Promise resolution value | NULL
 * }
 * @see http://stackoverflow.com/a/31424853/3164844
 * @param  {Promise} promise The Promise object to reflect
 * @return {Object}         the Promise reflection object describing fullfilment
 */
exports.reflect = function(promise) {
  return promise
    .then(value => {
      return {
        value: value,
        error: null,
        resolved: true
      };
    })
    .catch(error => {
      return {
        value: null,
        error: error,
        resolved: false
      };
    });
};
