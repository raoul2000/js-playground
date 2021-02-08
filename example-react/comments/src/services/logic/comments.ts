import { rejects } from "assert";
import { App } from "../../types";
import { validateCommentListSchema, validateCommentSchema } from "./schema";

let storage: App.CommentList;

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

const createCommentList = (): App.CommentList => {
    if (!storage) {
        storage = {
            nextId: 3,
            comments: []
        };
        for (let index = 0; index < 3; index++) {
            storage.comments.push({
                id: index,
                author: `author-${index}`,
                authorId: `authorId-${index}`,
                modified: new Date(),
                text: `comment text ${index}`
            });
        }
        storage.nextId++;
        storage.comments.push({
            id: 3,
            author: `author-0`,
            authorId: `authorId-0`,
            modified: new Date(),
            text: `comment text 0`
        });
    }
    return storage;
};
const validateComment = (comment: App.Comment): Promise<App.Comment> => new Promise((resolve, reject) => {
    try {
        validateCommentSchema(comment);
        resolve(comment);
    } catch (error) {
        reject(error);
    }
});
/**
 * Load all comments for a given objects
 * 
 * @param objectId id of the object being commented
 */
export const readComments = (objectId: string): Promise<App.CommentList> => new Promise((resolve, rejects) => {
    setTimeout(() => {
        let commentList = createCommentList();
        try {
            validateCommentListSchema(commentList);
            // simulate comment added by other user (50% probability)
            if (getRandomInt(2) === 1 && false) {
                commentList = {
                    ...commentList,
                    nextId: commentList.nextId + 1,
                    comments: [
                        ...commentList.comments,
                        {
                            id: getRandomInt(2000),
                            authorId: 'SurpriseId',
                            author: 'surprise',
                            modified: new Date(),
                            text: 'hello world !!'
                        }
                    ]
                };
            }
            console.log('readComments', commentList);
            resolve(commentList);
        } catch (error) {
            rejects(error);
        }
    }, 500);
});

const writeComments = (commentList: App.CommentList): Promise<App.CommentList> => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('writeComments', commentList);
        storage = commentList;
        resolve(commentList);
    }, 500);
});

/**
 * Add a new comment at the end of the comment list.
 * 
 * @param objectId the object being commented
 * @param comment the comment to append to the comment list
 */
export const appendComment = (objectId: string, comment: App.Comment): Promise<App.CommentList> =>
    validateComment(comment)
        .then(() => readComments(objectId))
        .then(freshCommentList => {
            freshCommentList.comments.push({
                ...comment,
                id: freshCommentList.nextId++
            });
            return freshCommentList;
        })
        .then(writeComments);

export const updateComment = (objectId: string, commentToUpdate: App.Comment): Promise<App.CommentList> =>
    validateComment(commentToUpdate)
        .then(() => readComments(objectId))
        .then(freshCommentList => {
            freshCommentList.comments = freshCommentList.comments.map(comment =>
                comment.id === commentToUpdate.id
                    ? commentToUpdate
                    : comment
            );
            return freshCommentList;
        })
        .then(writeComments);

export const deleteComment = (objectId: string, commentId: number): Promise<App.CommentList> => readComments(objectId)
    .then(commentList => {
        commentList.comments = commentList.comments.filter(comment => comment.id !== commentId);
        return commentList;
    })
    .then(writeComments);