import { App } from "../types";
import { validateCommentList } from "./schema";

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
            modified: new Date(),
            text: `comment text ${index}`
        });
    }
    return result;
};

export const loadAllComments = (objectId: string): Promise<App.CommentList> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(createCommentList());
    }, 1000);
});

export const saveAllComments = (objectId: string, commentList: App.CommentList): Promise<boolean> => new Promise((resolve, reject) => {
    setTimeout(() => {
        if(validateCommentList(commentList)) {
            console.log('saving ...', commentList, objectId);
            resolve(true);
        } else {
            reject(new Error('invalid comment list format'));
        }
    }, 1000);
});