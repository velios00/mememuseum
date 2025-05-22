import { AxiosResponse } from "axios";
import { User } from "../shared/models/User.model";
import { API } from "../axios/Interceptors";
import { Meme } from "../shared/models/Meme.model";


export function getUserData(id: number): Promise<AxiosResponse<User>> {
    return API.get(`http://localhost:3000/user/${id}`);
}

export function getUserMemes(userId: number): Promise<AxiosResponse<Meme[]>> {
    return API.get(`http://localhost:3000/user/${userId}/memes`);
}
