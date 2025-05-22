import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { Comment } from "../shared/models/Comment.model";

export function getComments(memeId: number): Promise<AxiosResponse<Comment[]>>{
    return API.get(`http://localhost:3000/memes/${memeId}/comments`);
}