import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";


export function deleteVote(memeId: number, voteId: number): Promise<AxiosResponse<void>> {
    return API.delete(`http://localhost:3000/memes/${memeId}/votes/${voteId}`);
}

export function saveVote(memeId: number, voteValue: number, userId: number): Promise<AxiosResponse<void>> {
    return API.post(`http://localhost:3000/memes/${memeId}/votes`, { value: voteValue, userId });
}