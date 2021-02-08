import React, { useState } from 'react';
import { useUiStore } from '../store';

type Props = {
    onAddComment: (text: string) => void
};

export const CommentForm: React.FC<Props> = ({ onAddComment }): JSX.Element => {
    const [newCommentText, setNewCommentText] = useState<string>('');
    const [editedCommentId] = useUiStore(state => [state.editedCommentId]);

    const handleCreateComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onAddComment(newCommentText);
        setNewCommentText('');
    }

    return (
        <>
            <div className="comment-input">
                <textarea
                    id="comment"
                    name="comment"
                    placeholder="your comment ..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    disabled={editedCommentId !== -1}
                ></textarea>
            </div>
            <div className="comment-input-actions">
                <button
                    onClick={handleCreateComment}
                    type="button"
                    className="btn btn-comment-save btn-success btn-sm"
                    title="Save"
                    disabled={editedCommentId !== -1 || newCommentText.trim().length === 0}
                >
                    <i className="fa fa-check"></i> save
                </button>
                <button
                    onClick={(e) => setNewCommentText('')}
                    type="button"
                    className="btn btn-comment-cancel btn-default btn-sm"
                    title="Cancel"
                    disabled={editedCommentId !== -1 || newCommentText.trim().length === 0}
                >
                    <i className="fa fa-times"></i> cancel
                </button>
            </div>
        </>
    );
}