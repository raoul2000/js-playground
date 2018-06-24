"use strict"

let app = null;
document.addEventListener("DOMContentLoaded", (event) => {
    app = Elm.Main.embed(document.getElementById("root"));

    app.ports.sendData.subscribe(function(data) {
        console.log("Data from Elm: ", data);
    });
})
