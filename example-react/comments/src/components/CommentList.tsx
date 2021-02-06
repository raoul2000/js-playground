import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { readComments } from '../services/logic/comments';

export const CommentList: React.FC<{}> = (): JSX.Element => {
    const [setCommentList, commentList, setCurrentUser, setObjectId] = useStore(state => [state.setCommentList, state.commentList, state.setCurrentUser, state.setObjectId]);

    useEffect(() => {
        readComments('dummyObjectId')
            .then(setCommentList)
            .catch(console.error);
        setCurrentUser('authorId-1', 'Author One');
        setObjectId('dummyObjectId');
    }, []);

    return (
        <div className="comments-wrapper">
            <section className="comments">
                <ol>
                    {
                        commentList
                            .comments
                            .map(comment => <Comment key={comment.id} id={comment.id} />)
                    }
                </ol>
            </section>
            <footer>
                <CommentForm />
            </footer>
        </div>
    );
}