import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { Vote } from "../shared/models/Vote.model";


export function deleteVote(memeId: number, voteId: number): Promise<AxiosResponse<void>> {
    return API.delete(`/memes/${memeId}/votes/${voteId}`);
}

export function updateVote(voteId: number, userId: number, value: 1 | -1): Promise<AxiosResponse<Vote>> {
    return API.put(`/memes/votes/${voteId}`, {userId, value});
}

export function saveVote(memeId: number, userId: number, value: 1 | -1): Promise<AxiosResponse<Vote>> {
    return API.post(`/memes/${memeId}/votes`, {userId, value})
}