import React from 'react';
import { useStore } from '../store';

type Props = {
    id: number;
};

export const Comment: React.FC<Props> = ({ id }): JSX.Element => {

    const comment = useStore(state => state.commentList.comments.find(comment => comment.id === id));
    const currentUser = useStore(state => state.currentUser);

    const currentUserIsAuthor = currentUser.id === comment?.authorId;

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
                            className="btn btn-comment-edit btn-primary btn-sm" 
                            title="Edit"
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button 
                            className="btn btn-comment-delete btn-sm btn-danger" 
                            title="Delete"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                }
                <div className="comment-author">{comment?.author}</div>
                <div className="comment-info">{comment?.created}</div>
                <p className="comment-body">
                    {comment?.text}
                </p>
            </div>
        </li>
    );
}