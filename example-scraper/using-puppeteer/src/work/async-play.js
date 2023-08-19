const async = require("async");

const test1 = () => {
    
    const q = async.queue((data, callback) => {
        setTimeout(() => {
            console.log("running job : " + JSON.stringify(data, null, 4));
            callback();
        }, 500);
    });

    q.drain(function () {
        console.log("all items have been processed");
    });
    q.error(function (err, task) {
        console.error("task experienced an error");
    });

    q.push([{ name: "baz" }, { name: "bay" }, { name: "bax" }], function (err) {
        console.log("finished processing item");
    });
};

test1();
