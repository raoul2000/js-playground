import React, { useRef, useState } from 'react';
import { App } from '../types';
import { useStore } from '../store';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { removeTags } from '../helpers';
import { updateComment, deleteComment } from '../services/logic/comments';

type Props = {
    id: number;
};

export const Comment: React.FC<Props> = ({ id }): JSX.Element => {

    const comment: App.Comment | undefined = useStore(state => state.commentList.comments.find(comment => comment.id === id));
    const textRef = useRef(comment?.text || '');
    const [currentUser, objectId, setCommentList] = useStore(state => [state.currentUser, state.objectId, state.setCommentList]);
    const [uiStatus, editedCommentId, setStatusEdit, setStatusIdle, setStatusRefresh] = useStore(state => [state.uiStatus, state.editedCommentId, state.setStatusEdit, 
        state.setStatusIdle, state.setStatusRefresh]);
    
    // this state is only here to force component re-render as the comment text
    // needs to be stored in the textRef object because of ContentEditable limitation
    // see https://github.com/lovasoa/react-contenteditable#known-issues
    const [editedCommentText, setEditedCommentText] = useState<string>('');
    const currentUserIsAuthor = currentUser.id === comment?.authorId;
    const currentCommentIsEdited = uiStatus === 'edit' && editedCommentId === comment?.id;

    const handleChange = (evt: ContentEditableEvent) => {
        textRef.current = evt.target.value;
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text/plain');
        if (pastedText.length !== 0) {
            const cleanedText = removeTags(pastedText);

            setEditedCommentText(editedCommentText + cleanedText);
            textRef.current += cleanedText;
        }
    };

    const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (comment) {
            setStatusRefresh();
            deleteComment(objectId, comment.id)
                .then(setCommentList)
                .finally(() => setStatusIdle());
        }
    };
    const handleEditComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (comment) {
            setStatusEdit(comment.id);
        }
    };
    const handleSubmitChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (comment && comment.text !== textRef.current) {
            setStatusRefresh();
            updateComment(objectId, {
                ...comment,
                modified: new Date(),
                text: textRef.current
            })
                .then(setCommentList)
                .finally(() => setStatusIdle());
        }
    };
    const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(comment) {
            textRef.current = comment.text;
        }
        setStatusIdle();
    }

    /**
     * Render action buttons for a comment belonging to the current user
     */
    const renderActionsButtons = (): JSX.Element => {
        if (uiStatus === 'idle') {
            return (
                <>
                    <button
                        className="btn btn-comment-edit btn-primary btn-sm"
                        onClick={handleEditComment}
                        title="Edit"
                    >
                        <i className="fas fa-pencil-alt"></i>edit
                    </button>
                    <button
                        className="btn btn-comment-delete btn-sm btn-danger"
                        title="Delete"
                        onClick={handleDeleteComment}
                    >
                        <i className="fa fa-trash"></i>delete
                    </button>
                </>
            );
        } else if (uiStatus === 'edit' && editedCommentId === comment?.id) {
            return (
                <>
                    <button
                        className="btn btn-comment-edit btn-primary btn-sm"
                        onClick={handleSubmitChange}
                        title="Save"
                    >
                        <i className="fas fa-pencil-alt"></i>save
                    </button>
                    <button
                        className="btn btn-comment-delete btn-sm btn-danger"
                        title="Cancel"
                        onClick={handleCancelEdit}
                    >
                        <i className="fa fa-trash"></i>cancel
                    </button>
                </>
            );
        } else {
            return (<></>)
        }
    };

    return (
        <li
            className={`comment ${currentUserIsAuthor ? 'my-comment' : ''}`}
        >
            <div>
                <div className="img-avatar" style={{ backgroundImage: "url('/swing/user/avatar/Analyst1')" }}></div>
            </div>
            <div className="comment-main">
                {
                    currentUserIsAuthor
                    &&
                    <div className="comment-actions">
                        {renderActionsButtons()}
                    </div>
                }

                <div className="comment-author">{comment?.author}</div>
                <div className="comment-info">{comment?.modified.toDateString()}</div>

                <ContentEditable
                    html={textRef.current} // innerHTML of the editable div
                    className="comment-body"
                    disabled={!currentUserIsAuthor || !currentCommentIsEdited }       // use true to disable editing
                    onChange={handleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onPaste={handleOnPaste}
                />
            </div>
        </li>
    );
}