import { Vote, Meme, User } from "../models/MemeMuseumDB.js";

export class VoteController {
    static async createVote(memeId, body){
        console.log("memeId", memeId);
        console.log("userId", body.userId);
        let existingVote = await Vote.findOne({ where: { memeId: memeId, userId: body.userId } });
        if (existingVote) {
            throw new Error("User has already voted for this meme.");
        }
        let newVote = Vote.build(body.value);
        newVote.memeId = memeId;
        newVote.userId = body.userId;
        newVote.value = body.value;
        return newVote.save()
    }

    static async updateVote(modifiedVote, voteId)
    {
        let existingVote = await Vote.findOne({ where: { id: voteId } });
        if (!existingVote) {
            throw new Error("No vote on this idea yet.");
        }
        console.log("existingVote", existingVote);
        console.log("modifiedVote", modifiedVote);
        existingVote.value = modifiedVote.value;
        return existingVote.save()
    }

    static async findById(voteId){
        return Vote.findByPk(voteId);
    }

    static async getAllVotes(memeId, type) {
        const voteType = type === "upvote" ? 1 : type === "downvote" ? -1 : null;
        const allVotes = await Vote.findAll({
          where: {
            memeId: memeId,
            ...(voteType ? { voteType: voteType } : {}),
          },
        });
    
        return {
          votes: allVotes,
          count: allVotes.length,
        };
      }

}