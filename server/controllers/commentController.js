import { Comment, User } from '../models/MemeMuseumDB.js';

export class CommentController {

    static async getAllComments(memeId) {
        const allComments = await Comment.findAll({
            where: {
                memeId: memeId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        //console.log("allComments", allComments);
        if (!allComments) {
            throw new Error("No comments found");
        }
        return allComments;
    }


    static async createComment(memeId, body) {
        //console.log("userId", body.userId);
        if (!body.userId) {
            throw new Error("User ID is required");
        }
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
        //console.log("comment", comment);
        if (!comment)
             throw new Error("Comment not found");
        return comment.destroy();
    }
}