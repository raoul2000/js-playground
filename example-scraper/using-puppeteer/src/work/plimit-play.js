const pLimit = require("p-limit");

const test1 = () => {
    const limit = pLimit(3);

    const jobs = [...Array(10).keys()].map((i) =>
        limit(
            () =>
                new Promise((resolve, reject) => {
                    console.log(`runnin job ${i}`);
                    setTimeout(() => {
                        resolve("result " + i);
                    }, 500);
                })
        )
    );

    Promise.all(jobs).then((results) => {
        console.log(JSON.stringify(results, null, 4));
    });
};

test1();
