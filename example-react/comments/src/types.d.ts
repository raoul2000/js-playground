export namespace App {
    export type Comment = {
        /**
         * Comment identifier
         * Unique in the comment list
         */
        id: number;
        /**
         * Loid of the user who created this comment
         */
        authorId: string;
        /**
         * login name of the user who created this comment
         */
        author: string;
        /**
         * Date this comment was last modified
         */
        modified:Date;
        /**
         * Text of the comment
         */
        text:string;
    };

    export type CommentList = {
        nextId:number,
        comments: Comment[];
    }
}