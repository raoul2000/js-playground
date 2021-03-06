import React, { useRef, useState } from 'react';
import { App } from '../types';
import { useUiStore } from '../store';
import { ContentEditableEvent } from 'react-contenteditable'
import TextareaAutosize from 'react-textarea-autosize';

const tagsToReplace: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

export const XMLEscape = (text: string): string => {
    return text.replace(/[&<>]/g, (tag) => {
        return tagsToReplace[tag] || tag;
    })
};

const removeTags = (str: string): string => str
    ? str.replace(/(<([^>]+)>)/gi, "")
    : str;

type Props = {
    comment: App.Comment;
    currentUserId: string;
    onUpdateComment: (id: number, text: string) => void;
    onDeleteComment: (id: number) => void;
};

export const Comment: React.FC<Props> = ({ comment, currentUserId, onUpdateComment, onDeleteComment }): JSX.Element => {

    const textRef = useRef(comment?.text || '');
    const [editedCommentId, setEditedCommentId] = useUiStore(state => [state.editedCommentId, state.setEditedCommentId])

    // this state is only here to force component re-render as the comment text
    // needs to be stored in the textRef object because of ContentEditable limitation
    // see https://github.com/lovasoa/react-contenteditable#known-issues
    const [editedCommentText, setEditedCommentText] = useState<string>('');

    const currentUserIsAuthor = currentUserId === comment?.authorId;
    const currentCommentIsEdited = editedCommentId === comment?.id;

    const handleChange = (evt: ContentEditableEvent) => {
        textRef.current = evt.target.value;
    };
    // FIXME: past jump to the end of existing text !! :(
    const handleOnPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text/plain');
        if (pastedText.length !== 0) {
            const cleanedText = removeTags(pastedText);
            console.log(`pasting ${cleanedText}`);
            e.clipboardData.setData('text/plain', cleanedText);
            //setEditedCommentText(editedCommentText + cleanedText);
            //textRef.current += cleanedText;
        }
    };

    const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onDeleteComment(comment.id);
    };
    const handleEditComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditedCommentId(comment.id);
        setEditedCommentText(comment.text);
    };
    const handleSubmitChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onUpdateComment(comment.id, editedCommentText);
        setEditedCommentId(-1);
    };
    const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setEditedCommentId(-1);
        textRef.current = comment.text;
    }

    const convertToHtml = (str: string): string => XMLEscape(str).replace(/(?:\r\n|\r|\n)/g, '<br>');
    /**
     * Render action buttons for a comment belonging to the current user
     */
    const renderActionsButtons = (): JSX.Element => {
        if (editedCommentId === comment?.id) {
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
        } else if (editedCommentId === -1) {
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
        } else {
            return (<></>);
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
                {
                    editedCommentId !== -1
                        ?
                        <TextareaAutosize
                            value={editedCommentText}
                            onChange={(e) => setEditedCommentText(e.currentTarget.value)}
                            maxRows={5}
                        />
                        :
                        <div
                            dangerouslySetInnerHTML={{ __html: convertToHtml(comment.text) }}
                        ></div>
                }

            </div>
        </li>
    );
}
/*
                <ContentEditable
                    html={textRef.current} // innerHTML of the editable div
                    className="comment-body"
                    disabled={!currentUserIsAuthor || !currentCommentIsEdited}       // use true to disable editing
                    onChange={handleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onPaste={handleOnPaste}
                />
                */