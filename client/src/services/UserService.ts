import axios, { AxiosResponse } from "axios";
import { User } from "../shared/models/User.model";
import { API } from "../axios/Interceptors";



export function getUserData(id: number): Promise<AxiosResponse<User>> {
    return API.get(`http://localhost:3000/user/${id}`);
}

export function saveAvatar(userId: number, profileImage: File): Promise<AxiosResponse<User>> {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    return API.put(`${API.defaults.baseURL}/users/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
} 
