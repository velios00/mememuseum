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
        if (!allComments) {
            throw new Error("No comments found");
        }
        return allComments;
    }


    static async createComment(memeId, body) {
        if (!body.userId) {
            throw new Error("User ID is required");
        }
        const newComment = await Comment.create({
        ...body,
        memeId: memeId,
        userId: body.userId,
  });
        return Comment.findByPk(newComment.id, {
    include: [{ model: User, attributes: ["id", "userName", "profileImage"] }],
  });
}

    static async findById(commentId) {
        return Comment.findByPk(commentId);
    }

    static async deleteComment(commentId) {
        const comment = await Comment.findByPk(commentId);
        if (!comment)
             throw new Error("Comment not found");
        return comment.destroy();
    }
}