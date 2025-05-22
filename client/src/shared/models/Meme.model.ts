import { User } from "./User.model";
import { Vote } from "./Vote.model"
import { Comment } from "./Comment.model";
import { Tag } from "./Tag.model";

export interface Meme {
    id: number;
    title: string;
    image: string;
    creationDate: string;
    upvotes: number;
    downvotes: number;
    User: User;
    Comments: Comment[];
    Votes: Vote[]
    tags: Tag[]
}