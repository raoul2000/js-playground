import create from 'zustand'
import { App } from './types';
import { deepCopy } from './helpers';
import { devtools } from 'zustand/middleware'

type State = {
    currentUser: {
        /**
         * user object Loid
         */
        id: string,
        /**
         * user login name
         */
        name: string
    },
    /**
     * Db identifier of the object being commented
     */
    objectId: string;
    /**
     * List of comments
     */
    commentList: App.CommentList;
    /**
     * Initialize the comment list
     */
    setCommentList: (commentList: App.CommentList) => void;
    /**
     * Add a comment with  the current user as author
     */
    addComment: (text: string) => void;
    updateComment: (id: number, text: string) => void;
    deleteComment: (id: number) => void;
    setCurrentUser: (id: string, name: string) => void;
    setObjectId: (objectId: string) => void;
}

export const useStore = create<State>(devtools(set => ({
    objectId: '',
    currentUser: {
        id: '',
        name: ''
    },
    commentList: {
        nextId: 0,
        comments: []
    },
    setCurrentUser: (id: string, name: string) => set(state => ({
        ...state,
        currentUser: {
            id,
            name
        }
    })),
    setObjectId: (objectId) => set(state => ({
        ...state,
        objectId
    })),
    setCommentList: (commentList) => set(state => ({
        ...state,
        commentList: deepCopy<App.CommentList>(commentList)
    })),
    addComment: (text: string) => set(state => ({
        ...state,
        commentList: {
            ...state.commentList,
            nextId: state.commentList.nextId + 1,
            comments: [
                ...state.commentList.comments,
                {
                    id: state.commentList.nextId,
                    authorId: state.currentUser.id,
                    author: state.currentUser.name,
                    modified: new Date(),
                    text
                }
            ]
        }
    })),
    updateComment: (id: number, text: string) => set(state => ({
        ...state,
        commentList: {
            ...state.commentList,
            comments: state.commentList.comments.map(comment => {
                if (comment.id !== id) {
                    return comment;
                } else {
                    return {
                        ...comment,
                        text
                    }
                }
            })
        }
    })),
    deleteComment: (id: number) => set(state => ({
        ...state,
        commentList: {
            ...state.commentList,
            comments: state.commentList.comments.filter(comment => comment.id !== id)
        }
    })),
})));