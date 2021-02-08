import create from 'zustand'
import { App } from './types';
import { deepCopy } from './helpers';
import { devtools } from 'zustand/middleware'

type State = {
    status: 'pending' | 'success' | 'error',
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
    addComment: (comment: Omit<App.Comment, 'id'>) => void;
    updateComment: (id: number, text: string) => void;
    deleteComment: (id: number) => void;
}

export const useStore = create<State>(devtools(set => ({
    status: 'success',
    commentList: {
        nextId: 0,
        comments: []
    },
    setCommentList: (commentList) => set(state => ({
        commentList: deepCopy<App.CommentList>(commentList)
    })),
    addComment: (comment: Omit<App.Comment, 'id'>) => {
        set(state => ({ status: 'pending' }));
        setTimeout(() => {
            set(state => {
                return {
                    status: 'success',
                    commentList: {
                        ...state.commentList,
                        nextId: state.commentList.nextId + 1,
                        comments: [
                            ...state.commentList.comments,
                            {
                                ...comment,
                                id: state.commentList.nextId
                            }
                        ]
                    }
                }
            });
        }, 1000);
    },
    updateComment: (id: number, text: string) => {
        set(state => ({ status: 'pending' }));
        setTimeout(() => {
            set(state => ({
                status: 'success',
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
            }));
        }, 5000);
    },
    deleteComment: (id: number) => set(state => ({
        commentList: {
            ...state.commentList,
            comments: state.commentList.comments.filter(comment => comment.id !== id)
        }
    })),
})));

type UiState = {
    editedCommentId: number,
    setEditedCommentId: (id: number) => void;
};

export const useUiStore = create<UiState>(devtools(set => ({
    editedCommentId: -1,
    setEditedCommentId: (id: number) => set(state => ({
        editedCommentId: id
    }))
})));
