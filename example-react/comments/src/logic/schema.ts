
import { App } from '../types';
import { assert, object, string, number, date, array } from 'superstruct'

const CommentSchema = object({
    id: string(),
    authorId: string(),
    author: string(),
    created: string(),
    text: string()
});

const CommentListSchema = object({
    nextId: number(),
    comments: array(CommentSchema)
})

export const validateCommentList = (commentList: App.CommentList): boolean => {
    try {
        assert(commentList, CommentListSchema);
        return true;
    } catch (error) {
        console.error('invalid comment list format - one ore more error detected');
        for (const failure of error.failures()) {
            console.error(failure);
        }
        return false;
    }
}