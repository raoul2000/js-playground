import { App } from "./types";

/**
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export const deepCopy = <T>(target: T): T => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    if (target instanceof RegExp) {
        return new RegExp(target.source, target.flags) as any;
    }
    if (target instanceof Set) {
        return new Set(Array.from(target, deepCopy)) as any;
    }
    if (target instanceof Map) {
        return new Map(Array.from(target, ([k, v]) => [k, deepCopy(v)])) as any;
    }
    if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach((v) => { cp.push(v); });
        return cp.map((n: any) => deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== {}) {
        const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(cp).forEach(k => {
            cp[k] = deepCopy<any>(cp[k]);
        });
        return cp as T;
    }
    return target;
};


const createCommentList = (): App.CommentList => {
    const result: App.CommentList = {
        nextId: 3,
        comments: []
    };
    for (let index = 0; index < 3; index++) {
        result.comments.push({
            id: index,
            author: `author-${index}`,
            authorId: `authorId-${index}`,
            created: index + 1000,
            text: `comment text ${index}`
        });
    }
    return result;
};

export const fetchComments = ():Promise<App.CommentList> => new Promise( (resolve) => {
    setTimeout(() => {
        resolve(createCommentList());
    }, 1000);
});
