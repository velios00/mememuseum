import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { Comment } from "../shared/models/Comment.model";

export function getComments(memeId: number): Promise<AxiosResponse<Comment[]>>{
    return API.get(`${API.defaults.baseURL}/memes/${memeId}/comments`);
}

export function addComment(memeId: number, userId: number, content: string): Promise<AxiosResponse<Comment>> {
    return API.post(`/memes/${memeId}/comments`, {userId, content })
}