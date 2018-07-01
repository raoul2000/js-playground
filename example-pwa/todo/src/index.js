import './style.css';

var Elm;

console.log("loading index.js");
document.addEventListener( 'DOMContentLoaded', function () {
    let app = Elm.Main.embed(document.getElementById("root"));
}, false );        
