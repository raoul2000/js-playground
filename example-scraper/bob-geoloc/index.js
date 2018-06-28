
const play = require('./src/play');

play.downloadImages([
    "http://127.0.0.1:8080/img/img1.jpg"
])
.then( result => {
    console.log(result);
});

