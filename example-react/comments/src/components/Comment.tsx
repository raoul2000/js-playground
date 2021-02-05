import React, { useRef, useState } from 'react';
import { useStore } from '../store';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { removeTags } from '../helpers';
import { saveAllComments } from '../logic/comments';

type Props = {
    id: number;
};

export const Comment: React.FC<Props> = ({ id }): JSX.Element => {

    const comment = useStore(state => state.commentList.comments.find(comment => comment.id === id));
    const [updateComment, deleteComment] = useStore(state => [state.updateComment, state.deleteComment]);

    const textRef = useRef(comment?.text || '');
    const currentUser = useStore(state => state.currentUser);

    // this state is only here to force component re-render as the comment text
    // needs to be stored in the textRef object because of ContentEditable limitation
    // see https://github.com/lovasoa/react-contenteditable#known-issues
    const [editedCommentText, setEditedCommentText] = useState<string>('');
    const currentUserIsAuthor = currentUser.id === comment?.authorId;

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

    const handleOnBlur = () => {
        if (comment && comment.text !== textRef.current) {
            updateComment(comment.id, textRef.current);
        }
    };

    const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => comment && deleteComment(comment.id);

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
                        <button
                            className="btn btn-comment-delete btn-sm btn-danger"
                            title="Delete"
                            onClick={handleDeleteComment}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                }

                <div className="comment-author">{comment?.author}</div>
                <div className="comment-info">{comment?.modified.toDateString()}</div>

                <ContentEditable
                    html={textRef.current} // innerHTML of the editable div
                    className="comment-body"
                    disabled={!currentUserIsAuthor}       // use true to disable editing
                    onChange={handleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onPaste={handleOnPaste}
                    onBlur={handleOnBlur}
                />
            </div>
        </li>
    );
}