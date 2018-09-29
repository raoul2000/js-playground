// ts-check
// chack : https://github.com/mike-works/vscode-fundamentals/blob/master/docs/1_using/type-checking.md


/** @type {number} */
let value;
value = "ee";

/** @type {number} */
let age;
// @ts-ignore
age = "young";

/** 
 * @type {Element} holds a referenbce to the password 
 * field containers. Use with care !
 */
//let myDiv = document.querySelector('.passwordField');
let myDiv = "ee";

/**
 * describe function
 * 
 * @param {string} a param a
 * @param {number} b a number
 */
function f1(a,b){
    console.log("boo");
}
f1(1,"E");

