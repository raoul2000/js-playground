import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { loadAllComments } from '../logic/comments';
import { validateCommentList } from '../logic/schema';

export const CommentList: React.FC<{}> = (): JSX.Element => {
    const [loadCommentList, commentList, setCurrentUser] = useStore(state => [state.loadCommentList, state.commentList, state.setCurrentUser]);

    useEffect(() => {
        loadAllComments('dummyObjectId')
            .then( commentList => {
                if(validateCommentList(commentList)) {
                    return loadCommentList(commentList);
                } else {
                    return null;
                }
            }
            .then(loadCommentList);
        setCurrentUser('authorId-1', 'Author One');
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