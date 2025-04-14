import { Comment } from '../models/MemeMuseumDB.js';

export class CommentController {
    static async createComment(memeId, body) {
        console.log("userId", body.userId);
        const newComment = Comment.build(body);
        newComment.memeId = memeId;
        newComment.userId = body.userId;
        return newComment.save();
    }

    static async findById(commentId) {
        return Comment.findByPk(commentId);
    }

    static async deleteComment(commentId) {
        const comment = await Comment.findByPk(commentId);
        console.log("comment", comment);
        if (!comment)
             throw new Error("Comment not found");
        return comment.destroy({ where: { id: commentId } });
    }
}