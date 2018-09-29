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

/**
 * Create a Widget
 * 
 * @param {number} id the widget id
 * @returns {Widget}
 */
function createWidget(id) {
    return {
        "name" : "weather",
        "id" : id,
        "color" : "red",
        "renderToDashboard" :  function(A,Z) {
            return "ee";
        }
    };
}
let w1 = getWidget(1);
w1.renderToDashboard(12);
w1.id = "ZZ";

/**
 * @type {Greeter}
 */
let greet;
greet = new Greeter("hello");
greet.showGreeting("hi");

let labelObject = {
    "label" : "hello",
    "qty" : 12
};
printLabel(labelObject);

let wrongLabelObject = {
    "no_label" : "hello",
    "qty" : 12
};
printLabel(wrongLabelObject);// ERROR

printLabel({label : "ee"}); // ERROR
printLabel({label : "ee", "prop" : "ee"}); // ERROR
printLabel(3);

/**
 * Let's play with readonly property
 * @type {Point}
 */
let p1;
p1 = {
    "x" : 12,
    "y" : 33
};
p1.x = 4; // ERROR



