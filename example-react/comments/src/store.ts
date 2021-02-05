import create, { SetState } from 'zustand'
import { App } from './types';
import { deepCopy } from './helpers';
import { devtools } from 'zustand/middleware'

type State = {
    bears: number;
    currentUser: {
        /**
         * Méthode user object Loid
         */
        id: string,
        /**
         * Méthode user login name
         */
        name: string
    },
    commentList: App.CommentList;
    increase: (by: number) => void;
    loadCommentList: (commentList: App.CommentList) => void;
    addComment: (text: string) => void;
    updateComment: (id: number, text: string) => void;
    deleteComment: (id: number) => void;
    setCurrentUser: (id: string, name: string) => void;
}

export const useStore = create<State>(devtools(set => ({
    bears: 0,
    currentUser: {
        id: '',
        name: ''
    },
    commentList: {
        nextId: 0,
        comments: []
    },
    increase: (by) => set(state => ({ bears: state.bears + by })),
    setCurrentUser: (id: string, name: string) => set(state => ({
        ...state,
        currentUser: {
            id,
            name
        }
    })),
    loadCommentList: (commentList) => set(state => ({
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
                    created: 12,
                    text
                }
            ]
        }
    })),
    updateComment: (id: number, text: string) => set( state => ({
        ...state,
        commentList: {
            ...state.commentList,
            comments: state.commentList.comments.map(comment => {
                if( comment.id !== id) {
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
    deleteComment: (id: number) => set( state => ({
        ...state,
        commentList: {
            ...state.commentList,
            comments: state.commentList.comments.filter( comment => comment.id !== id)
        }
    })),
})));