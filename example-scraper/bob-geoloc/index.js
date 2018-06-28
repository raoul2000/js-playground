
const play = require('./src/play');

play.extractExif([
    {
        "url": "http://127.0.0.1:8080/img/img1.jpg",
        "filename": "path/not/found/image.jpg"
    }
])
.then( result => {
    console.log(result);
});

