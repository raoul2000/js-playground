import React, { useState } from 'react';
import { App } from '../types';
import { useStore } from '../store';
import { appendComment } from '../services/logic/comments';

export const CommentForm: React.FC<{}> = (): JSX.Element => {
    const [newCommentText, setNewCommentText] = useState<string>('');
    const [setCommentList, nextId, currentUser, objectId] = useStore(state => [state.setCommentList, state.commentList.nextId, state.currentUser, state.objectId]);

    const handleCreateComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        appendComment(
            objectId,
            {
                id: nextId,
                author: currentUser.name,
                authorId: currentUser.id,
                modified: new Date(),
                text: newCommentText
            }
        )
            .then(setCommentList)
            .then(() => setNewCommentText(''));
    };

    return (
        <>
            <div className="comment-input">
                <textarea
                    id="comment"
                    name="comment"
                    placeholder="your comment ..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                ></textarea>
            </div>
            <div className="comment-input-actions">
                <button
                    onClick={handleCreateComment}
                    type="button"
                    className="btn btn-comment-save btn-success btn-sm"
                    title="Save"
                    disabled={newCommentText.trim().length === 0}
                >
                    <i className="fa fa-check"></i>
                </button>
                <button
                    onClick={(e) => setNewCommentText('')}
                    type="button"
                    className="btn btn-comment-cancel btn-default btn-sm"
                    title="Cancel"
                    disabled={newCommentText.trim().length === 0}
                >
                    <i className="fa fa-times"></i>
                </button>
            </div>
        </>
    );
}