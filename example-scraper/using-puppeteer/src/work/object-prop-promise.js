const obj1 = {
    prop1: "value",
    prop2: ["value"],
    prop3: {
        p21: "value",
        p22: 12,
    },
    prop4: {
        "#url": "url prop 4",
        "#plan": {
            plan1: "selector",
        },
    },
    prop5: {
        p51: {
            p511: {
                "#url": "url p511",
                "#plan": {
                    plan1: "selector 511",
                },
            },
        },
    },
};

const extractData = (plan) => {
    if ((plan["#url"] === "url2")) {
        return {
            "#url": "last",
            "#plan": plan["#plan"],
        };
    } else {
        return { result: "plan ok" };
    }
};

const asyncJob = (k, v, obj) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            obj[k] = extractData(v);
            resolve();
        }, 500);
    });

const syncJob = (k, v, obj) => {
    obj[k] = extractData(v);
    return "ok";
};

const isMap = (o) => o !== null && !Array.isArray(o) && typeof o === "object";

const f = (obj) => {
    return Object.entries(obj).reduce((acc, [k, v]) => {
        let reducedAcc = acc;
        if (isMap(v)) {
            if (v.hasOwnProperty("#url") && v.hasOwnProperty("#plan")) {
                reducedAcc = [...acc, asyncJob(k, v, obj)];
            } else {
                const ar = f(v);
                if (ar.length !== 0) {
                    reducedAcc = [...acc, ...ar];
                }
            }
        }
        return reducedAcc;
    }, []);
};

const g = (obj) => {
    const jobs = f(obj);
    console.log(`job count : ${jobs.length}`);
    if (jobs.length === 0) {
        return Promise.resolve(obj);
    } else {
        return Promise.all(jobs).then(() => {
            console.log(JSON.stringify(obj, null, 4));
            return g(obj);
        });
    }
};

let res = f({ p1: "v1" });
res = f({ p1: "v1", p2: { p22: "v22" } });
res = f({ p1: "v1", p2: { "#url": "url", "#plan": { plan: "plan" } } });

res = f({ p1: "v1", p2: { p3: { "#url": "url", "#plan": { plan: "plan" } } } });
const obj = {
    p1: "v1",
    p2: { p3: { "#url": "ur1l", "#plan": { plan: "plan1" } } },
    p4: { "#url": "url2", "#plan": { plan: "plan2" } },
};
//res = f(obj);
//console.log(JSON.stringify(obj, null, 4));
//Promise.all(f(obj)).then(() => console.log(JSON.stringify(obj, null, 4)));

g(obj).then(() => console.log(JSON.stringify(obj, null, 4)));

//console.log(res);
//console.log(JSON.stringify(res, null, 4));
