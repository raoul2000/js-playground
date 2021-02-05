import React, { useState } from 'react';
import { useStore } from '../store';


export const CommentForm: React.FC<{}> = (): JSX.Element => {
    const [newCommentText, setNewCommentText] = useState<string>('');
    const addComment = useStore(state => state.addComment);

    const handleCreateComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        addComment(newCommentText);
        setNewCommentText('');
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
                >
                    <i className="fa fa-times"></i>
                </button>
            </div>
        </>
    );
}