import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Comment } from './Comment';
import {CommentForm} from './CommentForm';
import {fetchComments} from '../helpers';

export const CommentList: React.FC<{}> = (): JSX.Element => {
    const [loadCommentList, commentList, setCurrentUser ] = useStore(state => [state.loadCommentList, state.commentList, state.setCurrentUser]);

    useEffect(() => {
        fetchComments()
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