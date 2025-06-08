import { AxiosResponse } from "axios";
import { User } from "../shared/models/User.model";
import { API } from "../axios/Interceptors";
import { Meme } from "../shared/models/Meme.model";


export function getUserData(id: number): Promise<AxiosResponse<User>> {
    return API.get(`http://localhost:3000/user/${id}`);
}

export function getUserMemes(userId: number): Promise<AxiosResponse<Meme[]>> {
    return API.get(`http://localhost:3000/memes?userId=${userId}&filter=new`);
}

export function saveAvatar(userId: number, profileImage: File): Promise<AxiosResponse<User>> {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    return API.put(`http://localhost:3000/users/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
} 
