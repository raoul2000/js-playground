import React, { useEffect, useState } from 'react';
import { useStore, useUiStore } from '../store';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { readComments } from '../services/logic/comments';

export const CommentList: React.FC<{}> = (): JSX.Element => {

    const [contextInfo, setContextInfo] = useState<{ currentUserId: string, objectId: string }>();
    const [status, commentList, setCommentList, addComment, updateComment, deleteComment] = useStore(state => [state.status, state.commentList, state.setCommentList,
    state.addComment, state.updateComment, state.deleteComment]);
    const editedCommentId = useUiStore(state => state.editedCommentId);

    useEffect(() => {
        setContextInfo({
            currentUserId: "authorId-0",
            objectId: 'dummy-obj-id'
        });
        readComments('dummyObjectId')
            .then(setCommentList)
            .catch(console.error);
    }, []);

    const handleAddComment = (text: string) => {
        addComment({
            author: 'name0',
            authorId: contextInfo?.currentUserId || '',
            modified: new Date(),
            text
        });
    };
    const handleUpdateComment = (id: number, text: string) => {
        updateComment(id, text);
    };
    const handleDeleteComment = (id: number) => {
        deleteComment(id);
    }
    return (
        <div className="comments-wrapper">
            <header>
                nextId = {commentList.nextId}
                {editedCommentId !== -1 ? ' editing...' : ''}
                <div>status = {status}</div>
            </header>

            {
                contextInfo
                &&
                <section className="comments">
                    <ol>
                        {
                            commentList
                                .comments
                                .map(comment => (
                                    <div key={comment.id}>
                                        <Comment
                                            comment={comment}
                                            currentUserId={contextInfo?.currentUserId}
                                            onUpdateComment={handleUpdateComment}
                                            onDeleteComment={handleDeleteComment}
                                        />
                                    </div>))
                        }
                    </ol>
                </section>
            }
            <footer>
                <CommentForm 
                    onAddComment={handleAddComment} 
                    allowPrivateComment={true}
                    />
            </footer>
        </div>
    );
}