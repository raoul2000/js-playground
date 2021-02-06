
import { App } from '../../types';
import { assert, object, string, number, date, array } from 'superstruct'

const CommentSchema = object({
    id: number(),
    authorId: string(),
    author: string(),
    modified: date(),
    text: string()
});

const CommentListSchema = object({
    nextId: number(),
    comments: array(CommentSchema)
});

const outputValidationError = (error:any) => {
    console.error('invalid comment list format - one ore more error detected');
    for (const failure of error.failures()) {
        console.error(failure);
    }
};

export const validateCommentSchema = (comment:App.Comment): App.Comment => {
    try {
        assert(comment, CommentSchema);
        return comment;
    } catch (error) {
        outputValidationError(error);
        throw new Error('comment validation failed');
    }
};

export const validateCommentListSchema = (commentList: App.CommentList):  App.CommentList => {
    try {
        assert(commentList, CommentListSchema);
        return commentList;
    } catch (error) {
        outputValidationError(error);
        throw new Error('comment list validation failed');
    }
};