'use strict';

const reflect = require('./promise-utils').reflect;
const runTasksInSequence = require('./promise-utils').runTasksInSequence;
const serial = require('./promise-utils').serial;
const parallel = require('./promise-utils').parallel;



let tasks = [ "a", "b", "c"];
let myFn = function(item, next, i) {
  console.log("call myFn ------------");
  //console.log("item : ", item);
  //console.log("next : ", next);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, item);
  });
};

serial(tasks,myFn).then(results => {
  console.log(results);
});

/*
parallel(tasks,myFn).then(results => {
  console.log(results);
});
*/

/*
let p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "one");
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "two");
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "three");
});
let p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, "four");
});
let p5 = new Promise((resolve, reject) => {
  reject("reject-one");
});
let p6 = new Promise((resolve, reject) => {
  reject("reject-two");
});
*/
/*
let p7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("boum");
  }, 4000);
});
*/
